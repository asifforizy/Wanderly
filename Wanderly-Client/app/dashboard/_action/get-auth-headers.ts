import { cookies } from "next/headers";

export async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  return {
    Authorization: `Bearer ${token}`,
    Cookie: cookieStore.toString(),
  };
}
