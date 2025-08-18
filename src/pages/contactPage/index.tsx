import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import contactImage from "../../assets/images/contact-us-image.png";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface ContactData extends FieldValues {
  name: string;
  email: string;
  message: string;
}

const ContactUsPage = () => {
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ContactData>();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleChatClick = () => {
    window.open("https://wa.me/2348121314177", "_blank");
  };
  const handleMobileMenuToggle = (isOpen: any) => {
    setIsMobileMenuOpen(isOpen);
  };

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<ContactData> = async (data) => {
    try {
      const response = await axios.post(
        "https://btwawi.onrender.com/api/v1/contact/send-message",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        enqueueSnackbar("Message sent successfully", { variant: "success" });
        reset();
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
      <Header onMenuToggle={handleMobileMenuToggle} />
      <div className="md:container mt-4 md:mt-10 px-4 mb-24">
        <div className="bg-neutralBlue font-aeonik flex flex-col text-prussianBlue items-center justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-medium text-center">
            Connect with the Halal <br /> Business Community
          </h1>
          <p className="w-full max-w-[540px] text-lg md:text-2xl text-center mt-6">
            Have questions or want to connect? Reach out to our team for
            inquiries, support, or collaboration opportunities. We’re here to
            help!
          </p>
        </div>
        <div className="flex flex-col md:flex-row mt-8 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-prussianBlue font-aeonik py-10  md:text-2xl w-full md:w-1/2 px-4 md:px-12  flex flex-col gap-4 md:gap-12"
          >
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="name"
                className="text-lg md:text-xl text-left text-primaryGray"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                placeholder="Enter here"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="email"
                className="text-lg md:text-xl text-left text-primaryGray"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className="border border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
                placeholder="Enter here"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="message"
                className="text-lg md:text-xl text-left text-primaryGray"
              >
                Message
              </label>
              <textarea
                id="message"
                {...register("message", {
                  required: "Your message is required",
                  minLength: {
                    value: 10,
                    message:
                      "Your message should not be less than 10 characters",
                  },
                })}
                placeholder="Enter here"
                className="border h-44 text-primaryGray border-lightBlue p-3 placeholder-lightGray100 w-full rounded-lg"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <div className="flex gap-5 items-center justify-center flex-col md:flex-row">
              <button
                type="submit"
                title="Send message"
                disabled={isSubmitting}
                className="text-lg font-extrabold font-aeonik md:w-[300px] w-full flex items-center justify-center gap-2 py-4 md:py-8 px-10 rounded-full bg-lightYellowBase hover:bg-white hover:border cursor-pointer hover:border-lightYellowBase hover:text-lightYellowBase transition disabled:opacity-50"
              >
                {isSubmitting && (
                  <div className="w-5 h-5 border-prussianBlue border-t-transparent rounded-full animate-spin"></div>
                )}
                {isSubmitting ? "Sending message" : "Send message"}
                <p>&rarr;</p>
              </button>

              <button
                onClick={handleChatClick}
                className="flex items-center space-x-2 sm:space-x-3 hover:bg-[#002D62] hover:text-white text-[#002D62] px-4 sm:px-6 py-2 sm:py-3 border border-[#002D62] rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <img
                  src="/assets/whatsapp.svg"
                  alt=""
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="font-bold">Chat with us</span>
                <span className="text-lg sm:text-xl">&rarr;</span>
              </button>
            </div>
          </form>
          <div className="px-4 flex justify-center md:px-12 py-12 w-full md:w-1/2 ">
            <img
              src={contactImage}
              alt="contact image"
              className="md:w-[485px]"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUsPage;
