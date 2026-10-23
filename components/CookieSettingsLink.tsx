"use client";

export const OPEN_CONSENT_SETTINGS_EVENT = "studio-draaidoor:open-consent-settings";

export function CookieSettingsLink() {
  return (
    <button
      className="text-left text-lg leading-[1.65] text-bone/[0.7] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT))}
      type="button"
    >
      Cookie-instellingen
    </button>
  );
}
