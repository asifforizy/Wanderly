import { Destination } from "@/types/destination";

export type DestinationDetailResult =
  | { success: true; destination: Destination }
  | { success: false; message: string; notFound?: boolean };

export async function getDestination(idOrSlug: string): Promise<DestinationDetailResult> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/destinations/${encodeURIComponent(idOrSlug)}`,
      { cache: "no-store" }
    );

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success || !json.data) {
      return {
        success: false,
        message: json?.message || "Failed to load destination",
        notFound: res.status === 404,
      };
    }

    return { success: true, destination: json.data };
  } catch {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Cannot reach the API at ${process.env.BACKEND_API_URL}. Is Wanderly-Server running?`
          : "Cannot reach the server. Please try again later.",
    };
  }
}

export async function getRelatedDestinations(idOrSlug: string): Promise<Destination[]> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/destinations/${encodeURIComponent(idOrSlug)}/related`,
      { cache: "no-store" }
    );

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) return [];

    return Array.isArray(json.data) ? json.data : json.data?.data ?? [];
  } catch {
    return [];
  }
}
