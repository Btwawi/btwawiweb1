import { useState } from "react";
import {
  useCreateSocialMediaMutation,
  useGetSocialMediaQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { FormInput } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SocialMediaApiResponse } from "../SocialMedia";

interface SocialMediaFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface SocialMediaCreateData {
  name: string;
  link: string;
}

function SocialMediaCreateForm({ onSuccess, onCancel }: SocialMediaFormProps) {
  const [formData, setFormData] = useState<SocialMediaCreateData>({
    name: "",
    link: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const [createSocialMedia, { isLoading }] = useCreateSocialMediaMutation();
  const { refetch } = useGetSocialMediaQuery(currentPage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.link) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await createSocialMedia(formData).unwrap();
      if (response) {
        toast.success("Social media created successfully!");
        setFormData({ name: "", link: "" });
        onSuccess?.();
        refetch();
        navigate("/social-media");
      }
    } catch (error) {
      toast.error("Failed to create social media");
      console.error("Creation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Add Social Media</h2>
      </div>
      <div>
        <label className="block mb-2 font-medium">Platform Name</label>
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Facebook, Twitter"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Profile URL</label>
        <FormInput
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://example.com/your-profile"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline-secondary"
          onClick={() => navigate("/social-media")}
          className="w-24"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-24"
          disabled={isLoading || !formData.name || !formData.link}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
        </Button>
      </div>
    </form>
  );
}

export default SocialMediaCreateForm;
