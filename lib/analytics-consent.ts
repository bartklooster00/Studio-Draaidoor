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
