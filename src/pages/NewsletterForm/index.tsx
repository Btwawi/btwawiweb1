// CreateNewsletterSubscriber.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import {
  useCreateNewsLetterMutation,
  useGetNewsLetterQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { NewsletterApiResponse } from "../Newsletter";

function CreateNewsletterSubscriber() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [createSubscriber, { isLoading }] = useCreateNewsLetterMutation();

  const { refetch } = useGetNewsLetterQuery(currentPage);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createSubscriber(formData).unwrap();
      if (response) {
        toast.success("Subscriber added successfully!");
        refetch();
        navigate("/newsletter");
      }
    } catch (error) {
      toast.error("Failed to add subscriber");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">
          Add Newsletter Subscriber
        </h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="font-medium">
              Full Name
            </label>
            <FormInput
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mb-4"
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <label htmlFor="" className="font-medium">
              Email
            </label>
            <FormInput
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mb-4"
              placeholder="Email Address"
              required
            />
          </div>
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

export default CreateNewsletterSubscriber;
