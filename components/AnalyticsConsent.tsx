"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { OPEN_CONSENT_SETTINGS_EVENT } from "@/components/CookieSettingsLink";
import {
  CONSENT_STORAGE_KEY,
  buildAnalyticsPageLocation,
  createStoredConsent,
  parseStoredConsent,
  protectAnalyticsUrls,
  removeAnalyticsCookies,
  sanitizeAnalyticsReferrer,
  type AnalyticsConsentChoice
} from "@/lib/analytics-consent";
import {
  flushPendingGenerateLeads,
  getAnalyticsConsent,
  setAnalyticsConsent,
  setAnalyticsReady
} from "@/lib/lead-tracking";

type GtagArguments = [command: string, ...parameters: unknown[]];

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: GtagArguments) => void;
    studioDraaidoorGaConfigured?: boolean;
  }
}

const GA_SCRIPT_ID = "studio-draaidoor-ga4";
const ANALYTICS_READY_EVENT = "studio-draaidoor:analytics-ready";
const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const hasValidMeasurementId = Boolean(
  measurementId && /^G-[A-Z0-9]{6,}$/i.test(measurementId)
);
let stopUrlProtection: (() => void) | undefined;

function prepareAnalyticsUrls() {
  if (!stopUrlProtection) {
    stopUrlProtection = protectAnalyticsUrls(window, (context) => {
      if (getAnalyticsConsent() !== "granted") return;
      // Global defaults also protect events emitted by Enhanced Measurement.
      window.gtag?.("set", context);
    });
  }

  return {
    page_location: buildAnalyticsPageLocation(
      window.location.origin,
      window.location.pathname,
      window.location.search
    ),
    page_referrer: sanitizeAnalyticsReferrer(document.referrer)
  };
}

function setGoogleDisabled(disabled: boolean) {
  if (!measurementId) return;
  Object.assign(window, { [`ga-disable-${measurementId}`]: disabled });
}

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    (function gtag(..._args: GtagArguments) {
      window.dataLayer?.push(arguments);
    });
}

function configureGoogleAnalytics() {
  if (
    !measurementId ||
    !window.gtag ||
    window.studioDraaidoorGaConfigured ||
    getAnalyticsConsent() !== "granted"
  ) {
    return;
  }

  const context = prepareAnalyticsUrls();
  window.gtag("set", context);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
  window.studioDraaidoorGaConfigured = true;
  setAnalyticsReady(true);
  flushPendingGenerateLeads();
  window.dispatchEvent(new Event(ANALYTICS_READY_EVENT));
}

function loadGoogleAnalytics() {
  if (!hasValidMeasurementId || !measurementId) return;

  setGoogleDisabled(false);
  ensureGtagQueue();
  window.gtag?.("set", prepareAnalyticsUrls());
  window.gtag?.(
    "consent",
    window.studioDraaidoorGaConfigured ? "update" : "default",
    {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "granted"
    }
  );

  if (window.studioDraaidoorGaConfigured) {
    setAnalyticsReady(true);
    flushPendingGenerateLeads();
    window.dispatchEvent(new Event(ANALYTICS_READY_EVENT));
    return;
  }

  const existingScript = document.getElementById(GA_SCRIPT_ID) as
    | HTMLScriptElement
    | null;

  if (existingScript) {
    if (existingScript.dataset.loaded === "true") {
      configureGoogleAnalytics();
    } else {
      existingScript.addEventListener("load", configureGoogleAnalytics, {
        once: true
      });
    }
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.id = GA_SCRIPT_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.addEventListener(
    "load",
    () => {
      script.dataset.loaded = "true";
      configureGoogleAnalytics();
    },
    { once: true }
  );
  document.head.appendChild(script);
}

function denyGoogleAnalytics() {
  setAnalyticsConsent("denied");
  setAnalyticsReady(false);
  setGoogleDisabled(true);
  window.gtag?.("consent", "update", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "denied"
  });
  removeAnalyticsCookies();
  stopUrlProtection?.();
  stopUrlProtection = undefined;
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsConsentChoice | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAnalyticsReady, setIsAnalyticsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const storedConsent = parseStoredConsent(
      window.localStorage.getItem(CONSENT_STORAGE_KEY)
    );

    setChoice(storedConsent?.analytics ?? null);
    setIsHydrated(true);

    if (storedConsent?.analytics === "granted") {
      setAnalyticsConsent("granted");
      loadGoogleAnalytics();
    } else if (storedConsent?.analytics === "denied") {
      denyGoogleAnalytics();
    } else {
      setAnalyticsConsent("unknown");
      setAnalyticsReady(false);
    }

    return () => {
      stopUrlProtection?.();
      stopUrlProtection = undefined;
    };
  }, []);

  useEffect(() => {
    const markAnalyticsReady = () => setIsAnalyticsReady(true);
    window.addEventListener(ANALYTICS_READY_EVENT, markAnalyticsReady);
    return () => window.removeEventListener(ANALYTICS_READY_EVENT, markAnalyticsReady);
  }, []);

  useEffect(() => {
    const openSettings = () => setIsSettingsOpen(true);
    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (
      choice !== "granted" ||
      !isAnalyticsReady ||
      !window.studioDraaidoorGaConfigured ||
      !window.gtag ||
      !measurementId ||
      lastTrackedPath.current === pathname
    ) {
      return;
    }

    const context = prepareAnalyticsUrls();
    window.gtag("event", "page_view", {
      ...context,
      page_path: pathname,
      page_title: document.title,
      send_to: measurementId
    });
    lastTrackedPath.current = pathname;
  }, [choice, isAnalyticsReady, pathname]);

  function saveChoice(nextChoice: AnalyticsConsentChoice) {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify(createStoredConsent(nextChoice))
    );
    setChoice(nextChoice);
    setIsSettingsOpen(false);

    if (nextChoice === "granted") {
      setAnalyticsConsent("granted");
      loadGoogleAnalytics();
      return;
    }

    lastTrackedPath.current = null;
    setIsAnalyticsReady(false);
    denyGoogleAnalytics();
  }

  if (!isHydrated || (choice && !isSettingsOpen)) return null;

  return (
    <section
      aria-labelledby="analytics-consent-title"
      className="fixed inset-x-0 bottom-0 z-[70] bg-[#17191B] px-[5vw] py-6 text-white"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-[72ch]">
          <h2
            className="m-0 text-[17px] font-semibold leading-normal"
            id="analytics-consent-title"
          >
            Cookies en statistieken
          </h2>
          <p className="mt-2 text-sm leading-[1.6] text-white/[0.78]">
            Studio DraaiDoor gebruikt noodzakelijke opslag om je keuze te onthouden.
            Met jouw toestemming gebruiken we Google Analytics om websitebezoek en
            contactaanvragen te meten. Je kunt statistieken weigeren en je keuze
            later altijd wijzigen. Lees meer in de{" "}
            <Link
              className="text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/privacy"
            >
              privacyverklaring
            </Link>.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:min-w-[390px]">
          <button
            className="min-h-11 rounded-lg border border-white/[0.34] bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => saveChoice("denied")}
            type="button"
          >
            Cookies weigeren
          </button>
          <button
            className="min-h-11 rounded-lg border border-white/[0.34] bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => saveChoice("granted")}
            type="button"
          >
            Cookies accepteren
          </button>
        </div>
      </div>
    </section>
  );
}
