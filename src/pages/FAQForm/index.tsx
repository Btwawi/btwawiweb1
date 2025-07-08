import { useState } from "react";
import {
  useCreateFaqMutation,
  useGetFaqQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { FormInput, FormTextarea } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaqApiResponse } from "../FAQ";

interface FaqFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface FaqCreateData {
  question: string;
  answer: string;
}

function FaqCreateForm({ onSuccess, onCancel }: FaqFormProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FaqCreateData>({
    question: "",
    answer: "",
  });

  const navigate = useNavigate();
  const [createFaq, { isLoading }] = useCreateFaqMutation();
  const { refetch } = useGetFaqQuery(currentPage);

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

    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }

    try {
      const response = await createFaq(formData).unwrap();
      if (response) {
        toast.success("FAQ created successfully!");
        setFormData({ question: "", answer: "" });
        onSuccess?.();
        refetch();
        navigate("/faq");
      }
    } catch (error) {
      toast.error("Failed to create FAQ");
      console.error("Creation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">
          Add A Frequently Asked Question
        </h2>
      </div>
      <div>
        <label className="block mb-2 font-medium">Question</label>
        <FormInput
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="What is your question?"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Answer</label>
        <FormTextarea
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Provide the answer..."
          rows={6}
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline-secondary"
          onClick={() => navigate("/faq")}
          className="w-24"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-24"
          disabled={
            isLoading || !formData.question.trim() || !formData.answer.trim()
          }
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
        </Button>
      </div>
    </form>
  );
}

export default FaqCreateForm;
