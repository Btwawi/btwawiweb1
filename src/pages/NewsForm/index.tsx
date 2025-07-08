// CreateNews.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import {
  useCreateNewsMutation,
  useGetNewsCategoryQuery,
  useGetNewsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { NewsApiResponse } from "../News";
import { Editor } from "@tinymce/tinymce-react";
import FileDropzone from "../../components/Dragzone";
import { config } from "../../config";

const { EditorKey } = config;

function CreateNews() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [createNews, { isLoading }] = useCreateNewsMutation();
  const { data: categoriesData } = useGetNewsCategoryQuery(currentPage);
  const { refetch } = useGetNewsQuery(currentPage);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    image: null as File | null,
    date_posted: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileAccepted = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category_id", formData.category);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await createNews(formDataToSend).unwrap();

      if (response) {
        toast.success("News created successfully!");
        refetch();
        navigate("/news");
      }
    } catch (error) {
      toast.error("Failed to create news");
      console.error("Creation error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create News</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <div className="space-y-4">
              <label className="block mb-2 text-sm font-medium">Title</label>
              <FormInput
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="News Title"
                required
              />

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  {categoriesData?.data.map((category) => (
                    <option key={category.uuid} value={category.uuid}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Content
                </label>
                <Editor
                  apiKey={EditorKey}
                  value={formData.content}
                  onEditorChange={handleEditorChange}
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help | image",
                  }}
                />
              </div>
              <div>
                {imagePreview && (
                  <div className="flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Course Preview"
                      className="h-40 object-cover rounded-md"
                    />
                  </div>
                )}
                <label className="block mb-2 text-sm font-medium">Image</label>
                <FileDropzone
                  onFileAccepted={handleFileAccepted}
                  accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                  maxSize={5 * 1024 * 1024} // 5MB
                />
                <p className="mt-1 text-xs text-gray-500">
                  JPEG, PNG, or JPG (Max 2MB)
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-3">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/news")}
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
                "Create News"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNews;
