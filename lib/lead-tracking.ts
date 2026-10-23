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

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: "generate_lead",
      parameters: LeadEventParameters
    ) => void;
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  analyticsConsent = consent;
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
  const gtag = typeof window === "undefined" ? undefined : window.gtag;

  return dispatchGenerateLead({
    consent: analyticsConsent,
    measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    send: gtag
      ? (eventName, parameters) => gtag("event", eventName, parameters)
      : undefined
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
