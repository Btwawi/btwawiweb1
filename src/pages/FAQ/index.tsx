import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { FormInput, FormTextarea } from "../../base-components/Form";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { FaqItem } from "../../utils/dataTypes";

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

interface FaqData {
  data: FaqItem[];
  meta: Meta;
  links: Links;
}

export interface FaqApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: FaqData;
}

function FaqMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } = useGetFaqQuery(currentPage);

  const faqs = data?.data || [];

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const handleView = (faq: FaqItem) => {
    setSelectedFaq(faq);
    setViewModal(true);
  };

  const handleEdit = (faq: FaqItem) => {
    setSelectedFaq(faq);
    setUpdatedQuestion(faq.question);
    setUpdatedAnswer(faq.answer);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedFaq) return;

    try {
      const response = await updateFaq({
        id: selectedFaq.uuid,
        data: {
          question: updatedQuestion,
          answer: updatedAnswer,
        },
      }).unwrap();

      if (response) {
        toast.success("FAQ updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update FAQ");
      console.error("Failed to update FAQ:", error);
    }
  };

  const handleDelete = async (faq: FaqItem) => {
    try {
      const response = await deleteFaq(faq.uuid).unwrap();
      if (response) {
        toast.success("FAQ deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete FAQ");
      console.error("Failed to delete FAQ:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">
            Frequently Asked Questions
          </h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-faq")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>
        </div>
        <div className="p-5">
          {isLoading || isFetching ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="whitespace-nowrap">#</Table.Th>
                    <Table.Th className="whitespace-nowrap">Question</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    faqs.map((faq, index) => (
                      <Table.Tr key={faq.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {faq.question}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(faq)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(faq)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedFaq(faq);
                                setDeleteModal(true);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                </Table.Tbody>
              </Table>
            </div>
          )}
          <div className="p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={(page: number) => setCurrentPage(page)}
              onItemsPerPageChange={(newLimit: number) => {
                setItemsPerPage(newLimit);
                setCurrentPage(1);
              }}
              isLoading={isLoading || isFetching}
            />
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Dialog size="2xl" open={viewModal} onClose={() => setViewModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">FAQ Details</h2>
            <div className="mb-4">
              <strong>Question:</strong>
              <p className="mt-1">{selectedFaq?.question}</p>
            </div>
            <div className="mb-4">
              <strong>Answer:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">{selectedFaq?.answer}</p>
              </div>
            </div>
            <div className="text-right">
              <Button
                variant="outline-secondary"
                onClick={() => setViewModal(false)}
                className="w-24"
              >
                Close
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Edit Modal */}
      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit FAQ</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Question</label>
              <FormInput
                type="text"
                value={updatedQuestion}
                onChange={(e) => setUpdatedQuestion(e.target.value)}
                placeholder="Enter the question"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Answer</label>
              <FormTextarea
                value={updatedAnswer}
                onChange={(e) => setUpdatedAnswer(e.target.value)}
                placeholder="Enter the answer"
                rows={6}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline-secondary"
                onClick={() => setEditModal(false)}
                className="w-24"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdate}
                className="w-24"
                disabled={isUpdating || !updatedQuestion || !updatedAnswer}
              >
                {isUpdating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]s">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete FAQ</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedFaq?.question}"?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline-secondary"
                onClick={() => setDeleteModal(false)}
                className="w-24"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => selectedFaq && handleDelete(selectedFaq)}
                className="w-24"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

export default FaqMain;
