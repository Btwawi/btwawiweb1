import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import moneyBag from "../../assets/images/money.png";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./component/SuccessModal";
import { useSnackbar } from "notistack";

interface GrantFormData extends FieldValues {
  ownerFullName: string;
  businessName: string;
  businessEmailAddress: string;
  businessPhoneNumber: string;
  businessCategory: string;
  yearsInBusiness: string;
  stateOfOperation: string;
  businessOnlinePlatform: string;
  businessDescription: string;
  businessContribution: string;
  businessShariahCompliance: string;
  howGrantWillBenefit: string;
  haveAttendedBtwawi: string;
  supportingDocuments: string[];
}

const GrantPage = () => {
  const {
    reset,
    register,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<GrantFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descCount, setDescCount] = useState(0);
  const [contribCount, setContribCount] = useState(0);
  const [shariahCount, setShariahCount] = useState(0);
  const [grantCount, setGrantCount] = useState(0);
  const [fileName, setFileName] = useState(
    "CAC, Utility bill, SCUML, and other certifications"
  );

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
      files: FileList | null;
    };
  }

  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleFileChange = (e: FileChangeEvent): void => {
    const file = e.target.files?.[0];
    setFileName(
      file ? file.name : "CAC, Utility bill, SCUML, and other certifications"
    );
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const onSubmit: SubmitHandler<GrantFormData> = async (data) => {
    
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/grant/request-grant",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        enqueueSnackbar("Form submitted successfully!", { variant: "success" });
        reset();
        setIsModalOpen(true);
        return response.data;
      } else {
        throw new Error(`Http Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Form Data:", data);
  };

  return (
    <>
      <Header />
      <div className="md:container px-4 mb-0 md:mb-12">
        <div className="bg-neutralBlue font-aeonik flex flex-col text-prussianBlue items-center justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-medium text-center">
            Apply for the BTWAWI <br /> Business Grant
          </h1>
          <p className="w-full max-w-[540px] text-lg md:text-2xl text-center mt-6">
            Are you running a business that aligns with Islamic values and needs
            support to grow? We want to help.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-8 w-full ">
          <div className="text-prussianBlue font-aeonik py-10 text-lg md:text-3xl w-full md:w-1/2 px-4 md:px-4 leading-11  flex flex-col gap-4 md:gap-8">
            <p className="text-left">
              Our Business Grant is designed to support Halal-conscious
              entrepreneurs working hard to build ethical businesses. Whether
              you are just starting out or need support to scale, we invite you
              to apply.
            </p>
            <p className="text-left">
              We are offering financial support to a few selected businesses who
              show promise, purpose, and integrity in the way they operate.
            </p>
          </div>
          <div className="flex justify-center w-full md:w-1/2 ">
            <img src={moneyBag} alt="recognition badge" />
          </div>
        </div>
        <div className="font-aeonik mt-5 md:mt-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-prussianBlue text-center">
            Fill the form below
          </h3>

          <form
            className="flex flex-col gap-8 mt-4 md:mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-4 md:px-14 py-8 flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Business Owner Full Name */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="ownerFullName"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Full Name (Owner of business)
                    </label>
                    <input
                      id="ownerFullName"
                      type="text"
                      {...register("ownerFullName", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.ownerFullName && (
                      <p className="text-red-500 text-sm">
                        {errors.ownerFullName.message}
                      </p>
                    )}
                  </div>
                  {/* Business Name */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="businessName"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      {...register("businessName", {
                        required: "Business name is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm">
                        {errors.businessName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Business Mail */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="businessEmailAddress"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business Email Address
                    </label>
                    <input
                      id="businessEmailAddress"
                      type="email"
                      {...register("businessEmailAddress", {
                        required: "Business Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.businessEmailAddress && (
                      <p className="text-red-500 text-sm">
                        {errors.businessEmailAddress.message}
                      </p>
                    )}
                  </div>

                  {/* Business Number */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="businessPhoneNumber"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business Phone Number
                    </label>
                    <input
                      id="businessPhoneNumber"
                      type="tel"
                      {...register("businessPhoneNumber", {
                        required: "Business name is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.businessPhoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.businessPhoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Business Category */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="businessCategory"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business Category
                    </label>
                    <select
                      id="businessCategory"
                      {...register("businessCategory", {
                        required: "Business category is required",
                      })}
                      className="border text-primaryGray border-light-blue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="" className="text-lightGray100">
                        Select a category
                      </option>
                        <option value="Cooked Meal">Cooked Meal</option>
                        <option value="Beverages and Drinks">Beverages and Drinks</option>
                        <option value="Islamic Items">Islamic Items</option>
                        <option value="Modest Wears">Modest Wears</option>
                        <option value="Educational Materials">Educational Materials</option>
                        <option value="Jewelries and Accessories">Jewelries and Accessories</option>
                        <option value="Spices/Raw food">Spices/Raw food</option>
                        <option value="Printing Services">Printing Services</option>
                        <option value="Consultation Firm">Consultation Firm</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.businessCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.businessCategory.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="yearsInBusiness"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Years in Business
                    </label>
                    <input
                      id="yearsInBusiness"
                      type="number"
                      {...register("yearsInBusiness", {
                        required: "Years in business is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.yearsInBusiness && (
                      <p className="text-red-500 text-sm">
                        {errors.yearsInBusiness.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="stateOfOperation"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      State of Operation
                    </label>
                    <input
                      id="stateOfOperation"
                      type="text"
                      {...register("stateOfOperation")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.stateOfOperation && (
                      <p className="text-red-500 text-sm">
                        {errors.stateOfOperation.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="businessOnlinePlatform"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business Website or Social Media Handle
                    </label>
                    <input
                      id="businessOnlinePlatform"
                      type="text"
                      {...register("businessOnlinePlatform", {
                        required: "Business contact is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.businessOnlinePlatform && (
                      <p className="text-red-500 text-sm">
                        {errors.businessOnlinePlatform.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full md:w-1/2 relative">
                    <label
                      htmlFor="businessDescription"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Describe your business and what it does. (250 words)
                    </label>
                    <textarea
                      id="businessDescription"
                      {...register("businessDescription", {
                        required: "Your business description is required",
                      })}
                      onChange={(e) => {
                        setValue("businessDescription", e.target.value);
                        setDescCount(countWords(e.target.value));
                      }}
                      placeholder="Enter here"
                      className="border h-51 text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {descCount}/250 words
                    </span>
                    {errors.businessDescription && (
                      <p className="text-red-500 text-sm">
                        {errors.businessDescription.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2 relative">
                    <label
                      htmlFor="businessContribution"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      How does your business contribute to Sustainable
                      Development Goals. (250 words)
                    </label>
                    <textarea
                      id="businessContribution"
                      {...register("businessContribution", {
                        required: "Your business contribution is required",
                      })}
                      onChange={(e) => {
                        setValue("businessContribution", e.target.value);
                        setContribCount(countWords(e.target.value));
                      }}
                      placeholder="Enter here"
                      className="border h-44 text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {contribCount}/250 words
                    </span>

                    {errors.businessContribution && (
                      <p className="text-red-500 text-sm">
                        {errors.businessContribution.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full md:w-1/2 relative">
                    <label
                      htmlFor="businessShariahCompliance"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      What makes your business shariah-compliant. (150 words)
                    </label>
                    <textarea
                      id="businessShariahCompliance"
                      {...register("businessShariahCompliance", {
                        required: "Shariah compliance is required",
                      })}
                      onChange={(e) => {
                        setValue("businessShariahCompliance", e.target.value);
                        setShariahCount(countWords(e.target.value));
                      }}
                      placeholder="Enter here"
                      className="border h-44 text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {shariahCount}/150 words
                    </span>

                    {errors.businessShariahCompliance && (
                      <p className="text-red-500 text-sm">
                        {errors.businessShariahCompliance.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2 relative">
                    <label
                      htmlFor="howGrantWillBenefit"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      How will the grant help your business grow? (300 words)
                    </label>
                    <textarea
                      id="howGrantWillBenefit"
                      {...register("howGrantWillBenefit", {
                        required: "Grant benefit is required",
                      })}
                      onChange={(e) => {
                        setValue("howGrantWillBenefit", e.target.value);
                        setGrantCount(countWords(e.target.value));
                      }}
                      placeholder="Enter here"
                      className="border h-44 text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {grantCount}/300 words
                    </span>
                    {errors.howGrantWillBenefit && (
                      <p className="text-red-500 text-sm">
                        {errors.howGrantWillBenefit.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="haveAttendedBtwawi"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Have you attended any BTWAWI event before? (Yes/No)
                    </label>
                    <select
                      id="haveAttendedBtwawi"
                      {...register("haveAttendedBtwawi", {
                        required: "This question is required",
                      })}
                      className="border text-primaryGray border-light-blue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="" className="text-lightGray100">
                        Select One
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.haveAttendedBtwawi && (
                      <p className="text-red-500 text-sm">
                        {errors.haveAttendedBtwawi.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="supportingDocuments"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Upload supporting documents
                      <span className="truncate text-xs ml-1">
                        (merge multiple documents into a single pdf file)
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="supportingDocuments"
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.pdf,.doc,.docx"
                        {...register("supportingDocuments", {
                          required: "Supporting document is required",
                          validate: {
                            size: () => {
                              const fileInput = document.getElementById(
                                "supportingDocuments"
                              ) as HTMLInputElement;
                              const files = fileInput?.files;
                              if (!files || files.length === 0) return true;
                              return (
                                files[0].size <= 2 * 1024 * 1024 ||
                                "File size must be less than 2MB"
                              );
                            },
                          },
                        })}
                        onChange={handleFileChange}
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                      />
                      <label
                        htmlFor="supportingDocuments"
                        className="border border-lightBlue p-3 w-full rounded-lg bg-white text-lightGray100 flex items-center cursor-pointer hover:bg-gray-50"
                      >
                        <span className="flex-1 truncate">{fileName}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  title="submit"
                  disabled={isSubmitting}
                  className="text-lg md:w-[280px] w-full font-extrabold font-aeonik flex items-center justify-center gap-2 py-6 px-10 rounded-full bg-lightYellowBase hover:bg-white hover:border cursor-pointer hover:border-lightYellowBase hover:text-lightYellowBase transition disabled:opacity-50"
                >
                  {isSubmitting && (
                    <div className="w-5 h-5 border-prussianBlue border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitting
                    ? "Submitting application"
                    : "Submit application"}
                  <BsArrowRight size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <SuccessModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default GrantPage;
