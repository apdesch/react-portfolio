// https://eckertalex.dev/blog/typescript-fetch-wrapper
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json().catch(() => ({}));
}

export default {
  get: async <T>(path: string, config?: RequestInit): Promise<T> => {
    const init = { method: "get", ...config };
    return await http<T>(path, init);
  },
  post: async <T, U>(
    path: string,
    body: T,
    config?: RequestInit,
  ): Promise<U> => {
    const init = { method: "post", body: JSON.stringify(body), ...config };
    return await http<U>(path, init);
  },
  put: async <T, U>(
    path: string,
    body: T,
    config?: RequestInit,
  ): Promise<U> => {
    const init = { method: "put", body: JSON.stringify(body), ...config };
    return await http<U>(path, init);
  },
  delete: async <T, U>(
    path: string,
    body: T,
    config?: RequestInit,
  ): Promise<U> => {
    const init = { method: "delete", body: JSON.stringify(body), ...config };
    return await http<U>(path, init);
  },
};
