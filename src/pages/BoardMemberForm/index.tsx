import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateBoardMemberMutation,
  useGetBoardMemberQuery,
  useGetBoardMembersQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import Lucide from "../../base-components/Lucide";

export interface SocialLinks {
  twitter: string;
  facebook: string;
  linkedin: string;
}

export interface BoardMember {
  uuid: string;
  name: string;
  position: string;
  about: string;
  socialLinks: SocialLinks;
  image: string;
  category: Category;
}

interface Meta {
  total: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface BoardMemberData {
  data: BoardMember[];
  meta: Meta;
  links: Links;
}

interface BoardMemberApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: BoardMemberData;
}

interface Category {
  uuid: string;
  name: string;
  description: string;
}

interface CategoriesApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: {
    data: Category[];
    meta: {
      total: number;
      currentPage: number;
      totalPage: number;
      pageSize: number;
    };
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  };
}

interface FormData {
  name: string;
  position: string;
  about: string;
  category_id: string;
  social_links: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  image: File | null;
}

function CreateBoardMember() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [createBoardMember, { isLoading }] = useCreateBoardMemberMutation();
  const { refetch } = useGetBoardMemberQuery(currentPage);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    about: "",
    category_id: "",
    social_links: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },
    image: null,
  });

  // Use the correct query hook for categories
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetBoardMembersQuery(currentPage);

  // Initialize categories state properly
  const [categories, setCategories] = useState<Category[]>([]);

  // // Update categories when data loads
  // useEffect(() => {
  //   if (categoriesData) {
  //     const response = categoriesData as CategoriesApiResponse;
  //     setCategories(response.data.data);
  //   }
  // }, [categoriesData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("social_links[")) {
      const key = name.match(
        /\[(.*?)\]/
      )?.[1] as keyof FormData["social_links"];
      if (key) {
        setFormData((prev) => ({
          ...prev,
          social_links: {
            ...prev.social_links,
            [key]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("about", formData.about);
      formDataToSend.append("category_id", formData.category_id);
      formDataToSend.append(
        "social_links[linkedin]",
        formData.social_links.linkedin
      );
      formDataToSend.append(
        "social_links[twitter]",
        formData.social_links.twitter
      );
      formDataToSend.append(
        "social_links[facebook]",
        formData.social_links.facebook
      );
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await createBoardMember(formDataToSend).unwrap();

      if (response) {
        toast.success("Board member created successfully!");
        refetch();
        navigate("/board-members");
      }
    } catch (error) {
      toast.error("Failed to create board member");
      console.error("Creation error:", error);
    }
  };

  if (isCategoriesLoading) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">
          Create New Board Member
        </h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <FormInput
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Position
                </label>
                <FormInput
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter Member Position"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select a category</option>
                  {!isLoading &&
                    categoriesData &&
                    categoriesData.data?.map((category: any) => (
                      <option key={category.uuid} value={category.uuid}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  LinkedIn URL
                </label>
                <FormInput
                  name="social_links[linkedin]"
                  type="url"
                  value={formData.social_links.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Twitter URL
                </label>
                <FormInput
                  name="social_links[twitter]"
                  type="url"
                  value={formData.social_links.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Facebook URL
                </label>
                <FormInput
                  name="social_links[facebook]"
                  type="url"
                  value={formData.social_links.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/username"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              About
            </label>
            <FormTextarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Brief description about the board member..."
              rows={5}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              {formData.image ? (
                <div className="w-20 h-20 overflow-hidden rounded-md">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-md">
                  <Lucide icon="User" className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700 sr-only">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary-dark"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  JPEG, PNG, or JPG (Max 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end mt-8 space-x-3">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/board-members")}
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
                "Create Board Member"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBoardMember;
