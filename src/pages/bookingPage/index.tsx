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
import { nigerianStates, socialMediaPlatforms } from "../../data/bookingData";

interface BookingFormData extends FieldValues {
  email: string;
  fullName: string;
  stateOfResidence: string;
  phoneNumber: string;
  organisationCompanyName: string;
  designationJobTitle: string;
  previousAttendance: string;
  previousExperience?: string;
  attendanceAs: string;
  hearAboutEvent: string;
  referredBy?: string;
  financialSupport: string;
  edition2025: string;
  expectations?: string;
  questionsToAddress?: string;
  agreesToCommunications: string;
}

const BookingPage = () => {
  const {
    reset,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<BookingFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = (isOpen: any) => {
    setIsMobileMenuOpen(isOpen);
  };
  // Watch form values for conditional rendering
  const watchPreviousAttendance = watch("previousAttendance");
  const watchHearAboutEvent = watch("hearAboutEvent");

  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://btwawi.onrender.com/api/v1/register/book-seat",
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
      <Header
        onMenuToggle={handleMobileMenuToggle}
        chatLinkClassName="border border-prussianBlue/50"
      />
      <div className="md:container mt-4 md:mt-10 px-4 mb-6 md:mb-12">
        <div className="bg-neutralBlue font-aeonik flex flex-col text-prussianBlue items-center justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-medium text-center">
            Book your seat at <br />
            BTWAWI Conference
          </h1>
          <p className="w-full max-w-[750px] text-lg md:text-2xl text-center mt-2 md:mt-6">
            Join us for an enlightening and empowering experience where we will
            delve into the world of Halal business - an approach that aligns
            your entrepreneurial journey with the timeless principles of Islam.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-8 w-full ">
          <p className="text-center text-prussianBlue mx-auto text-lg md:text-2xl md:w-[750px] w-[350] leading-10 font-aeonik py-4 md:py-10 px-4">
            This event is designed to equip you with the tools, knowledge, and
            inspiration to achieve success while staying true to your faith.
          </p>
        </div>
        <div className="font-aeonik mt-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-prussianBlue text-center">
            Fill the form below
          </h3>

          <form
            className="flex flex-col gap-3 md:gap-8 mt-4 md:mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-4 md:px-14 py-8 flex flex-col gap-4 md:gap-8">
              <div className="flex flex-col gap-4 md:gap-8">
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
                  {/* Full Name */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="fullName"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Full Name (required)
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName", {
                        required: "Full Name is required",
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
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* State of Residence */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="stateOfResidence"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      State of Residence (required)
                    </label>
                    <select
                      id="stateOfResidence"
                      {...register("stateOfResidence", {
                        required: "State of residence is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="" className="opacity-50">
                        Enter Here
                      </option>
                      {nigerianStates.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.stateOfResidence && (
                      <p className="text-red-500 text-sm">
                        {errors.stateOfResidence.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="phoneNumber"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Phone Number (WhatsApp & required)
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
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
                  {/* Organisation */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="organisationCompanyName"
                      className="text-xl text-left text-primaryGray"
                    >
                      Organisation/Company name (required)
                    </label>
                    <input
                      id="organisationCompanyName"
                      {...register("organisationCompanyName", {
                        required: "Company's Name is required",
                      })}
                      className="border text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />

                    {errors.organisationCompanyName && (
                      <p className="text-red-500 text-sm">
                        {errors.organisationCompanyName.message}
                      </p>
                    )}
                  </div>

                  {/* Designation/Job Title */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="designationJobTitle"
                      className="text-xl text-left text-primaryGray"
                    >
                      Designation/Job Title
                    </label>
                    <input
                      id="designationJobTitle"
                      type="text"
                      {...register("designationJobTitle", {
                        required: "Job title is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.designationJobTitle && (
                      <p className="text-red-500 text-sm">
                        {errors.designationJobTitle.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Previous Attendance */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="previousAttendance"
                      className="text-base md:text-xl text-left text-primary-gray"
                    >
                      Were you in attendance at any of our past editions?
                      (required)
                    </label>
                    <select
                      id="previousAttendance"
                      {...register("previousAttendance", {
                        required: "This field is required",
                      })}
                      className="border border-light-blue p-3 placeholder-light-gray-100 w-full rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.previousAttendance && (
                      <p className="text-red-500 text-sm">
                        {errors.previousAttendance.message}
                      </p>
                    )}
                  </div>

                  {/* Previous Experience */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="previousExperience"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      If Yes, what was your experience? (optional)
                    </label>
                    <input
                      id="previousExperience"
                      type="text"
                      {...register("previousExperience")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Attendance As */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="attendanceAs"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Are you attending as an/a: (Please select one) (required)
                    </label>
                    <select
                      id="attendanceAs"
                      {...register("attendanceAs", {
                        required: "Please select your attendance type",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="Vendor">Vendor</option>
                      <option value="Attendee">Attendee</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.attendanceAs && (
                      <p className="text-red-500 text-sm">
                        {errors.attendanceAs.message}
                      </p>
                    )}
                  </div>

                  {/* How did you hear about the event */}
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="hearAboutEvent"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      How did you hear about the event? (required)
                    </label>
                    <select
                      id="hearAboutEvent"
                      {...register("hearAboutEvent", {
                        required: "This field is required",
                      })}
                      className="border border-light-blue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Website">Website</option>
                      <option value="Email">Email</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.hearAboutEvent && (
                      <p className="text-red-500 text-sm">
                        {errors.hearAboutEvent.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Referred By - Conditional */}
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="referredBy"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      If you selected Word of Mouth/referral, who referred you?
                    </label>
                    <input
                      id="referredBy"
                      type="text"
                      {...register("referredBy")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                  </div>
                  {/*  */}
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="financialSupport"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      The seminar is free, would you like to support the event
                      financially?
                    </label>
                    <input
                      id="financialSupport"
                      type="text"
                      {...register("financialSupport")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Edition */}
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="edition2025"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Which 2025 edition would you be attending?
                    </label>
                    <select
                      id="edition2025"
                      {...register("edition2025", {
                        required: "This field is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="Abuja 2.0">Abuja 2.0</option>
                      <option value="Lagos 4.0">Lagos 4.0</option>
                    </select>
                    {errors.edition2025 && (
                      <p className="text-red-500 text-sm">
                        {errors.edition2025.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="expectations"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      What are your main expectations from attending this event?
                    </label>
                    <textarea
                      id="expectations"
                      {...register("expectations")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg h-24 resize-vertical"
                      placeholder="Enter here"
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="questionsToAddress"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Please share questions you would like to be addressed
                      during the event
                    </label>
                    <textarea
                      id="questionsToAddress"
                      {...register("questionsToAddress")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg h-24 resize-vertical"
                      placeholder="Enter here"
                    />
                  </div>
                </div>

                {/* Checkbox for communications agreement */}
                <div className="flex items-start gap-3">
                  <input
                    id="agreesToCommunications"
                    type="checkbox"
                    value="agree"
                    {...register("agreesToCommunications", {
                      required: "You must agree to receive communications",
                    })}
                    className="mt-1 w-5 h-5 text-lightYellowBase border-light-blue rounded focus:ring-lightYellowBase"
                  />
                  <label
                    htmlFor="agreesToCommunications"
                    className="text-sm md:text-base text-primary-gray leading-relaxed"
                  >
                    By submitting this registration form, I agree to receive
                    event-related communications via email and/or phone number
                    provided above. I also agree that sponsors can reach me to
                    pitch their businesses.
                  </label>
                </div>
                {errors.agreesToCommunications && (
                  <p className="text-red-500 text-sm -mt-6">
                    {errors.agreesToCommunications.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  title="submit"
                  disabled={isSubmitting}
                  className="text-lg md:w-[320px] w-full font-extrabold font-aeonik flex items-center justify-center gap-2 py-4  md:py-6 px-10 rounded-full bg-lightYellowBase hover:bg-white hover:border cursor-pointer hover:border-lightYellowBase hover:text-lightYellowBase transition disabled:opacity-50"
                >
                  {isSubmitting && (
                    <div className="w-5 h-5 border-prussianBlue border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitting
                    ? "Submitting application"
                    : "Complete registration"}
                  {/* @ts-ignore */}

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

export default BookingPage;
