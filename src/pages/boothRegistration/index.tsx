import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import booth from "../../assets/images/booth.png";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./component/SuccessModal";
import { useSnackbar } from "notistack";
import { RiInstagramFill, RiFacebookFill, RiTwitterXFill } from "react-icons/ri";

interface BoothRegistrationFormData extends FieldValues {
  email: string;
  vendorCompanyName: string;
  contactPersonName: string;
  phoneNumber: string;
  website?: string;
  socialMediaHandles: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  pastEditionAttendance: string;
  experience?: string;
  businessCategory: string;
  businessDescription: string;
  exhibitionRequirements: string;
  willingToPay: string;
  agreeToGuidelines: string;
}

const BoothRegistrationPage = () => {
  const {
    reset,
    register,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<BoothRegistrationFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descCount, setDescCount] = useState(0);
  const [requirementsCount, setRequirementsCount] = useState(0);

  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const onSubmit: SubmitHandler<BoothRegistrationFormData> = async (data) => {
    const transformedData = {
    ...data,
    socialMediaHandles: [
      { platform: 'facebook', handle: data.socialMediaHandles.facebook },
      { platform: 'instagram', handle: data.socialMediaHandles.instagram },
      { platform: 'twitter', handle: data.socialMediaHandles.twitter },
    ].filter(Boolean) // Remove empty entries
  };
    console.log(transformedData);
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/booth/secure-booth",
        transformedData,
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
      <div className="md:container mt-4 md:mt-10 px-4 mb-0 md:mb-12">
        <div className="bg-neutralBlue font-aeonik flex flex-col text-prussianBlue items-center justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-medium text-center">
            Secure your booth <br /> at BTWAWI Conference
          </h1>
          <p className="w-full max-w-[540px] text-lg md:text-2xl text-center mt-6">
            Enjoy exclusive benefits, early access to event information, and a
            streamlined check-in experience.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-8 w-full ">
          <div className="text-prussianBlue font-aeonik py-10 text-lg md:text-3xl w-full md:w-1/2 px-4 md:px-4 leading-11  flex flex-col gap-4 md:gap-8">
            <p className="text-left">
              Be among the first to claim your place on the show floor!
              Pre-register now to unlock exclusive perks, priority booth
              selection, and early access to networking opportunities.
            </p>
            <p className="text-left">
              Don't miss your chance to stand out, connect with key
              decision-makers, and elevate your brand at this year's most
              anticipated industry event. Your journey to success starts
              here—secure your spot today!
            </p>
          </div>
          <div className="flex justify-center w-full md:w-1/2 ">
            <img src={booth} alt="booth registration" />
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
                  {/* Email */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="email"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Email (required)
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  {/* Vendor/Company Name */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="vendorCompanyName"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Vendor/Company Name (required)
                    </label>
                    <input
                      id="vendorCompanyName"
                      type="text"
                      {...register("vendorCompanyName", {
                        required: "Company name is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.vendorCompanyName && (
                      <p className="text-red-500 text-sm">
                        {errors.vendorCompanyName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Contact Person's Name */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="contactPersonName"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Contact Person's Name (required)
                    </label>
                    <input
                      id="contactPersonName"
                      type="text"
                      {...register("contactPersonName", {
                        required: "Contact person name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.contactPersonName && (
                      <p className="text-red-500 text-sm">
                        {errors.contactPersonName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="phoneNumber"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Phone Number (required)
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Website */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="website"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Website (optional)
                    </label>
                    <input
                      id="website"
                      type="url"
                      {...register("website")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.website && (
                      <p className="text-red-500 text-sm">
                        {errors.website.message}
                      </p>
                    )}
                  </div>

                  {/* Social Media Handles */}
                  {/* Social Media Handles */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label className="text-base md:text-xl text-left text-primaryGray">
                      Social Media Handles (at least one required)
                    </label>

                    <div className="flex gap-2 flex-row">
                      {/* Facebook */}
                      <div className="flex items-center border border-lightBlue rounded-lg w-full">
                        <span className="px-2 text-lightGray100">
                          <RiFacebookFill size={20} />
                        </span>
                        <input
                          id="facebook"
                          type="text"
                          {...register("socialMediaHandles.facebook")}
                          className="p-3 placeholder-lightGray100 w-full rounded-r-lg outline-none"
                          placeholder="Facebook handle/URL"
                        />
                      </div>

                      {/* Instagram */}
                      <div className="flex items-center border border-lightBlue rounded-lg w-full">
                        <span className="px-2 text-lightGray100">
                          <RiInstagramFill size={20} />
                        </span>
                        <input
                          id="instagram"
                          type="text"
                          {...register("socialMediaHandles.instagram")}
                          className="p-3 placeholder-lightGray100 w-full rounded-r-lg outline-none"
                          placeholder="Instagram handle/URL"
                        />
                      </div>

                      {/* Twitter/X */}
                      <div className="flex items-center border border-lightBlue rounded-lg w-full">
                        <span className="px-2 text-lightGray100">
                          <RiTwitterXFill size={20} />
                        </span>
                        <input
                          id="twitter"
                          type="text"
                          {...register("socialMediaHandles.twitter")}
                          className="p-3 placeholder-lightGray100 w-full rounded-r-lg outline-none"
                          placeholder="Twitter handle/URL"
                        />
                      </div>
                    </div>

                    {/* Error message */}
                    {errors.socialMediaHandles && (
                      <p className="text-red-500 text-sm">
                        {errors.socialMediaHandles.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Past Edition Attendance */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="pastEditionAttendance"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      What did you attend as, at our past editions? (required)
                    </label>
                    <select
                      id="pastEditionAttendance"
                      {...register("pastEditionAttendance", {
                        required: "Please select an option",
                      })}
                      className="border text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="" className="text-lightGray100">
                        Select
                      </option>
                      <option value="Vendor">Vendor</option>
                      <option value="Attendee">Attendee</option>
                      <option value="Speaker">Speaker</option>
                    </select>
                    {errors.pastEditionAttendance && (
                      <p className="text-red-500 text-sm">
                        {errors.pastEditionAttendance.message}
                      </p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="experience"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      If applicable, what was your experience? (optional)
                    </label>
                    <input
                      id="experience"
                      type="text"
                      {...register("experience")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Business Category */}
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="businessCategory"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business category (required)
                    </label>
                    <select
                      id="businessCategory"
                      {...register("businessCategory", {
                        required: "Business category is required",
                      })}
                      className="border text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="" className="text-lightGray100">
                        Select
                      </option>
                      <option value="Cooked Meal">Cooked Meal</option>
                      <option value="Beverages and Drinks">
                        Beverages and Drinks
                      </option>
                      <option value="Islamic Items">Islamic Items</option>
                      <option value="Modest Wears">Modest Wears</option>
                      <option value="Educational Materials">
                        Educational Materials
                      </option>
                      <option value="Jewelries and Accessories">
                        Jewelries and Accessories
                      </option>
                      <option value="Spices/Raw food">Spices/Raw food</option>
                      <option value="Printing Services">
                        Printing Services
                      </option>
                      <option value="Consultation Firm">
                        Consultation Firm
                      </option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.businessCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.businessCategory.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Business Description */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2 relative">
                    <label
                      htmlFor="businessDescription"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Briefly describe your business and the products/services
                      you offer (required)
                    </label>
                    <textarea
                      id="businessDescription"
                      {...register("businessDescription", {
                        required: "Business description is required",
                      })}
                      onChange={(e) => {
                        setValue("businessDescription", e.target.value);
                        setDescCount(countWords(e.target.value));
                      }}
                      placeholder="Enter here"
                      className="border h-32 text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {descCount} words
                    </span>
                    {errors.businessDescription && (
                      <p className="text-red-500 text-sm">
                        {errors.businessDescription.message}
                      </p>
                    )}
                  </div>

                  {/* Exhibition Requirements */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2 relative">
                    <label
                      htmlFor="exhibitionRequirements"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      The committee will be providing a table, 2 chairs and flag
                      and 1x leg. Would you require any other thing? (required)
                    </label>
                    <textarea
                      id="exhibitionRequirements"
                      {...register("exhibitionRequirements", {
                        required: "Exhibition requirements are required",
                      })}
                      onChange={(e) => {
                        setValue("exhibitionRequirements", e.target.value);
                        setRequirementsCount(countWords(e.target.value));
                      }}
                      placeholder="Enter here"
                      className="border h-32 text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {requirementsCount} words
                    </span>
                    {errors.exhibitionRequirements && (
                      <p className="text-red-500 text-sm">
                        {errors.exhibitionRequirements.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Exhibition Budget */}
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="willingToPay"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Are you willing to pay ₦90,000 to exhibit? (required)
                    </label>
                    <select
                      id="willingToPay"
                      {...register("willingToPay", {
                        required: "Exhibition budget is required",
                      })}
                      className="border text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="" className="text-lightGray100">
                        Yes/No
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.willingToPay && (
                      <p className="text-red-500 text-sm">
                        {errors.willingToPay.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToGuidelines"
                    value="agree"
                    {...register("agreeToGuidelines", {
                      required: "You must agree to the guidelines",
                    })}
                    className="mt-1 w-4 h-4 text-lightYellowBase border-lightBlue rounded focus:ring-lightYellowBase"
                  />
                  <label
                    htmlFor="agreeToGuidelines"
                    className="text-base md:text-lg text-primaryGray"
                  >
                    By submitting this registration survey, I confirm that if I
                    am chosen as one of the vendors, I agree to abide by the
                    event guidelines and ensure that my products/services comply
                    with Halal principles. (required)
                  </label>
                </div>
                {errors.agreeToGuidelines && (
                  <p className="text-red-500 text-sm">
                    {errors.agreeToGuidelines.message}
                  </p>
                )}
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

export default BoothRegistrationPage;
