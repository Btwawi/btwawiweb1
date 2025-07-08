import { useState } from "react";
import {
  useCreatePublicationCategoriesMutation,
  useGetPublicationCategoriesQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { FormInput, FormTextarea } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PublicationCategoryApiResponse } from "../../utils/dataTypes";

function CreatePublicationCategory() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const [createCategory, { isLoading }] =
    useCreatePublicationCategoriesMutation();
  const { refetch } = useGetPublicationCategoriesQuery(currentPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const type = "type";
    try {
      const response = await createCategory({
        name,
        type: type,
        description: description || null,
      }).unwrap();

      if (response) {
        toast.success("Publication category created successfully!");
        refetch();
        navigate("/publication-category");
      }
    } catch (error) {
      toast.error("Failed to create publication category");
      console.error("Failed to create publication category:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create Publication Category</h2>
        <Button
          onClick={() => navigate("/publication-category")}
          variant="outline-secondary"
        >
          Back to List
        </Button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <FormInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Journal, Conference Paper"
                required
              />
            </div>
            {/* <div>
              <label className="block mb-2 font-medium">Type</label>
              <FormInput
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g., academic, general"
                required
              />
            </div> */}
          </div>
          <div className="mt-6">
            <label className="block mb-2 font-medium">Description</label>
            <FormTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the publication category"
              rows={4}
            />
          </div>
          <div className="flex justify-end mt-8 space-x-4">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={() => navigate("/publication-category")}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-24"
              disabled={isLoading || !name}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
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

export default CreatePublicationCategory;
