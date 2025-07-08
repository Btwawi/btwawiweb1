import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import {
  useCreateHeroMutation,
  useGetHeroSectionQuery,
} from "../../stores/api/apiSlice";
import { ApiError } from "../../services/service";
import toast from "react-hot-toast";
import { HeroApiResponse } from "../HeroSection";
import FileDropzone from "../../components/Dragzone";

interface Hero {
  title: string;
  caption: string;
  cta1: {
    title: string;
    link: string;
  };
  cta2: {
    title: string;
    link: string;
  };
  image: string | File | null;
}

interface FormErrors {
  title: string;
  caption: string;
  cta1Title: string;
  cta1Link: string;
  image: string;
}

interface MainProps {
  initialData?: Partial<Hero> | null;
}

const Main = ({ initialData = null }: MainProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    initialData?.image?.toString() || ""
  );

  const [form, setForm] = useState<Hero>({
    title: initialData?.title || "",
    caption: initialData?.caption || "",
    cta1: initialData?.cta1 || { title: "", link: "" },
    cta2: initialData?.cta2 || { title: "", link: "" },
    image: initialData?.image || null,
  });

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    caption: "",
    cta1Title: "",
    cta1Link: "",
    image: "",
  });

  const [createHero] = useCreateHeroMutation();
  const { refetch } = useGetHeroSectionQuery(currentPage);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Hero] as Record<string, string>),
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleFileAccepted = (file: File) => {
    processImageFile(file);
  };

  const processImageFile = (file: File) => {
    if (!file.type.match("image.*")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select an image file",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setForm((prev) => ({ ...prev, image: file }));
    };
    reader.readAsDataURL(file);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      title: !form.title ? "Title is required" : "",
      caption: !form.caption ? "Caption is required" : "",
      cta1Title: !form.cta1.title ? "Button 1 text is required" : "",
      cta1Link: !form.cta1.link ? "Button 1 link is required" : "",
      image: !form.image ? "Image is required" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("caption", form.caption);
      formData.append("cta1_title", form.cta1.title);
      formData.append("cta1_link", form.cta1.link);
      formData.append("cta2_title", form.cta2.title);
      formData.append("cta2_link", form.cta2.link);
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      const response = await createHero(formData).unwrap();
      if (response.status === "success") {
        toast.success("Hero created successfully!");
        refetch();
        navigate("/hero-section");
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
                {initialData ? "Edit Hero" : "Create Hero"}
              </h2>
              <div className="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
                {initialData
                  ? "Update your hero section"
                  : "Create an engaging hero section for your visitors"}
              </div>

              <form onSubmit={handleSubmit} className="mt-8 intro-x">
                <label htmlFor="title">Hero Title</label>
                <FormInput
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  className="block px-4 py-3 min-w-full xl:min-w-[350px]"
                  placeholder="Hero Title"
                />
                {errors.title && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </div>
                )}

                {/* Caption */}
                <div className="mt-2">
                  <label htmlFor="caption">Caption</label>
                  <FormTextarea
                    name="caption"
                    value={form.caption}
                    onChange={handleChange}
                    className="block px-4 min-w-full xl:min-w-[350px]"
                    placeholder="Hero Caption"
                    rows={3}
                  />
                  {errors.caption && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.caption}
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Hero Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <FileDropzone
                        onFileAccepted={handleFileAccepted}
                        accept={{
                          "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                        }}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                  {errors.image && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.image}
                    </div>
                  )}
                </div>

                {/* CTA 1 */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Primary Button
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormInput
                        name="cta1.title"
                        type="text"
                        value={form.cta1.title}
                        onChange={handleChange}
                        placeholder="Button Text"
                      />
                      {errors.cta1Title && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.cta1Title}
                        </div>
                      )}
                    </div>
                    <div>
                      <FormInput
                        name="cta1.link"
                        type="url"
                        value={form.cta1.link}
                        onChange={handleChange}
                        placeholder="Button Link"
                      />
                      {errors.cta1Link && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.cta1Link}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA 2 */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Secondary Button (Optional)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormInput
                        name="cta2.title"
                        type="text"
                        value={form.cta2.title}
                        onChange={handleChange}
                        placeholder="Button Text"
                      />
                    </div>
                    <div>
                      <FormInput
                        name="cta2.link"
                        type="url"
                        value={form.cta2.link}
                        onChange={handleChange}
                        placeholder="Button Link"
                      />
                    </div>
                  </div>
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
                    onClick={() => navigate("/hero-section")}
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
