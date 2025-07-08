// CreateNewsCategory.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateNewsCategoryMutation,
  useGetNewsCategoryQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { NewsCategoryApiResponse } from "../NewsCategories";

function CreateNewsCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateNewsCategoryMutation();
  const { refetch } = useGetNewsCategoryQuery(currentPage);
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
      const response = await createCategory(formData).unwrap();

      if (response) {
        toast.success("Category created successfully!");
        refetch();
        navigate("/news-categories");
      }
    } catch (error) {
      toast.error("Failed to create category");
      console.error("Creation error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create New Category</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Category Name
              </label>
              <FormInput
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter News Category"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <FormTextarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Category Description"
                rows={5}
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-3">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/news-categories")}
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
                "Create Category"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewsCategory;
