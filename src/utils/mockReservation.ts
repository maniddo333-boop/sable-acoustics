import type { ReservationFormData } from "../types";

/**
 * No real backend is wired up. This resolves after a short delay to
 * simulate a network round trip, and fails ~15% of the time so the
 * error UI path is genuinely reachable during testing — never silently
 * "succeeds" in a way that could be mistaken for a real booking system.
 */
export function mockSubmitReservation(
  data: ReservationFormData
): Promise<{ confirmationId: string }> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error("일시적인 오류로 예약 요청을 처리하지 못했습니다."));
        return;
      }
      resolve({
        confirmationId: `SABLE-DEMO-${Date.now().toString(36).toUpperCase()}`,
      });
    }, 900);
  });
}
