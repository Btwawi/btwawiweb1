import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateEventTypesMutation,
  useGetEventTypesQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { EventTypeApiResponse } from "../EventType";

function EventTypeForm() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [createEventType, { isLoading }] = useCreateEventTypesMutation();
  const { refetch } = useGetEventTypesQuery(currentPage);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      const response = await createEventType(formData).unwrap();

      if (response) {
        toast.success("Event type created successfully!");
        refetch();
        navigate("/event-type");
      }
    } catch (error) {
      toast.error("Failed to create event type");
      console.error("Create error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Add New Event Type</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          {/* Event Type Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Event Type Name
            </label>
            <FormInput
              id="name"
              type="text"
              name="name"
              placeholder="Enter event type name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <FormTextarea
              id="description"
              name="description"
              placeholder="Enter description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Form Actions */}
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

export default EventTypeForm;
