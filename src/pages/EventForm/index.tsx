import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import {
  useCreateEventsMutation,
  useGetEventsQuery,
  useGetEventTypesQuery,
} from "../../stores/api/apiSlice";
import FileDropzone from "../../components/Dragzone";
import { Editor } from "@tinymce/tinymce-react";
import { EventApiResponse, EventTypesResponse } from "../../utils/dataTypes";
import { config } from "../../config";

const { EditorKey } = config;

function EventForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [createEvent, { isLoading }] = useCreateEventsMutation();
  const { refetch } = useGetEventsQuery(currentPage);
  const { data: eventTypesData } = useGetEventTypesQuery(currentPage);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    topic: "",
    description: "",
    event_type: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("topic", formData.topic);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("event_type_id", formData.event_type);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await createEvent(formDataToSend).unwrap();

      if (response) {
        toast.success("Event created successfully!");
        refetch();
        navigate("/event");
      }
    } catch (error) {
      toast.error("Failed to create event");
      console.error("Create error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Add New Event</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          {/* Event Title */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Event Title
            </label>
            <FormInput
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Event Date */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Event Date
            </label>
            <FormInput
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Location
            </label>
            <FormInput
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>

          {/* Topic */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Topic
            </label>
            <FormInput
              name="topic"
              type="text"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Enter event topic"
              required
            />
          </div>

          {/* Event Type */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Event Type
            </label>
            <select
              name="event_type"
              value={formData.event_type}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select an event type</option>
              {eventTypesData?.data.map((type) => (
                <option key={type.uuid} value={type.uuid}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <Editor
              apiKey={EditorKey}
              value={formData.description}
              onEditorChange={handleEditorChange}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | image",
              }}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Event Image
            </label>
            <FileDropzone
              onFileAccepted={(file: File) => {
                setFormData((prev) => ({
                  ...prev,
                  image: file,
                }));
              }}
              accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
              maxSize={5 * 1024 * 1024} // 5MB
            />
            <p className="mt-1 text-xs text-gray-500">
              JPEG, PNG, or JPG (Max 5MB)
            </p>
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

export default EventForm;
