import assert from "node:assert/strict";
import test from "node:test";
import {
  createSuccessfulSubmissionTracker,
  dispatchGenerateLead
} from "../lib/lead-tracking.ts";

test("tracks only a transition to a successful Formspree state", () => {
  let events = 0;
  const observe = createSuccessfulSubmissionTracker(() => {
    events += 1;
    return true;
  });

  observe(false);
  assert.equal(events, 0, "a failed response must not generate an event");

  observe(true);
  assert.equal(events, 1, "a successful response generates one event");

  observe(true);
  assert.equal(events, 1, "a repeated render after success generates no event");

  observe(false);
  observe(true);
  assert.equal(events, 2, "a second successful request generates a new event");
});

test("does not send when analytics configuration is missing", () => {
  let calls = 0;
  const sent = dispatchGenerateLead({
    consent: "granted",
    send: () => {
      calls += 1;
    }
  });

  assert.equal(sent, false);
  assert.equal(calls, 0);
});

test("does not send without consent or after consent is denied", () => {
  for (const consent of ["unknown", "denied"] as const) {
    let calls = 0;
    const sent = dispatchGenerateLead({
      consent,
      measurementId: "G-TEST1234",
      send: () => {
        calls += 1;
      }
    });

    assert.equal(sent, false);
    assert.equal(calls, 0);
  }
});

test("sends only generate_lead and the configured destination", () => {
  const calls: Array<{
    eventName: string;
    parameters: Record<string, string>;
  }> = [];

  const sent = dispatchGenerateLead({
    consent: "granted",
    measurementId: "G-TEST1234",
    send: (eventName, parameters) => {
      calls.push({ eventName, parameters });
    }
  });

  assert.equal(sent, true);
  assert.deepEqual(calls, [
    {
      eventName: "generate_lead",
      parameters: { send_to: "G-TEST1234" }
    }
  ]);

  const payload = JSON.stringify(calls);
  for (const personalField of [
    "naam",
    "email",
    "telefoonnummer",
    "bedrijf",
    "bericht",
    "oppref"
  ]) {
    assert.equal(payload.includes(personalField), false);
  }
});
