import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";

import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import { FormInput } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { useVerifyPasswordMutation } from "../../stores/api/apiSlice";
import { ApiError, GetEmailService } from "../../services/service";
import Logo from "../../assets/logo.svg";
import Illu from "../../assets/illustration.svg";

function Main() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(60);
  const [otpSentTo, setOtpSentTo] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [requestError, setRequestError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const email = GetEmailService();

  const [localLoading, setLocalLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [verifyPassword] = useVerifyPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");

    const newErrors: { email?: string; password?: string } = {};
    if (!otpValue || otpValue.length < 6)
      newErrors.password = "Complete the OTP";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLocalLoading(true);

    try {
      const response = await verifyPassword({ otp: otpValue, email }).unwrap();

      if (response) {
        setSuccessMessage("verification of OTP is successful.");
        setTimeout(() => {
          navigate("/auth/reset-password");
        }, 4000);
      } else {
        navigate("/unauthorized");
      }
    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred";

      if (typeof err === "object" && err !== null) {
        const apiError = err as ApiError;
        errorMessage =
          apiError?.data?.message || apiError?.message || errorMessage;
      }

      toast.error(errorMessage);
      setRequestError(errorMessage);
      setTimeout(() => setRequestError(""), 4000);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <>
      <div
        className={clsx([
          "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <DarkModeSwitcher />
        <MainColorSwitcher />
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-6"
                  src={Logo}
                />
                <span className="ml-3 text-lg text-white"> Rubick </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-1/2 -mt-16 -intro-x"
                  src={Illu}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  A few more clicks to <br />
                  recover your account.
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>
              </div>
            </div>
            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Verify Your OTP
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  A few more clicks to reset your password. Manage all your
                  e-commerce accounts in one place
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mt-8 intro-x">
                    <div className="flex justify-between gap-2 intro-x">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          ref={(el) => (inputRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    {requestError && (
                      <div className="mt-1 text-sm text-red-500">
                        {requestError}
                      </div>
                    )}

                    {successMessage && (
                      <div className="mt-1 text-sm text-green-500">
                        {successMessage}
                      </div>
                    )}
                    {otpSentTo && (
                      <div className="mt-4 text-sm text-gray-600 text-center">
                        OTP sent to{" "}
                        <span className="font-medium">{otpSentTo}</span>
                      </div>
                    )}

                    <div className="mt-2 text-center">
                      {resendTimer > 0 ? (
                        <p className="text-sm text-gray-400">
                          Resend OTP in{" "}
                          <span className="font-semibold">{resendTimer}</span>{" "}
                          seconds
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => navigate("/auth/forget-password")}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                      disabled={localLoading}
                    >
                      {localLoading ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></span>
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
