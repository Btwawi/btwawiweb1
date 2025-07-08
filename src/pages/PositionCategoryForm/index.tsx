import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateCareerVolunteerMutation,
  useGetCareerVolunteerQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { FormInput, FormTextarea } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Loader2, ArrowLeft } from "lucide-react";

export interface PositionCategoryCreateData {
  name: string;
  description: string;
}

export default function PositionCategoryCreatePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<PositionCategoryCreateData>({
    name: "",
    description: "",
  });

  const { refetch } = useGetCareerVolunteerQuery(currentPage);
  const [createCategory, { isLoading }] = useCreateCareerVolunteerMutation();

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

    if (!formData.name.trim()) {
      toast.error("Position category name is required");
      return;
    }

    try {
      const response = await createCategory(formData).unwrap();
      if (response) {
        toast.success("Position category created successfully!");
        refetch();
        navigate("/position-categories");
      }
    } catch (error) {
      toast.error("Failed to create position category");
      console.error("Creation error:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center mb-5">
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/position-categories")}
          className="mr-3"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h2 className="text-xl font-bold">Create New Position Category</h2>
      </div>

      <div className="intro-y box p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Name <span className="text-danger">*</span>
            </label>
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Intern, Manager"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <FormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the position category"
              rows={5}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200/60">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={() => navigate("/position-categories")}
              className="w-24 mr-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-24"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
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
