export type AnalyticsConsent = "unknown" | "denied" | "granted";

type LeadEventParameters = Readonly<{
  send_to: string;
}>;

type LeadEventSender = (
  eventName: "generate_lead",
  parameters: LeadEventParameters
) => void;

type LeadEventContext = {
  consent: AnalyticsConsent;
  measurementId?: string;
  send?: LeadEventSender;
};

let analyticsConsent: AnalyticsConsent = "unknown";
let analyticsReady = false;
let pendingGenerateLeads = 0;

declare global {
  interface Window {
    gtag?: (command: string, ...parameters: unknown[]) => void;
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  analyticsConsent = consent;

  if (consent !== "granted") {
    pendingGenerateLeads = 0;
  }
}

export function getAnalyticsConsent() {
  return analyticsConsent;
}

export function setAnalyticsReady(ready: boolean) {
  analyticsReady = ready;
}

function getConfiguredSender(): LeadEventSender | undefined {
  if (typeof window === "undefined" || !window.gtag) return undefined;
  return (eventName, parameters) => window.gtag?.("event", eventName, parameters);
}

export function flushPendingGenerateLeads() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const send = getConfiguredSender();

  if (
    analyticsConsent !== "granted" ||
    !analyticsReady ||
    !measurementId ||
    !/^G-[A-Z0-9]{6,}$/i.test(measurementId) ||
    !send
  ) {
    return 0;
  }

  const numberToSend = pendingGenerateLeads;
  pendingGenerateLeads = 0;

  for (let index = 0; index < numberToSend; index += 1) {
    send("generate_lead", { send_to: measurementId });
  }

  return numberToSend;
}

export function dispatchGenerateLead({
  consent,
  measurementId,
  send
}: LeadEventContext) {
  if (
    consent !== "granted" ||
    !measurementId ||
    !/^G-[A-Z0-9]{6,}$/i.test(measurementId) ||
    !send
  ) {
    return false;
  }

  send("generate_lead", { send_to: measurementId });
  return true;
}

export function trackGenerateLead() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  if (
    analyticsConsent !== "granted" ||
    !measurementId ||
    !/^G-[A-Z0-9]{6,}$/i.test(measurementId)
  ) {
    return false;
  }

  const send = analyticsReady ? getConfiguredSender() : undefined;

  if (!send) {
    pendingGenerateLeads += 1;
    return true;
  }

  return dispatchGenerateLead({
    consent: analyticsConsent,
    measurementId,
    send
  });
}

export function createSuccessfulSubmissionTracker(
  track: () => boolean = trackGenerateLead
) {
  let previousSucceeded = false;

  return (succeeded: boolean) => {
    if (succeeded && !previousSucceeded) {
      track();
    }

    previousSucceeded = succeeded;
  };
}
