export type SectionId =
  | "hero"
  | "the-machine"
  | "performance"
  | "the-form"
  | "the-source"
  | "experience"
  | "footer";

export interface VideoSpec {
  /** Expected public path once the real Higgsfield/Seedance render is dropped in. */
  src: string;
  /** Poster image shown before the video is ready. */
  poster: string;
  /** Human-readable generation spec, shown in the placeholder card when src 404s. */
  spec: string;
  width: number;
  height: number;
}

export interface TechCatalogItem {
  label: string;
  value: string;
  unit?: string;
}

export interface PerformanceStat {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
}

export interface FormFeature {
  label: string;
  description: string;
}

export interface CabinMaterial {
  label: string;
  description: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  region: string;
  preferredDate: string;
  consent: boolean;
}

export type ReservationFormErrors = Partial<
  Record<keyof ReservationFormData, string>
>;
