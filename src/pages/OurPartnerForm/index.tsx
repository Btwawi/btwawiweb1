import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import {
  useCreatePartnersMutation,
  useGetPartnersQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { PartnerApiResponse } from "../OurPartner";
import FileDropzone from "../../components/Dragzone";

function CreatePartner() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [createPartner, { isLoading }] = useCreatePartnersMutation();

  const { refetch } = useGetPartnersQuery(currentPage);

  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await createPartner(formDataToSend).unwrap();

      if (response) {
        toast.success("Partner created successfully!");
        refetch();
        navigate("/our-partner");
      }
    } catch (error) {
      toast.error("Failed to create partner");
      console.error("Creation error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create New Partner</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block mb-2 text-sm font-medium">
              Partner Name
            </label>
            <FormInput
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Partner Name"
              required
            />

            <div>
              <label className="block mb-2 text-sm font-medium">Logo</label>
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
              <p className="mt-1 text-xs text-gray-500">
                JPEG, PNG, or JPG (Max 2MB)
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-3">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/our-partner")}
              type="button"
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2"></span>
                  Creating...
                </span>
              ) : (
                "Create Partner"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePartner;
