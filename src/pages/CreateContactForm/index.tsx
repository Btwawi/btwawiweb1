// CreateContactForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateContactFormsMutation,
  useGetContactFormsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { ContactFormApiResponse } from "../ContactForm";

function CreateContactForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [createContactForm, { isLoading }] = useCreateContactFormsMutation();
  const { refetch } = useGetContactFormsQuery(currentPage);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    communication_preference: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createContactForm(formData).unwrap();

      if (response) {
        toast.success("Contact form submitted successfully!");
        refetch();
        navigate("/contact-form");
      }
    } catch (error) {
      toast.error("Failed to submit contact form");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">New Contact Form</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <FormInput
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mb-4"
            placeholder="Full Name"
            required
          />

          <FormInput
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-4"
            placeholder="Email Address"
            required
          />

          <FormInput
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mb-4"
            placeholder="Phone Number (optional)"
          />

          <FormInput
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="mb-4"
            placeholder="Subject"
            required
          />
          <FormInput
            name="communication_preference"
            type="text"
            value={formData.communication_preference}
            onChange={handleChange}
            className="mb-4"
            placeholder="Communication Preference"
            required
          />

          <FormTextarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mb-4"
            placeholder="Your Message"
            rows={6}
            required
          />

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => navigate(-1)}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="w-24"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContactForm;
