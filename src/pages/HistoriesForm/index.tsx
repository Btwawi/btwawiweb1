import { useRef, useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateHistoryMutation,
  useGetHistoriesQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { ApiError } from "../../services/service";
import { HistoryApiResponse } from "../Histories";
import FileDropzone from "../../components/Dragzone";

function CreateHistory() {
  const [errors, setErrors] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [createHistory, { isLoading }] = useCreateHistoryMutation();
  const navigate = useNavigate();
  const { refetch } = useGetHistoriesQuery(currentPage);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: null as File | null,
  });

  const handleFileAccepted = (file: File) => {
    processImageFile(file);
  };

  const processImageFile = (file: File) => {
    if (!file.type.match("image.*")) {
      setErrors("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setFormData((prev) => ({ ...prev, image: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await createHistory(data).unwrap();

      if (response) {
        toast.success("History item created successfully!");
        refetch();
        navigate("/histories");
      }
    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred";

      if (typeof err === "object" && err !== null) {
        const apiError = err as ApiError;
        errorMessage =
          apiError?.data?.message || apiError?.message || errorMessage;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">
          Create New History Item
        </h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tile">Title</label>
            <FormInput
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="mb-4"
              placeholder="Title"
              required
            />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <FormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mb-4"
              placeholder="Description"
              rows={6}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <FormInput
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="mb-4"
              placeholder="Date"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Image</label>
            <div className="flex-1">
              <FileDropzone
                onFileAccepted={handleFileAccepted}
                accept={{
                  "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/histories")}
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
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></span>
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateHistory;
