import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeleteSpecialEnquiryMutation,
  useGetSpecialEnquiryQuery,
  useUpdateSpecialEnquiryMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormTextarea,
  FormSwitch,
} from "../../base-components/Form";
import { SpecialEnquiryItem } from "../../utils/dataTypes";
import Pagination from "../../components/Pagination";

function SpecialEnquiryMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] =
    useState<SpecialEnquiryItem | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedOrderNo, setUpdatedOrderNo] = useState(0);
  const [updatedActive, setUpdatedActive] = useState(false);
  const [updatedKeyword, setUpdatedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetSpecialEnquiryQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateEnquiry, { isLoading: isUpdating }] =
    useUpdateSpecialEnquiryMutation();
  const [deleteEnquiry, { isLoading: isDeleting }] =
    useDeleteSpecialEnquiryMutation();
  const navigate = useNavigate();

  const handleView = (enquiry: SpecialEnquiryItem) => {
    setSelectedEnquiry(enquiry);
    setViewModal(true);
  };

  const handleEdit = (enquiry: SpecialEnquiryItem) => {
    setSelectedEnquiry(enquiry);
    setUpdatedTitle(enquiry.title);
    setUpdatedContent(enquiry.content);
    setUpdatedOrderNo(enquiry.order_no);
    setUpdatedActive(enquiry.active);
    setUpdatedKeyword(enquiry.keyword);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;

    try {
      const response = await updateEnquiry({
        id: selectedEnquiry.uuid,
        data: {
          title: updatedTitle,
          content: updatedContent,
          order_no: updatedOrderNo,
          active: updatedActive,
          keyword: updatedKeyword,
        },
      }).unwrap();

      if (response) {
        toast.success("Special enquiry updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update special enquiry");
      console.error("Failed to update special enquiry:", error);
    }
  };

  const handleDelete = async (enquiry: SpecialEnquiryItem) => {
    try {
      const response = await deleteEnquiry(enquiry.uuid).unwrap();
      if (response) {
        toast.success("Special enquiry deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete special enquiry");
      console.error("Failed to delete special enquiry:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Special Enquiries</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-special-enquiry")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Enquiry
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
                    <Table.Th className="whitespace-nowrap">Title</Table.Th>
                    <Table.Th className="whitespace-nowrap">Content</Table.Th>
                    <Table.Th className="whitespace-nowrap">Keyword</Table.Th>
                    <Table.Th className="whitespace-nowrap">Order</Table.Th>
                    <Table.Th className="whitespace-nowrap">Status</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((enquiry, index) => (
                      <Table.Tr key={enquiry.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {enquiry.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {enquiry.content.length > 50
                            ? `${enquiry.content.substring(0, 50)}...`
                            : enquiry.content}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {enquiry.keyword}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {enquiry.order_no}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              enquiry.active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {enquiry.active ? "Active" : "Inactive"}
                          </span>
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(enquiry)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(enquiry)}
                              className="text-yellow-500 hover:text-yellow-700"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enquiry);
                                setDeleteModal(true);
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
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
        </div>

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

      {/* View Modal */}
      <Dialog size="2xl" open={viewModal} onClose={() => setViewModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{selectedEnquiry?.title}</h2>

            <div className="mb-4">
              <strong>Content:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">
                  {selectedEnquiry?.content}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <strong>Keyword:</strong>
                <p className="mt-1">{selectedEnquiry?.keyword}</p>
              </div>
              <div>
                <strong>Order:</strong>
                <p className="mt-1">{selectedEnquiry?.order_no}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <p className="mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedEnquiry?.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedEnquiry?.active ? "Active" : "Inactive"}
                  </span>
                </p>
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Edit Special Enquiry</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title*</label>
                <FormInput
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Enquiry title"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content*</label>
                <FormTextarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
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
                    value={updatedKeyword}
                    onChange={(e) => setUpdatedKeyword(e.target.value)}
                    placeholder="Enquiry keyword"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Order Number*
                  </label>
                  <FormInput
                    type="number"
                    value={updatedOrderNo}
                    onChange={(e) => setUpdatedOrderNo(Number(e.target.value))}
                    placeholder="Order number"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <FormSwitch className="mr-2">
                  <FormSwitch.Input
                    type="checkbox"
                    checked={updatedActive}
                    onChange={(e) => setUpdatedActive(e.target.checked)}
                  />
                </FormSwitch>
                <label>Active Status</label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
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
                  disabled={
                    isUpdating ||
                    !updatedTitle ||
                    !updatedContent ||
                    !updatedKeyword
                  }
                >
                  {isUpdating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Special Enquiry</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedEnquiry?.title}"?
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
                onClick={() => selectedEnquiry && handleDelete(selectedEnquiry)}
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

export default SpecialEnquiryMain;
