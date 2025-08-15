import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import recognitionBadge from "../../assets/images/merit.png";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./component/SuccessModal";
import { useSnackbar } from "notistack";

interface NominationFormData extends FieldValues {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  nameOfNominatedBusiness: string;
  businessOwnerName?: string; // Optional field
  businessOwnerContact: string;
  businessCategory: string;
  reasonForNomination: string;
  whatMakesBusinessHalal: string;
}

const RecognizeABusinessPage = () => {
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<NominationFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const onSubmit: SubmitHandler<NominationFormData> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/nominate/nominate-business",
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
      <div className="md:container mt-4 md:mt-10 px-4 mb-6 md:mb-12">
        <div className="bg-neutralBlue font-aeonik flex flex-col text-prussianBlue items-center justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-medium text-center">
            Recognize a Business <br /> That Inspires You
          </h1>
          <p className="w-full max-w-[540px] text-lg md:text-2xl text-center mt-6">
            Know a brand or entrepreneur doing business the way Allaah wants it
            with honesty, integrity, and excellence?
          </p>
        </div>
        <div className="flex flex-col md:flex-row mt-3 md:mt-8 w-full ">
          <div className="text-prussianBlue font-aeonik py-10 text-lg md:text-3xl w-full md:w-1/2 px-4 md:px-12 leading-11 flex flex-col gap-4 md:gap-8">
            <p className="text-left">
              Nominate them for recognition at our next BTWAWI conference. Let’s
              celebrate businesses that are Halal-aligned, customer-focused, and
              truly impactful in their communities.
            </p>
            <p className="text-left">
              Whether it is a small start-up or an established business, your
              nomination can help them get the spotlight they deserve.
            </p>
          </div>
          <div className="px-4 flex justify-center md:px-12 w-full md:w-1/2 ">
            <img src={recognitionBadge} alt="recognition badge" className="" />
          </div>
        </div>
        <div className="font-aeonik ">
          <h3 className="text-2xl md:text-3xl font-semibold text-prussianBlue text-center">
            Fill the form below
          </h3>

          <form
            className="flex flex-col gap-8 mt-4 md:mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-4 md:px-14 py-8 flex flex-col gap-8">
              <div className="flex flex-col gap-4 md:gap-8">
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="phoneNumber"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Phone Number
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

                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="nameOfNominatedBusiness"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Name of the Business You're Nominating
                    </label>
                    <input
                      id="nameOfNominatedBusiness"
                      type="text"
                      {...register("nameOfNominatedBusiness", {
                        required: "Business name is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.nameOfNominatedBusiness && (
                      <p className="text-red-500 text-sm">
                        {errors.nameOfNominatedBusiness.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="businessOwnerName"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business Owner's Name
                      <span className="text-base"> (If known)</span>
                    </label>
                    <input
                      id="businessOwnerName"
                      type="text"
                      {...register("businessOwnerName")}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.businessOwnerName && (
                      <p className="text-red-500 text-sm">
                        {errors.businessOwnerName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="businessOwnerContact"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Business Phone / Email{" "}
                      <span className="text-base"> (If known)</span>
                    </label>
                    <input
                      id="businessOwnerContact"
                      type="text"
                      {...register("businessOwnerContact", {
                        required: "Business contact is required",
                      })}
                      className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                      placeholder="Enter here"
                    />
                    {errors.businessOwnerContact && (
                      <p className="text-red-500 text-sm">
                        {errors.businessOwnerContact.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
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
                      <option value="Other">Other</option>
                    </select>
                    {errors.businessCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.businessCategory.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="reasonForNomination"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      Why are you nominating the business?
                      <span className="text-base block">
                        {" "}
                        (Short description)
                      </span>
                    </label>
                    <textarea
                      id="reasonForNomination"
                      {...register("reasonForNomination", {
                        required: "Your reason for nomination is required",
                        minLength: {
                          value: 200,
                          message:
                            "Your reason for nomination should not be less than 200 characters",
                        },
                      })}
                      placeholder="Enter here"
                      className="border h-44 text-primary-gray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    {errors.reasonForNomination && (
                      <p className="text-red-500 text-sm">
                        {errors.reasonForNomination.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label
                      htmlFor="whatMakesBusinessHalal"
                      className="text-base md:text-xl text-left text-primaryGray"
                    >
                      What makes the business Halal-aligned and impactful?
                      <span className="text-base block">
                        {" "}
                        (Short description)
                      </span>
                    </label>
                    <textarea
                      id="whatMakesBusinessHalal"
                      {...register("whatMakesBusinessHalal", {
                        required: "This field is required",
                        minLength: {
                          value: 200,
                          message:
                            "This field should not be less than 200 characters",
                        },
                      })}
                      placeholder="Enter here"
                      className="border h-44 text-primary-gray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                    ></textarea>
                    {errors.whatMakesBusinessHalal && (
                      <p className="text-red-500 text-sm">
                        {errors.whatMakesBusinessHalal.message}
                      </p>
                    )}
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
                  {isSubmitting ? "Submitting nomination" : "Submit nomination"}
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

export default RecognizeABusinessPage;
