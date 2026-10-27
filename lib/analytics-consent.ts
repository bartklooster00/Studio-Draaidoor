export const CONSENT_STORAGE_KEY = "studio-draaidoor-consent";
export const CONSENT_VERSION = "1";

const ALLOWED_UTM_PARAMETERS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content"
] as const;
const SAFE_UTM_VALUE = /^[A-Za-z0-9._~-]{1,100}$/;
const SECTION_FRAGMENTS = new Set([
  "#bedrijfsvideo",
  "#interview",
  "#aftermovie",
  "#project-video"
]);

export type AnalyticsConsentChoice = "denied" | "granted";

export type StoredConsent = Readonly<{
  analytics: AnalyticsConsentChoice;
  recordedAt: string;
  version: typeof CONSENT_VERSION;
}>;

export function createStoredConsent(
  analytics: AnalyticsConsentChoice,
  recordedAt = new Date()
): StoredConsent {
  return {
    analytics,
    recordedAt: recordedAt.toISOString(),
    version: CONSENT_VERSION
  };
}

export function parseStoredConsent(value: string | null): StoredConsent | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("analytics" in parsed) ||
      !("recordedAt" in parsed) ||
      !("version" in parsed)
    ) {
      return null;
    }

    const { analytics, recordedAt, version } = parsed;

    if (
      (analytics !== "denied" && analytics !== "granted") ||
      typeof recordedAt !== "string" ||
      Number.isNaN(Date.parse(recordedAt)) ||
      version !== CONSENT_VERSION
    ) {
      return null;
    }

    return { analytics, recordedAt, version };
  } catch {
    return null;
  }
}

export function getAnalyticsCookieNames(cookieHeader: string) {
  return cookieHeader
    .split(";")
    .map((cookie) => cookie.split("=", 1)[0]?.trim())
    .filter((name): name is string => Boolean(name && /^_ga(?:_|$)/.test(name)));
}

export function getCookieDomains(hostname: string) {
  const parts = hostname.split(".").filter(Boolean);
  const parentDomain = parts.length > 2 ? `.${parts.slice(-2).join(".")}` : undefined;

  return [...new Set([hostname, `.${hostname}`, parentDomain].filter(Boolean))] as string[];
}

export function buildAnalyticsPageLocation(
  origin: string,
  pathname: string,
  search: string
) {
  const incoming = new URLSearchParams(search);
  const allowed = new URLSearchParams();

  for (const parameter of ALLOWED_UTM_PARAMETERS) {
    const values = incoming.getAll(parameter);

    if (values.length === 1 && SAFE_UTM_VALUE.test(values[0])) {
      allowed.set(parameter, values[0]);
    }
  }

  const query = allowed.toString();
  return `${origin}${pathname}${query ? `?${query}` : ""}`;
}

export function sanitizeAnalyticsReferrer(referrer: string) {
  if (!referrer) return "";

  try {
    const url = new URL(referrer);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}

export type AnalyticsPageContext = Readonly<{
  page_location: string;
  page_referrer: string;
}>;

type AnalyticsBrowser = Pick<
  Window,
  "location" | "history" | "document" | "addEventListener" | "removeEventListener"
>;

export function sanitizeAnalyticsNavigationUrl(url: URL) {
  const location = buildAnalyticsPageLocation(url.origin, url.pathname, url.search);
  return location + (SECTION_FRAGMENTS.has(url.hash) ? url.hash : "");
}

// Keep URLs safe before both Next.js and Google's history listeners observe them.
export function protectAnalyticsUrls(
  browser: AnalyticsBrowser,
  publish: (context: AnalyticsPageContext) => void
) {
  const history = browser.history;
  const originalPush = history.pushState;
  const originalReplace = history.replaceState;
  const referrer = sanitizeAnalyticsReferrer(browser.document.referrer);
  let active = true;

  function publishUrl(url: URL) {
    publish({
      page_location: buildAnalyticsPageLocation(url.origin, url.pathname, url.search),
      page_referrer: referrer
    });
  }

  function sanitizeCurrentUrl() {
    const url = new URL(browser.location.href);
    const safeUrl = sanitizeAnalyticsNavigationUrl(url);
    if (safeUrl !== browser.location.href) {
      originalReplace.call(history, history.state, "", safeUrl);
    }
    publishUrl(new URL(safeUrl));
  }

  function wrap(method: History["pushState"]): History["pushState"] {
    return function (this: History, data, unused, url) {
      if (!active || url == null) return method.call(this, data, unused, url);
      const nextUrl = new URL(String(url), browser.location.href);
      if (nextUrl.origin !== browser.location.origin) {
        return method.call(this, data, unused, url);
      }
      const safeUrl = sanitizeAnalyticsNavigationUrl(nextUrl);
      publishUrl(new URL(safeUrl));
      return method.call(this, data, unused, safeUrl);
    };
  }

  const push = wrap(originalPush);
  const replace = wrap(originalReplace);
  history.pushState = push;
  history.replaceState = replace;
  browser.addEventListener("popstate", sanitizeCurrentUrl, true);
  browser.addEventListener("hashchange", sanitizeCurrentUrl, true);
  sanitizeCurrentUrl();

  return () => {
    active = false;
    if (history.pushState === push) history.pushState = originalPush;
    if (history.replaceState === replace) history.replaceState = originalReplace;
    browser.removeEventListener("popstate", sanitizeCurrentUrl, true);
    browser.removeEventListener("hashchange", sanitizeCurrentUrl, true);
  };
}

export function removeAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const hostname = window.location.hostname;
  const domains = [undefined, ...getCookieDomains(hostname)];

  for (const name of getAnalyticsCookieNames(document.cookie)) {
    for (const domain of domains) {
      const domainAttribute = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; Path=/${domainAttribute}; SameSite=Lax`;
    }
  }
}
