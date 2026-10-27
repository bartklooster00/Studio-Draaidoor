import assert from "node:assert/strict";
import test from "node:test";
import {
  CONSENT_VERSION,
  buildAnalyticsPageLocation,
  createStoredConsent,
  getAnalyticsCookieNames,
  getCookieDomains,
  parseStoredConsent,
  protectAnalyticsUrls,
  sanitizeAnalyticsNavigationUrl,
  sanitizeAnalyticsReferrer
} from "../lib/analytics-consent.ts";

test("creates and reads a versioned consent record", () => {
  const recordedAt = new Date("2026-10-23T10:00:00.000Z");
  const record = createStoredConsent("granted", recordedAt);

  assert.deepEqual(record, {
    analytics: "granted",
    recordedAt: "2026-10-23T10:00:00.000Z",
    version: CONSENT_VERSION
  });
  assert.deepEqual(parseStoredConsent(JSON.stringify(record)), record);
});

test("rejects missing, malformed and outdated consent records", () => {
  assert.equal(parseStoredConsent(null), null);
  assert.equal(parseStoredConsent("not-json"), null);
  assert.equal(
    parseStoredConsent(
      JSON.stringify({
        analytics: "granted",
        recordedAt: "2026-10-23T10:00:00.000Z",
        version: "outdated"
      })
    ),
    null
  );
});

test("selects only known GA analytics cookies for removal", () => {
  assert.deepEqual(
    getAnalyticsCookieNames("session=keep; _ga=remove; _ga_TEST=remove; consent=keep"),
    ["_ga", "_ga_TEST"]
  );
});

test("includes the parent production domain when removing cookies", () => {
  assert.deepEqual(getCookieDomains("www.studiodraaidoor.nl"), [
    "www.studiodraaidoor.nl",
    ".www.studiodraaidoor.nl",
    ".studiodraaidoor.nl"
  ]);
});

test("allows only conservative UTM parameters in GA page locations", () => {
  assert.equal(
    buildAnalyticsPageLocation(
      "https://www.studiodraaidoor.nl",
      "/",
      "?utm_source=testcampagne&utm_medium=paid&utm_campaign=video_2026&oppref=TEST123&unknown=value"
    ),
    "https://www.studiodraaidoor.nl/?utm_source=testcampagne&utm_medium=paid&utm_campaign=video_2026"
  );

  assert.equal(
    buildAnalyticsPageLocation(
      "https://www.studiodraaidoor.nl",
      "/contact",
      "?utm_source=naam%40bedrijf.nl&utm_campaign=geldige-campagne&utm_campaign=dubbel"
    ),
    "https://www.studiodraaidoor.nl/contact"
  );
});

test("removes query parameters and fragments from analytics referrers", () => {
  assert.equal(
    sanitizeAnalyticsReferrer(
      "https://voorbeeld.nl/pad?email=naam%40bedrijf.nl&oppref=TEST123#onderdeel"
    ),
    "https://voorbeeld.nl/pad"
  );
  assert.equal(sanitizeAnalyticsReferrer("javascript:alert(1)"), "");
});

test("rejects duplicate, encoded and personal-looking UTM values", () => {
  for (const search of [
    "?utm_source=test%40example.com",
    "?utm_source=test%2540example.com",
    "?utm_source=first&utm_source=second",
    "?utm_source=first+last",
    `?utm_source=${"a".repeat(101)}`,
    "?UTM_SOURCE=unrecognised&oppref=TEST123&email=test%40example.com"
  ]) {
    assert.equal(buildAnalyticsPageLocation("https://example.org", "/contact", search), "https://example.org/contact");
  }
});

test("browser URLs keep only validated campaign parameters and existing section anchors", () => {
  assert.equal(
    sanitizeAnalyticsNavigationUrl(new URL("https://example.org/diensten?utm_source=testcampagne&utm_medium=paid&utm_campaign=video_2026&oppref=TEST123&email=test%40example.com#private-fragment")),
    "https://example.org/diensten?utm_source=testcampagne&utm_medium=paid&utm_campaign=video_2026"
  );
  for (const fragment of ["bedrijfsvideo", "interview", "aftermovie", "project-video"]) {
    assert.equal(
      sanitizeAnalyticsNavigationUrl(new URL(`https://example.org/diensten?oppref=TEST123#${fragment}`)),
      `https://example.org/diensten#${fragment}`
    );
  }
});

function browserFixture(initialUrl: string) {
  let currentUrl = new URL(initialUrl);
  const calls: Array<{ method: string; url: string; data: unknown }> = [];
  const listeners = new Map<string, EventListenerOrEventListenerObject>();
  const initialState = { __NA: true, tree: ["existing-router-state"] };
  const history = {
    state: initialState,
    pushState(data: unknown, _unused: string, url?: string | URL | null) {
      if (url != null) currentUrl = new URL(String(url), currentUrl);
      this.state = data as typeof initialState;
      calls.push({ method: "push", url: currentUrl.href, data });
    },
    replaceState(data: unknown, _unused: string, url?: string | URL | null) {
      if (url != null) currentUrl = new URL(String(url), currentUrl);
      this.state = data as typeof initialState;
      calls.push({ method: "replace", url: currentUrl.href, data });
    }
  };
  const browser = {
    get location() { return currentUrl; },
    history,
    document: { referrer: "https://referrer.example/path?email=test%40example.com&oppref=TEST123#private" },
    addEventListener(name: string, listener: EventListenerOrEventListenerObject) { listeners.set(name, listener); },
    removeEventListener(name: string) { listeners.delete(name); }
  } as unknown as Parameters<typeof protectAnalyticsUrls>[0];
  return { browser, calls, history, initialState, listeners, setUrl(url: string) { currentUrl = new URL(url); } };
}

test("cleans the current URL synchronously before tag initialization without navigating", () => {
  const fixture = browserFixture("https://example.org/?utm_source=campaign&oppref=TEST123&email=test%40example.com#private");
  const contexts: unknown[] = [];
  const stop = protectAnalyticsUrls(fixture.browser, (context) => {
    assert.equal(fixture.browser.location.href, "https://example.org/?utm_source=campaign");
    contexts.push(context);
  });
  assert.deepEqual(fixture.calls.map(c => c.method), ["replace"]);
  assert.equal(fixture.history.state, fixture.initialState);
  assert.deepEqual(contexts, [{ page_location: "https://example.org/?utm_source=campaign", page_referrer: "https://referrer.example/path" }]);
  stop();
});

test("publishes safe defaults before every pushState or replaceState observer", () => {
  const fixture = browserFixture("https://example.org/");
  let lastContext: { page_location: string; page_referrer: string } | undefined;
  const stop = protectAnalyticsUrls(fixture.browser, context => { lastContext = context; });
  for (const method of ["pushState", "replaceState"] as const) {
    fixture.browser.history[method](fixture.initialState, "", "/contact?utm_medium=paid&oppref=TEST123&email=test%40example.com#private");
    assert.equal(fixture.browser.location.href, "https://example.org/contact?utm_medium=paid");
    assert.equal(lastContext?.page_location, "https://example.org/contact?utm_medium=paid");
    assert.equal(fixture.calls.at(-1)?.url, lastContext?.page_location);
    assert.equal(fixture.history.state, fixture.initialState);
  }
  stop();
});

test("restores history methods and listeners when analytics protection is removed", () => {
  const fixture = browserFixture("https://example.org/");
  const push = fixture.browser.history.pushState;
  const replace = fixture.browser.history.replaceState;
  const stop = protectAnalyticsUrls(fixture.browser, () => {});
  stop();
  assert.equal(fixture.browser.history.pushState, push);
  assert.equal(fixture.browser.history.replaceState, replace);
  assert.equal(fixture.listeners.size, 0);
  assert.equal(fixture.calls.length, 0, "safe URLs must not create extra history operations");
});

test("back/forward and hash changes sanitize restored URLs and omit all fragments from events", () => {
  const fixture = browserFixture("https://example.org/");
  let lastContext: { page_location: string; page_referrer: string } | undefined;
  const stop = protectAnalyticsUrls(fixture.browser, context => { lastContext = context; });
  for (const event of ["popstate", "hashchange"]) {
    fixture.setUrl("https://example.org/diensten?utm_campaign=video_2026&oppref=TEST123#interview");
    const listener = fixture.listeners.get(event);
    assert.equal(typeof listener, "function");
    (listener as EventListener)(new Event(event));
    assert.equal(fixture.browser.location.href, "https://example.org/diensten?utm_campaign=video_2026#interview");
    assert.equal(lastContext?.page_location, "https://example.org/diensten?utm_campaign=video_2026");
  }
  stop();
});
