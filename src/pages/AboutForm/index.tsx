import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import {
  useCreateAboutMutation,
  useGetAboutQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { ApiError } from "../../services/service";
import { AboutApiResponse } from "../AboutUs";
import { Editor } from "@tinymce/tinymce-react";
import { config } from "../../config";

interface About {
  title: string;
  content: string;
  order_no: number | null;
  active: boolean;
  keyword: string;
}

interface FormErrors {
  title: string;
  content: string;
  keyword: string;
}

interface MainProps {
  initialData?: Partial<About> | null;
}

const { EditorKey } = config;

const Main = ({ initialData = null }: MainProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = useGetAboutQuery(currentPage);

  const [form, setForm] = useState<About>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    order_no: initialData?.order_no || null,
    active: initialData?.active !== undefined ? initialData.active : true,
    keyword: initialData?.keyword || "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    content: "",
    keyword: "",
  });

  const [createAbout] = useCreateAboutMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value ? parseInt(value) : null }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const newErrors = {
      title: !form.title ? "Title is required" : "",
      content: !form.content ? "Content is required" : "",
      keyword: !form.keyword ? "Keyword is required" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleEditorChange = (content: string) => {
    setForm((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("keyword", form.keyword);
      formData.append("active", form.active.toString());
      if (form.order_no !== null) {
        formData.append("order_no", form.order_no.toString());
      }

      const response = await createAbout(formData).unwrap();
      if (response.status === "success") {
        toast.success("About content created successfully!");
        refetch();
        navigate("/about-us");
      }
    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred";

      if (typeof err === "object" && err !== null) {
        const apiError = err as ApiError;
        errorMessage =
          apiError?.data?.message || apiError?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container relative z-10 sm:px-10 mt-4">
        <div className="block grid-cols-1 gap-4 xl:grid">
          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                {initialData ? "Edit About Content" : "Create About Content"}
              </h2>
              <div className="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
                {initialData
                  ? "Update your about content"
                  : "Create informative about content for your visitors"}
              </div>

              <form onSubmit={handleSubmit} className="mt-8 intro-x">
                {/* Title */}
                <label htmlFor="Title">Title</label>
                <FormInput
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  className="block px-4 py-3 min-w-full xl:min-w-[350px]"
                  placeholder="Title"
                />
                {errors.title && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </div>
                )}

                <div className="mt-3">
                  <label htmlFor="content">Content</label>
                  <Editor
                    apiKey={EditorKey}
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
                      bullist numlist outdent indent | removeformat | help",
                    }}
                    value={form.content}
                    onEditorChange={handleEditorChange}
                  />
                  {errors.content && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.content}
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <label htmlFor="keyword">Keyword</label>
                  <FormInput
                    name="keyword"
                    type="text"
                    value={form.keyword}
                    onChange={handleChange}
                    className="block px-4 min-w-full xl:min-w-[350px]"
                    placeholder="Keyword (used for URL slug)"
                  />
                  {errors.keyword && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.keyword}
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <label htmlFor="orderNo">Order Number</label>
                  <FormInput
                    name="order_no"
                    type="number"
                    value={form.order_no || ""}
                    onChange={handleNumberChange}
                    className="block px-4 min-w-full xl:min-w-[350px]"
                    placeholder="Order Number (optional)"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={form.active}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Active
                  </label>
                </div>

                <div className="mt-8 text-center intro-x xl:mt-10 xl:text-left">
                  <Button
                    variant="primary"
                    className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></span>
                        Saving...
                      </span>
                    ) : initialData ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                    onClick={() => navigate("/about-us")}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
