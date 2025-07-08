import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import { FormInput, FormTextarea } from "../../base-components/Form";
import {
  useCreateCollaborationsMutation,
  useGetCollaborationsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { CollaborationApiResponse } from "../../utils/dataTypes";

function CreateCollaboration() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [createCollaboration, { isLoading }] =
    useCreateCollaborationsMutation();

  const { refetch } = useGetCollaborationsQuery(currentPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createCollaboration({
        title,
        content,
      }).unwrap();

      if (response) {
        toast.success("Collaboration created successfully!");
        refetch();
        navigate("/collaborations");
      }
    } catch (error) {
      toast.error("Failed to create collaboration");
      console.error("Failed to create collaboration:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create Collaboration</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Title*</label>
              <FormInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Collaboration title"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content*</label>
              <FormTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Detailed collaboration content"
                rows={8}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/collaborations")}
                className="w-24"
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="w-24"
                disabled={isLoading || !title || !content}
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

export default CreateCollaboration;
