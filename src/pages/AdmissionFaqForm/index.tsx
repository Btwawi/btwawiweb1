import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import { FormInput, FormTextarea } from "../../base-components/Form";
import {
  useCreateFaqMutation,
  useGetAdmissionFaqsQuery,
  useGetFaqQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { FaqApiResponse } from "../../utils/dataTypes";

function CreateFaq() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const { refetch } = useGetAdmissionFaqsQuery(currentPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createFaq({
        question,
        answer,
      }).unwrap();

      if (response) {
        toast.success("FAQ created successfully!");
        refetch();
        navigate("/admission-faq");
      }
    } catch (error) {
      toast.error("Failed to create FAQ");
      console.error("Failed to create FAQ:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create FAQ</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Question*</label>
              <FormInput
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="FAQ question"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Answer*</label>
              <FormTextarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Detailed answer"
                rows={8}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/admission-faq")}
                className="w-24"
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="w-24"
                disabled={isLoading || !question || !answer}
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

export default CreateFaq;
