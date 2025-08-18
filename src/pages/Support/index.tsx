import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { Copy, Check } from "lucide-react";
import Footer from "../../components/Layout/Footer";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";

interface DonationFormData {
  fullName: string;
  emailAddress: string;
  amount: string;
}

interface BankAccountCardProps {
  accountNumber: string;
  accountName: string;
  bankName: string;
  className?: string;
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({
  accountNumber = "0511414584",
  accountName = "Business The Way Allaah Wants It Initiative",
  bankName = "Alternative Bank",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy account number:", err);
    }
  };

  return (
    <div
      className={`md:container mt-4 md:mt-10 px-4 mb-6 md:mb-12 ${className}`}
    >
      <div className="flex items-center justify-between w-full bg-neutralBlue p-6 md:p-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#002D62] mb-1 font-aeonik">
            {accountNumber}
          </h2>
          <p className="text-lg text-[#002D62] mb-1 font-aeonik">
            {accountName}
          </p>
          <p className="text-lg text-[#002D62] font-aeonik">{bankName}</p>
        </div>

        <div className="ml-4">
          <button
            onClick={handleCopyAccountNumber}
            className="flex items-center gap-2 px-4 py-4 text-sm text-[#002D62] hover:text-gray-800 transition-colors duration-200 border border-[#002D62] shadow-lg rounded-full font-aeonik"
            title="Copy account number"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-green-600 font-aeonik">Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="font-aeonik">Copy account number</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<DonationFormData>();

  // Initialize Paystack payment
  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    email: watch("emailAddress"),
    amount: Number(watch("amount")) * 100, // Convert to kobo
    publicKey: "your_paystack_public_key", // Replace with your Paystack public key
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: watch("fullName"),
        },
      ],
    },
    currency: "NGN",
  });

  const onSuccess = async (response: any) => {
    try {
      // Verify payment with your backend
      const verificationResponse = await axios.post(
        "https://btwawi.onrender.com/api/v1/order/verify",
        {
          reference: response.reference,
          ...watch(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        verificationResponse.status >= 200 &&
        verificationResponse.status < 300
      ) {
        enqueueSnackbar("Payment successful! Thank you for your donation.", {
          variant: "success",
        });
        reset();
        setIsModalOpen(true);
      } else {
        throw new Error(`Http Error: ${verificationResponse.status}`);
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      enqueueSnackbar("Payment verification failed. Please contact support.", {
        variant: "error",
      });
    }
  };

  const onClose = () => {
    enqueueSnackbar("Payment was not completed", { variant: "warning" });
  };

  const onSubmit: SubmitHandler<DonationFormData> = async (data) => {
    // Initialize Paystack payment when form is submitted
    initializePayment({
      onSuccess: (response) => onSuccess(response),
      onClose: () => onClose(),
    });
  };
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setIsMobileMenuOpen(isOpen);
  };

  return (
    <div>
      <Header onMenuToggle={handleMobileMenuToggle} />
      <div className="md:container mt-4 md:mt-10 px-4 mb-6 md:mb-12">
        <div className="bg-neutralBlue font-aeonik flex flex-col text-prussianBlue items-center justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-medium text-center">
            Support a Movement <br /> That Matters
          </h1>
          <p className="w-full max-w-[540px] text-lg md:text-2xl text-center mt-6">
            Your donation can help raise businesses the way Allaah wants it.
          </p>
        </div>

        <section className="w-full">
          <div className=" px-4 h-full flex items-center">
            <div className=" flex items-center justify-between">
              <div className="flex-1 pr-8">
                <p className="text-[#002D62] font-aeonik text-medium font-[400] mb-8">
                  Since 2022, Business The Way Allaah Wants It Initiative has
                  touched thousands of lives connecting Muslims and ethical
                  business owners with knowledge, networks, and opportunities to
                  build wealth the halal way.
                </p>
                <p className="text-[#002D62] font-aeonik text-medium font-normal mb-12">
                  From impactful conferences in Lagos and Abuja, to vendor
                  fairs, lectures, and free business development tools, every
                  step has been powered by people like you; people who believe
                  in something bigger.
                </p>
                <p className="text-[#002D62] font-aeonik text-medium font-normal">
                  But here's the truth: Putting together these events requires a
                  lot-from venue, logistics, media, volunteers, welfare, and
                  more. And because we keep it free and open to all, we rely on
                  your support to make it happen.
                </p>
              </div>

              <div className="relative w-[528px] h-[457px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/52db6c4b10cc7942ee5adb62a5ab8421879977d3?width=1040"
                  alt="Support Image"
                  className="absolute right-0 top-0 w-[520px] h-[457px] object-cover"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/cd7581bb54d0955de1cb8a69d984619fac5176ff?width=487"
                  alt="Heart with money"
                  className="absolute left-0 bottom-0 w-[243px] h-[214px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col gap-1 w-full md:w-1/2">
              <label
                htmlFor="fullName"
                className="text-base md:text-xl text-left text-primaryGray"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register("fullName", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                placeholder="Enter here"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full md:w-1/2">
              <label
                htmlFor="emailAddress"
                className="text-base md:text-xl text-left text-primaryGray"
              >
                Email
              </label>
              <input
                id="emailAddress"
                type="email"
                {...register("emailAddress", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                placeholder="Enter here"
              />
              {errors.emailAddress && (
                <p className="text-red-500 text-sm">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full md:w-1/2">
              <label
                htmlFor="amount"
                className="text-base md:text-xl text-left text-primaryGray"
              >
                Amount (NGN)
              </label>
              <input
                id="amount"
                type="number"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 1,
                    message: "Amount must be at least ₦1",
                  },
                })}
                className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                placeholder="Enter amount in Naira"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              title="submit"
              disabled={isSubmitting}
              className="text-lg md:w-[280px] w-full font-extrabold font-aeonik flex items-center justify-center gap-2 py-6 px-10 rounded-full bg-lightYellowBase hover:bg-white hover:border cursor-pointer hover:border-lightYellowBase hover:text-lightYellowBase transition disabled:opacity-50"
            >
              {isSubmitting && (
                <div className="w-5 h-5 border-prussianBlue border-t-transparent rounded-full animate-spin"></div>
              )}
              {isSubmitting ? "Processing" : "Donate Now"} &rarr;
            </button>
          </div>
        </form>

        <BankAccountCard
          accountNumber="0511414584"
          accountName="Business The Way Allaah Wants It Initiative"
          bankName="Alternative Bank"
          className="max-w-lg"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Support;
