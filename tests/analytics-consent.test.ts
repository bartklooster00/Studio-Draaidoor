import assert from "node:assert/strict";
import test from "node:test";
import {
  CONSENT_VERSION,
  buildAnalyticsPageLocation,
  createStoredConsent,
  getAnalyticsCookieNames,
  getCookieDomains,
  parseStoredConsent,
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
