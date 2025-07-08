import { useState, useRef } from "react";
import { useCreatePublicationsMutation } from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import {
  FormInput,
  FormSelect,
  FormLabel,
  FormSwitch,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetPublicationCategoriesQuery,
  useGetPublicationQuery,
} from "../../stores/api/apiSlice";
import {
  PublicationApiResponse,
  PublicationCategoryApiResponse,
} from "../../utils/dataTypes";
import { Editor } from "@tinymce/tinymce-react";
import { config } from "../../config";
import FileDropzone from "../../components/Dragzone";

const { EditorKey } = config;

function CreatePublication() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
  const editorRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { refetch } = useGetPublicationQuery(currentPage);
  const { data: categoriesResponse } =
    useGetPublicationCategoriesQuery(currentPage);
  const [createPublication, { isLoading }] = useCreatePublicationsMutation();

  const handleImageAccepted = (file: File) => {
    setImage(file);
  };

  const handleFileAccepted = (file: File) => {
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !categoryId) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    // formData.append("slug", slug);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    if (image) formData.append("image", image);
    if (file) formData.append("file", file);

    try {
      const response = await createPublication(formData).unwrap();

      if (response) {
        toast.success("Publication created successfully!");
        refetch();
        navigate("/publication");
      }
    } catch (error) {
      toast.error("Failed to create publication");
      console.error("Failed to create publication:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create Publication</h2>
        <Button
          onClick={() => navigate("/publications")}
          variant="outline-secondary"
        >
          Back to List
        </Button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <FormLabel htmlFor="title">Title*</FormLabel>
              <FormInput
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Publication title"
                required
              />
            </div>

            {/* <div>
              <FormLabel htmlFor="slug">Slug*</FormLabel>
              <FormInput
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Publication slug"
                required
              />
            </div> */}

            <div className="md:col-span-2">
              <FormLabel htmlFor="description">Description*</FormLabel>
              <Editor
                apiKey={EditorKey}
                init={{
                  height: 300,
                  menubar: true,
                  directionality: "ltr",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                value={description}
                onEditorChange={(content: string) => setDescription(content)}
              />
            </div>

            <div>
              <FormLabel htmlFor="category">Category*</FormLabel>
              <FormSelect
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {categoriesResponse?.data.map((category) => (
                  <option key={category.uuid} value={category.uuid}>
                    {category.name}
                  </option>
                ))}
              </FormSelect>
            </div>

            <div>
              <FormLabel>Featured Publication</FormLabel>
              <div className="mt-2">
                <FormSwitch>
                  <FormSwitch.Input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <FormSwitch.Label>Mark as featured</FormSwitch.Label>
                </FormSwitch>
              </div>
            </div>

            <div>
              <FormLabel>Image</FormLabel>
              <FileDropzone
                onFileAccepted={handleImageAccepted}
                initialPreview={imagePreview}
                accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                maxSize={5 * 1024 * 1024} // 5MB
              />
              <p className="text-xs text-slate-500 mt-1">
                Supported formats: JPEG, JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>

            <div>
              <FormLabel>Publication File*</FormLabel>
              <FileDropzone
                onFileAccepted={handleFileAccepted}
                accept={{ "application/pdf": [".pdf"] }}
                maxSize={10 * 1024 * 1024} // 10MB
              />
              <p className="text-xs text-slate-500 mt-1">
                Supported format: PDF (Max 10MB)
              </p>
              {file && (
                <p className="text-sm text-green-600 mt-1">
                  Selected file: {file.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-4">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={() => navigate("/publication")}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-24"
              disabled={
                isLoading || !title || !description || !categoryId || !file
              }
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

export default CreatePublication;
