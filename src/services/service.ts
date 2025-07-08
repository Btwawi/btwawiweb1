import Cookies from "js-cookie";

const EMAIL_COOKIE_KEY = "email";

export const SetEmailService = (
  email: string,
  options?: Cookies.CookieAttributes
) => {
  Cookies.set(EMAIL_COOKIE_KEY, email, {
    expires: 7,
    sameSite: "Lax",
    ...options,
  });
};

export const GetEmailService = (): string | undefined => {
  return Cookies.get(EMAIL_COOKIE_KEY);
};

export const RemoveEmailService = () => {
  Cookies.remove(EMAIL_COOKIE_KEY);
};

export interface ApiError {
  data?: {
    message?: string;
    status?: string;
    statusCode?: number;
  };
  message?: string;
}
