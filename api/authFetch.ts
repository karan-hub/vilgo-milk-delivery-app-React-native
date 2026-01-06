import { refreshAccessToken } from "@/api/authApi";
import { clearTokens, getAccessToken, saveAccessToken } from "@/utils/tokenStorage";

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = await getAccessToken();

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });

  //  token expired → try refresh - ONCE
  if (res.status === 401) {
    const refreshResponse = await refreshAccessToken();

    if (!refreshResponse) {
      await clearTokens();
      throw new Error("Session expired");
    }

    await saveAccessToken(refreshResponse.accessToken);

    // Retry original request
    res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${refreshResponse.accessToken}`,
      },
      credentials: "include",
    });
  }

  return res;
}
