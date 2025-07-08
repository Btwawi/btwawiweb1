// CreateContactDetail.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormTextarea,
  FormSwitch,
} from "../../base-components/Form";
import {
  useCreateContactDetailsMutation,
  useGetContactDetailsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { ContactDetailApiResponse } from "../ContactDetails";

function CreateContactDetail() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [createContactDetail, { isLoading }] =
    useCreateContactDetailsMutation();

  const { refetch } = useGetContactDetailsQuery(currentPage);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    order_no: 0,
    active: false,
    keyword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      active: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createContactDetail(formData).unwrap();
      if (response) {
        toast.success("Contact detail created successfully!");
        refetch();
        navigate("/contact-details");
      }
    } catch (error) {
      toast.error("Failed to create contact detail");
      console.error("Creation error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create Contact Detail</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-1 font-medium text-sm text-gray-700"
            >
              Title
            </label>
            <FormInput
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="keyword"
              className="block mb-1 font-medium text-sm text-gray-700"
            >
              Keyword
            </label>
            <FormInput
              id="keyword"
              name="keyword"
              type="text"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="Enter keyword"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="order_no"
              className="block mb-1 font-medium text-sm text-gray-700"
            >
              Order Number
            </label>
            <FormInput
              id="order_no"
              name="order_no"
              type="number"
              value={formData.order_no}
              onChange={handleChange}
              placeholder="Enter order number"
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="active"
              className="mr-3 font-medium text-sm text-gray-700"
            >
              Active:
            </label>
            <FormSwitch>
              <FormSwitch.Input
                id="active"
                type="checkbox"
                checked={formData.active}
                onChange={() => handleSwitchChange(!formData.active)}
              />
            </FormSwitch>
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block mb-1 font-medium text-sm text-gray-700"
            >
              Content
            </label>
            <FormTextarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter content"
              rows={8}
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
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContactDetail;
