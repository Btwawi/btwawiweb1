// src/pages/partnership/CreatePartnership.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../base-components/Button";
import { FormInput, FormTextarea } from "../../base-components/Form";
import {
  useCreatePartnershipsMutation,
  useGetPartnershipsQuery,
} from "../../stores/api/apiSlice";
import FileDropzone from "../../components/Dragzone";
import { PartnershipApiResponse } from "../../utils/dataTypes";

function CreatePartnership() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [createPartnership, { isLoading }] = useCreatePartnershipsMutation();

  const { refetch } = useGetPartnershipsQuery(currentPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("images", image);
    }

    try {
      const response = await createPartnership(formData).unwrap();

      if (response) {
        toast.success("Partnership created successfully!");
        refetch();
        navigate("/partnership");
      }
    } catch (error) {
      toast.error("Failed to create partnership");
      console.error("Failed to create partnership:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create Partnership</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Name*</label>
              <FormInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Partnership name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Description*</label>
              <FormTextarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed partnership description"
                rows={8}
                required
              />
            </div>

            <div>
              <FileDropzone onFileAccepted={(file: File) => setImage(file)} />
              {image && (
                <p className="mt-2 text-sm text-slate-500">
                  Selected: <span className="font-medium">{image.name}</span>
                </p>
              )}
              <label className="block mb-2 font-medium">Image*</label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/partnership")}
                className="w-24"
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="w-24"
                disabled={isLoading || !name || !description || !image}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePartnership;
