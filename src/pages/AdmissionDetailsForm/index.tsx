import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import { FormInput, FormSwitch } from "../../base-components/Form";
import { Editor } from "@tinymce/tinymce-react";
import {
  useCreateAdmissionDetailsMutation,
  useGetAdmissionDetailsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { AdmissionDetailsApiResponse } from "../../utils/dataTypes";
import { config } from "../../config";

const { EditorKey } = config;
function CreateAdmissionDetail() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [orderNo, setOrderNo] = useState(0);
  const [active, setActive] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [createDetail, { isLoading }] = useCreateAdmissionDetailsMutation();
  const { refetch } = useGetAdmissionDetailsQuery(currentPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createDetail({
        title,
        content,
        order_no: orderNo,
        active,
        keyword,
      }).unwrap();

      if (response) {
        toast.success("Admission detail created successfully!");
        refetch();
        navigate("/admission-details");
      }
    } catch (error) {
      toast.error("Failed to create admission detail");
      console.error("Failed to create admission detail:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">
          Create Admission Detail
        </h2>
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
                placeholder="Detail title"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content*</label>
              <Editor
                apiKey={EditorKey}
                value={content}
                onEditorChange={(newContent: string) => setContent(newContent)}
                init={{
                  height: 400,
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
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Keyword*</label>
                <FormInput
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Detail keyword"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Order Number*</label>
                <FormInput
                  type="number"
                  value={orderNo}
                  onChange={(e) => setOrderNo(Number(e.target.value))}
                  placeholder="Order number"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <FormSwitch className="mr-2">
                <FormSwitch.Input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </FormSwitch>
              <label>Active Status</label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/admission-details")}
                className="w-24"
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="w-24"
                disabled={isLoading || !title || !content || !keyword}
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

export default CreateAdmissionDetail;
