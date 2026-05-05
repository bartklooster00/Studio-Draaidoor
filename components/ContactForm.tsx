"use client";

import { useForm } from "@formspree/react";
import type { FormEvent } from "react";
import { useState } from "react";
import { site } from "@/lib/site-data";

const inputClass =
  "min-h-12 rounded-md border border-bone/10 bg-ink/80 px-4 text-bone outline-none transition duration-300 placeholder:text-bone/[0.32] hover:border-bone/20 focus:border-copper/70 focus:bg-ink disabled:cursor-not-allowed disabled:opacity-60";

const textareaClass =
  "min-h-36 rounded-md border border-bone/10 bg-ink/80 p-4 text-bone outline-none transition duration-300 placeholder:text-bone/[0.32] hover:border-bone/20 focus:border-copper/70 focus:bg-ink disabled:cursor-not-allowed disabled:opacity-60";

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
    errors.naam = "Vul uw naam in.";
  }

  if (!email) {
    errors.email = "Vul uw e-mailadres in.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Vul een geldig e-mailadres in.";
  }

  if (!bericht) {
    errors.bericht = "Vul kort in waar het videoproject over gaat.";
  }

  return errors;
}

export function ContactForm() {
  const [state, handleSubmit] = useForm("xvzlavbz");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const isDisabled = state.submitting || state.succeeded;
  const hasFormspreeError = Boolean(state.errors);

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
        className="rounded-lg border border-copper/30 bg-bone/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-7"
        role="status"
      >
        <p className="text-lg font-semibold leading-7 text-bone">
          Bedankt, uw bericht is verzonden. Ik neem zo snel mogelijk contact met
          u op.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-lg border border-bone/10 bg-bone/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-7"
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
            placeholder="Naam"
            type="text"
          />
          {fieldErrors.naam ? (
            <span className={errorClass} id="naam-error">
              {fieldErrors.naam}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-medium text-bone/75">
          Bedrijf
          <input
            className={inputClass}
            disabled={isDisabled}
            name="bedrijf"
            placeholder="Bedrijfsnaam"
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
          Telefoonnummer
          <input
            className={inputClass}
            disabled={isDisabled}
            name="telefoonnummer"
            placeholder="Telefoonnummer"
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
          placeholder="Vertel kort waar het videoproject over gaat."
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
          Er ging iets mis bij het verzenden. Probeer het opnieuw of stuur een
          e-mail naar {site.email}.
        </p>
      ) : null}

      <button
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-copper bg-copper px-6 text-sm font-semibold text-ink shadow-[0_14px_36px_rgba(111,129,150,0.12)] transition duration-300 ease-out hover:border-bone hover:bg-bone disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:border-copper disabled:hover:bg-copper sm:w-auto sm:min-w-40"
        disabled={isDisabled}
        type="submit"
      >
        {state.submitting ? "Versturen..." : "Versturen"}
      </button>
    </form>
  );
}
