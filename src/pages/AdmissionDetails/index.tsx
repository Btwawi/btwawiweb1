// src/pages/admission/AdmissionDetailsMain.tsx
import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeleteAdmissionDetailsMutation,
  useGetAdmissionDetailsQuery,
  useUpdateAdmissionDetailsMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormInput, FormSwitch } from "../../base-components/Form";
import { Editor } from "@tinymce/tinymce-react";
import {
  AdmissionDetailItem,
  AdmissionDetailsApiResponse,
} from "../../utils/dataTypes";
import { config } from "../../config";
import Pagination from "../../components/Pagination";

const { EditorKey } = config;

function AdmissionDetailsMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDetail, setSelectedDetail] =
    useState<AdmissionDetailItem | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedOrderNo, setUpdatedOrderNo] = useState(0);
  const [updatedActive, setUpdatedActive] = useState(false);
  const [updatedKeyword, setUpdatedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetAdmissionDetailsQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateDetail, { isLoading: isUpdating }] =
    useUpdateAdmissionDetailsMutation();
  const [deleteDetail, { isLoading: isDeleting }] =
    useDeleteAdmissionDetailsMutation();
  const navigate = useNavigate();

  const handleView = (detail: AdmissionDetailItem) => {
    setSelectedDetail(detail);
    setViewModal(true);
  };

  const handleEdit = (detail: AdmissionDetailItem) => {
    setSelectedDetail(detail);
    setUpdatedTitle(detail.title);
    setUpdatedContent(detail.content);
    setUpdatedOrderNo(detail.order_no);
    setUpdatedActive(detail.active);
    setUpdatedKeyword(detail.keyword);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedDetail) return;

    try {
      const response = await updateDetail({
        id: selectedDetail.uuid,
        data: {
          title: updatedTitle,
          content: updatedContent,
          order_no: updatedOrderNo,
          active: updatedActive,
          keyword: updatedKeyword,
        },
      }).unwrap();

      if (response) {
        toast.success("Admission detail updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update admission detail");
      console.error("Failed to update admission detail:", error);
    }
  };

  const handleDelete = async (detail: AdmissionDetailItem) => {
    try {
      const response = await deleteDetail(detail.uuid).unwrap();
      if (response) {
        toast.success("Admission detail deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete admission detail");
      console.error("Failed to delete admission detail:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Admission Details</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-admission-detail")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Detail
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
                    <Table.Th className="whitespace-nowrap">
                      Content Preview
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Keyword</Table.Th>
                    <Table.Th className="whitespace-nowrap">Order</Table.Th>
                    <Table.Th className="whitespace-nowrap">Status</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((detail, index) => (
                      <Table.Tr key={detail.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {detail.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                detail.content.length > 50
                                  ? `${detail.content
                                      .substring(0, 50)
                                      .replace(/<[^>]*>/g, "")}...`
                                  : detail.content.replace(/<[^>]*>/g, ""),
                            }}
                          />
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {detail.keyword}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {detail.order_no}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              detail.active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {detail.active ? "Active" : "Inactive"}
                          </span>
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(detail)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(detail)}
                              className="text-yellow-500 hover:text-yellow-700"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDetail(detail);
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
            <h2 className="text-xl font-bold mb-4">{selectedDetail?.title}</h2>

            <div className="mb-4">
              <strong>Content:</strong>
              <div
                className="mt-2 p-3 bg-slate-50 rounded-md"
                dangerouslySetInnerHTML={{
                  __html: selectedDetail?.content || "",
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <strong>Keyword:</strong>
                <p className="mt-1">{selectedDetail?.keyword}</p>
              </div>
              <div>
                <strong>Order:</strong>
                <p className="mt-1">{selectedDetail?.order_no}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <p className="mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedDetail?.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedDetail?.active ? "Active" : "Inactive"}
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
            <h2 className="text-xl font-bold mb-4">Edit Admission Detail</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title*</label>
                <FormInput
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Detail title"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content*</label>
                <Editor
                  apiKey={EditorKey}
                  value={updatedContent}
                  onEditorChange={(content: string) =>
                    setUpdatedContent(content)
                  }
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Keyword*</label>
                  <FormInput
                    type="text"
                    value={updatedKeyword}
                    onChange={(e) => setUpdatedKeyword(e.target.value)}
                    placeholder="Detail keyword"
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
            <h2 className="text-xl font-bold mb-4">Delete Admission Detail</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedDetail?.title}"?
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
                onClick={() => selectedDetail && handleDelete(selectedDetail)}
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

export default AdmissionDetailsMain;
