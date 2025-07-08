// pages/CreateProgramme.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateProgrammesMutation,
  useGetProgrammesQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { ProgrammeApiResponse, ProgrammeFormType } from "../../utils/dataTypes";
import FileDropzone from "../../components/Dragzone";

function CreateProgramme() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [createProgramme, { isLoading }] = useCreateProgrammesMutation();

  const { refetch } = useGetProgrammesQuery(currentPage);

  const [formData, setFormData] = useState<ProgrammeFormType>({
    name: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileAccepted = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);

      const response = await createProgramme(formDataToSend).unwrap();

      if (response) {
        toast.success("Programme created successfully!");
        refetch();
        navigate("/programmes");
      }
    } catch (error) {
      toast.error("Failed to create programme");
      console.error("Create error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create New Programme</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Programme Name
            </label>
            <FormInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Programme Name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium"
            >
              Programme Description
            </label>
            <FormTextarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Programme Description"
              rows={6}
              required
            />
          </div>

          {/* Image Upload Section with Dropzone */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Image</label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 object-cover rounded-md"
                  />
                </div>
              )}
              <FileDropzone
                onFileAccepted={handleFileAccepted}
                accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                maxSize={5 * 1024 * 1024} // 5MB
              />
              <p className="text-xs text-gray-500 text-center">
                Supported formats: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/programmes")}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="w-24"
              disabled={isLoading || !formData.image}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></span>
                  Creating...
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

export default CreateProgramme;
