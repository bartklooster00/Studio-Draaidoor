"use client";

import { useForm } from "@formspree/react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import {
  createSuccessfulSubmissionTracker,
  trackGenerateLead
} from "@/lib/lead-tracking";
import { site } from "@/lib/site-data";

const inputClass =
  "min-h-12 rounded-md border border-bone/40 bg-ink/80 px-4 text-bone outline-none transition duration-300 placeholder:text-bone/[0.32] hover:border-bone/55 focus:border-copper/70 focus:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60";

const textareaClass =
  "min-h-36 rounded-md border border-bone/40 bg-ink/80 p-4 text-bone outline-none transition duration-300 placeholder:text-bone/[0.32] hover:border-bone/55 focus:border-copper/70 focus:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60";

type FieldErrors = Partial<
  Record<"naam" | "email" | "bericht", string>
>;

const errorClass = "text-sm font-medium text-copper-light";

function getFormErrors(form: HTMLFormElement): FieldErrors {
  const data = new FormData(form);
  const naam = String(data.get("naam") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const bericht = String(data.get("bericht") ?? "").trim();
  const errors: FieldErrors = {};

  if (!naam) {
    errors.naam = "Vul je naam in.";
  }

  if (!email) {
    errors.email = "Vul je e-mailadres in.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Vul een geldig e-mailadres in.";
  }

  if (!bericht) {
    errors.bericht = "Vertel kort wat je voor ogen hebt.";
  }

  return errors;
}

export function ContactForm() {
  const [state, handleSubmit] = useForm("xvzlavbz");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const successTracker = useRef(
    createSuccessfulSubmissionTracker(trackGenerateLead)
  );
  const isDisabled = state.submitting || state.succeeded;
  const hasFormspreeError = Boolean(state.errors);

  useEffect(() => {
    successTracker.current(state.succeeded);
  }, [state.succeeded]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = getFormErrors(event.currentTarget);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    await handleSubmit(event);
  }

  if (state.succeeded) {
    return (
      <div
        className="border-t border-copper/30 pt-6"
        role="status"
      >
        <p className="text-lg font-semibold leading-7 text-bone">
          Bedankt voor je bericht. Het is verzonden. Ik neem zo snel mogelijk
          contact met je op.
        </p>
      </div>
    );
  }

  return (
    <form
      className="w-full"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-bone/75">
          Naam
          <input
            className={inputClass}
            disabled={isDisabled}
            aria-describedby={fieldErrors.naam ? "naam-error" : undefined}
            aria-invalid={Boolean(fieldErrors.naam)}
            name="naam"
            placeholder="Je naam"
            type="text"
          />
          {fieldErrors.naam ? (
            <span className={errorClass} id="naam-error">
              {fieldErrors.naam}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-medium text-bone/75">
          Bedrijf (optioneel)
          <input
            className={inputClass}
            disabled={isDisabled}
            name="bedrijf"
            placeholder="Naam van je bedrijf"
            type="text"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-bone/75">
          E-mailadres
          <input
            className={inputClass}
            disabled={isDisabled}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            aria-invalid={Boolean(fieldErrors.email)}
            name="email"
            placeholder="naam@bedrijf.nl"
            type="email"
          />
          {fieldErrors.email ? (
            <span className={errorClass} id="email-error">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-medium text-bone/75">
          Telefoonnummer (optioneel)
          <input
            className={inputClass}
            disabled={isDisabled}
            name="telefoonnummer"
            placeholder="Je telefoonnummer"
            type="tel"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-medium text-bone/75">
        Bericht
        <textarea
          className={textareaClass}
          disabled={isDisabled}
          aria-describedby={fieldErrors.bericht ? "bericht-error" : undefined}
          aria-invalid={Boolean(fieldErrors.bericht)}
          name="bericht"
          placeholder="Wat wil je laten maken? Een paar zinnen is genoeg."
        />
        {fieldErrors.bericht ? (
          <span className={errorClass} id="bericht-error">
            {fieldErrors.bericht}
          </span>
        ) : null}
      </label>

      {hasFormspreeError ? (
        <p
          className="mt-4 rounded-md border border-bone/10 bg-bone/[0.03] px-4 py-3 text-sm leading-6 text-bone/75"
          role="alert"
        >
          Versturen is niet gelukt. Probeer het opnieuw of mail naar {site.email}.
        </p>
      ) : null}

      <button
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-copper bg-copper px-6 text-sm font-semibold text-white transition duration-300 ease-out hover:border-bone hover:bg-bone hover:text-ink disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:border-copper disabled:hover:bg-copper disabled:hover:text-white sm:w-auto sm:min-w-40"
        disabled={isDisabled}
        type="submit"
      >
        {state.submitting ? "Bezig met versturen..." : "Verstuur je bericht"}
      </button>
    </form>
  );
}
