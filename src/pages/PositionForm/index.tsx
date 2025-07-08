import { useState } from "react";
import { useCreatePositionMutation } from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  useGetCareerVolunteerQuery,
  useGetPositionQuery,
} from "../../stores/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { PositionApiResponse } from "../Position";

interface PositionCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface PositionCreateData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  position_category_id: string;
}

interface Category {
  uuid: string;
  name: string;
}

interface CategoriesApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: {
    data: Category[];
    meta?: {
      total: number;
      currentPage: number;
      totalPage: number;
      pageSize: number;
    };
    links?: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  };
}

export default function PositionCreateForm({
  onSuccess,
  onCancel,
}: PositionCreateFormProps) {
  const [formData, setFormData] = useState<PositionCreateData>({
    title: "",
    description: "",
    requirements: "",
    location: "",
    job_type: "",
    position_category_id: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoriesResponse } = useGetCareerVolunteerQuery(currentPage);

  const [createPosition, { isLoading }] = useCreatePositionMutation();
  const { refetch } = useGetPositionQuery(currentPage);
  const navigate = useNavigate();

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Temporary",
    "Volunteer",
    "Remote",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.position_category_id) {
      toast.error("Title and category are required");
      return;
    }

    try {
      const response = await createPosition(formData).unwrap();
      if (response) {
        toast.success("Position created successfully!");
        refetch();
        navigate("/position");
      }
    } catch (error) {
      toast.error("Failed to create position");
      console.error("Creation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-5">
        <h2 className="text-xl font-bold">Create Position</h2>
      </div>
      <div>
        <label className="block mb-2 font-medium">
          Job Title <span className="text-danger">*</span>
        </label>
        <FormInput
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Software Developer"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Job Description</label>
        <FormTextarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the position responsibilities"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Requirements</label>
        <FormTextarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="List the required qualifications and skills"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Location</label>
          <FormInput
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Lagos, Nigeria"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Job Type</label>
          <FormSelect
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
          >
            <option value="">Select job type</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FormSelect>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Category <span className="text-danger">*</span>
        </label>
        <FormSelect
          name="position_category_id"
          value={formData.position_category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categoriesResponse?.data.map((category) => (
            <option key={category.uuid} value={category.uuid}>
              {category.name}
            </option>
          ))}
        </FormSelect>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline-secondary"
          onClick={() => navigate(-1)}
          className="w-24"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-24"
          disabled={
            isLoading || !formData.title || !formData.position_category_id
          }
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
