export const config = {
  baseUrl: import.meta.env.VITE_APP_ENDPOINT as string,
  baseEnv: import.meta.env.VITE_APP_PUBLIC_NODE_ENV as string,
  EditorKey: import.meta.env.VITE_APP_EDITOR_API_KEY as string,
};
