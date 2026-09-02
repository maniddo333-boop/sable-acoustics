import { useState, type FormEvent } from "react";
import { REGION_OPTIONS } from "../data/content";
import { mockSubmitReservation } from "../utils/mockReservation";
import type {
  FormStatus,
  ReservationFormData,
  ReservationFormErrors,
} from "../types";

const EMPTY_FORM: ReservationFormData = {
  name: "",
  email: "",
  phone: "",
  region: "",
  preferredDate: "",
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9\-+ ]{8,20}$/;

function validate(data: ReservationFormData): ReservationFormErrors {
  const errors: ReservationFormErrors = {};

  if (!data.name.trim()) errors.name = "이름을 입력해주세요.";
  if (!data.email.trim()) errors.email = "이메일을 입력해주세요.";
  else if (!EMAIL_PATTERN.test(data.email))
    errors.email = "올바른 이메일 형식이 아닙니다.";

  if (!data.phone.trim()) errors.phone = "연락처를 입력해주세요.";
  else if (!PHONE_PATTERN.test(data.phone))
    errors.phone = "올바른 연락처 형식이 아닙니다.";

  if (!data.region) errors.region = "희망 지역을 선택해주세요.";
  if (!data.preferredDate) errors.preferredDate = "희망 날짜를 선택해주세요.";
  if (!data.consent) errors.consent = "개인정보 수집에 동의해주세요.";

  return errors;
}

const inputClass =
  "w-full rounded-xl border border-hairline bg-graphite-900 px-4 py-3 text-sm text-ivory placeholder:text-muted/60 transition-colors duration-300 focus:border-amber/60";

export function ReservationForm() {
  const [data, setData] = useState<ReservationFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ReservationFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = <K extends keyof ReservationFormData>(
    key: K,
    value: ReservationFormData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setSubmitError(null);

    try {
      const result = await mockSubmitReservation(data);
      setConfirmationId(result.confirmationId);
      setStatus("success");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[2rem] border border-hairline bg-graphite-900 p-8 text-center sm:p-12"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-amber">
          Demo Submission Received
        </p>
        <h3 className="mt-4 font-display text-2xl font-semibold text-ivory">
          예약 요청이 접수되었습니다
        </h3>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          이것은 데모 제출입니다. 실제 예약 시스템과 연동되어 있지 않으며,
          아무 요청도 전송되지 않았습니다.
        </p>
        <p className="mt-4 font-mono-data text-xs text-muted">
          Reference: {confirmationId}
        </p>
        <button
          onClick={() => {
            setData(EMPTY_FORM);
            setStatus("idle");
            setConfirmationId(null);
          }}
          className="mt-8 rounded-full border border-hairline px-5 py-2 text-xs uppercase tracking-[0.15em] text-ivory transition-colors duration-300 hover:border-amber/60"
        >
          새로 작성하기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[2rem] border border-hairline bg-graphite-900 p-8 sm:p-10"
    >
      {status === "error" && submitError && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-xs text-red-300"
        >
          {submitError} 다시 시도해주세요.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-xs text-muted">
            이름
          </label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-1.5 block text-xs text-muted">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setField("email", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-1.5 block text-xs text-muted">
            연락처
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="region" className="mb-1.5 block text-xs text-muted">
            희망 지역
          </label>
          <select
            id="region"
            value={data.region}
            onChange={(e) => setField("region", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.region}
            aria-describedby={errors.region ? "region-error" : undefined}
          >
            <option value="">선택해주세요</option>
            {REGION_OPTIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p id="region-error" className="mt-1.5 text-xs text-red-400">
              {errors.region}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="preferredDate"
            className="mb-1.5 block text-xs text-muted"
          >
            희망 날짜
          </label>
          <input
            id="preferredDate"
            type="date"
            value={data.preferredDate}
            onChange={(e) => setField("preferredDate", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={
              errors.preferredDate ? "preferredDate-error" : undefined
            }
          />
          {errors.preferredDate && (
            <p id="preferredDate-error" className="mt-1.5 text-xs text-red-400">
              {errors.preferredDate}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          checked={data.consent}
          onChange={(e) => setField("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-hairline bg-graphite-900 accent-amber"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-muted">
          개인정보 수집 및 이용에 동의합니다. 수집된 정보는 청음 예약 안내
          목적으로만 사용됩니다.
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="mt-1.5 text-xs text-red-400">
          {errors.consent}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 w-full rounded-full bg-ivory py-3 text-sm font-medium text-graphite-950 transition-colors duration-300 ease-weighted hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "제출 중..." : "예약 요청 보내기"}
      </button>
    </form>
  );
}
