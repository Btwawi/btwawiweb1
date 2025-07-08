import { useState } from "react";
import {
  useCreateSpecialEnquiryMutation,
  useGetSpecialEnquiryQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import {
  FormInput,
  FormTextarea,
  FormSwitch,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SpecialEnquiryApiResponse } from "../../utils/dataTypes";

function CreateSpecialEnquiry() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [orderNo, setOrderNo] = useState(0);
  const [active, setActive] = useState(true);
  const [keyword, setKeyword] = useState("");

  const [createEnquiry, { isLoading }] = useCreateSpecialEnquiryMutation();
  const { refetch } = useGetSpecialEnquiryQuery(currentPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !keyword) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await createEnquiry({
        title,
        content,
        order_no: orderNo,
        active,
        keyword,
      }).unwrap();

      if (response) {
        toast.success("Special enquiry created successfully!");
        refetch();
        navigate("/special-enquiry");
      }
    } catch (error) {
      toast.error("Failed to create special enquiry");
      console.error("Failed to create special enquiry:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create Special Enquiry</h2>
        <Button
          onClick={() => navigate("/special-enquiries")}
          variant="outline-secondary"
        >
          Back to List
        </Button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Title*</label>
              <FormInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enquiry title"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content*</label>
              <FormTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Detailed enquiry content"
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Keyword*</label>
                <FormInput
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enquiry keyword"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Order Number</label>
                <FormInput
                  type="number"
                  value={orderNo}
                  onChange={(e) => setOrderNo(Number(e.target.value))}
                  placeholder="Order number"
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
          </div>

          <div className="flex justify-end mt-8 space-x-4">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={() => navigate("/special-enquiry")}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
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
        </form>
      </div>
    </div>
  );
}

export default CreateSpecialEnquiry;
