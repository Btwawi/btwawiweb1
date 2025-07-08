import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import {
  useCreateStaffsMutation,
  useGetStaffsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { StaffApiResponse, StaffFormType } from "../../utils/dataTypes";
import FileDropzone from "../../components/Dragzone";

function CreateStaff() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [createStaff, { isLoading }] = useCreateStaffsMutation();

  const { refetch } = useGetStaffsQuery(currentPage);

  const [formData, setFormData] = useState<StaffFormType>({
    name: "",
    position: "",
    field: "",
    image: null,
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

  const handleImageAccepted = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("field", formData.field);
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const response = await createStaff(formDataToSend).unwrap();

      if (response) {
        toast.success("Staff member created successfully!");
        refetch();
        navigate("/staff");
      }
    } catch (error) {
      toast.error("Failed to create staff member");
      console.error("Create error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">
          Create New Staff Member
        </h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <FormInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="position"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Position
              </label>
              <FormInput
                id="position"
                name="position"
                type="text"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter position"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="field"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Field of Expertise
              </label>
              <FormInput
                id="field"
                name="field"
                type="text"
                value={formData.field}
                onChange={handleChange}
                placeholder="Enter field of expertise"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Image <span className="text-red-500">*</span>
            </label>
            <FileDropzone
              onFileAccepted={handleImageAccepted}
              accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
              maxSize={5 * 1024 * 1024} // 5MB
            />
            <p className="text-xs text-slate-500 mt-1">
              Supported formats: JPEG, JPG, PNG, WEBP (Max 5MB)
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/staff")}
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
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStaff;
