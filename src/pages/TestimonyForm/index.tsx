import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateTestimoniesMutation,
  useGetTestimoniesQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import Lucide from "../../base-components/Lucide";
import { TestimonyApiResponse } from "../Testimony";
import FileDropzone from "../../components/Dragzone";

function TestimonyForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [createTestimony, { isLoading }] = useCreateTestimoniesMutation();
  const { refetch } = useGetTestimoniesQuery(currentPage);

  const [formData, setFormData] = useState({
    name: "",
    testimony: "",
    image: null as File | null,
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("testimony", formData.testimony);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await createTestimony(formDataToSend).unwrap();

      if (response) {
        toast.success("Testimony added successfully!");
        refetch();
        navigate("/testimony");
      }
    } catch (error) {
      toast.error("Failed to add testimony");
      console.error("Add testimony error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Add New Testimony</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Name</label>

            <FormInput
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Testimony Content
            </label>

            <FormTextarea
              id="testimony"
              name="testimony"
              placeholder="Testimony Content"
              rows={6}
              value={formData.testimony}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Image</label>
            <FileDropzone
              onFileAccepted={(file: File) => {
                setFormData((prev) => ({
                  ...prev,
                  image: file,
                }));
              }}
              accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
              maxSize={2 * 1024 * 1024} // 2MB
            />
            <p className="mt-1 text-xs text-slate-500">
              JPEG, PNG, or JPG (Max 2MB)
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
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Lucide
                    icon="Loader2"
                    className="w-4 h-4 mr-2 animate-spin"
                  />
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestimonyForm;
