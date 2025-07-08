import { Edit, Eye, Trash2, Loader2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import { config } from "../../config";
import { truncateHtml } from "../../services/utility";
import Pagination from "../../components/Pagination";

export interface AboutItem {
  uuid: string;
  title: string;
  content: string;
  order_no: number | null;
  active: boolean;
  keyword: string;
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

export interface AboutData {
  data: AboutItem[];
  meta: Meta;
  links: Links;
}

export interface AboutApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: AboutData;
}

const { EditorKey } = config;

function Main() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState<AboutItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetAboutQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateAbout, { isLoading: isUpdating }] = useUpdateAboutMutation();
  const [deleteAbout, { isLoading: isDeleting }] = useDeleteAboutMutation();

  const navigate = useNavigate();

  const handleView = (about: AboutItem) => {
    setSelectedAbout(about);
    setViewModal(true);
  };

  const handleDelete = async (about: AboutItem) => {
    try {
      const response = await deleteAbout(about.uuid).unwrap();
      if (response) {
        toast.success("About content deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete about content");
      console.error("Failed to delete about:", error);
    }
  };

  const [editForm, setEditForm] = useState<
    Omit<AboutItem, "uuid"> & { image?: File | string | null }
  >({
    title: "",
    content: "",
    order_no: null,
    active: true,
    keyword: "",
  });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditModal = (about: AboutItem) => {
    setSelectedAbout(about);
    setEditForm({
      title: about.title,
      content: about.content,
      order_no: about.order_no,
      active: about.active,
      keyword: about.keyword,
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAbout) return;

    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("content", editForm.content);
      formData.append("order_no", editForm.order_no?.toString() || "");
      formData.append("active", editForm.active.toString());

      const response = await updateAbout({
        id: selectedAbout.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("About updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update about");
      console.error("Update error:", error);
    }
  };

  const handleEditorChange = (content: string) => {
    setEditForm((prev) => ({ ...prev, content }));
  };

  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({
      ...prev,
      active: e.target.checked,
    }));
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">About Us</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-about")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add About Content
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
                    <Table.Th className="whitespace-nowrap">Status</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {data?.data?.map((about, index) => (
                    <Table.Tr key={about.uuid}>
                      <Table.Td className="whitespace-nowrap">
                        {index + 1}
                      </Table.Td>
                      <Table.Td className="whitespace-nowrap">
                        {about.title}
                      </Table.Td>
                      <Table.Td className="whitespace-nowrap">
                        {truncateHtml(about.content)}
                      </Table.Td>
                      <Table.Td className="whitespace-nowrap">
                        {about.keyword}
                      </Table.Td>
                      <Table.Td className="whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            about.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {about.active ? "Active" : "Inactive"}
                        </span>
                      </Table.Td>
                      <Table.Td className="whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(about)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openEditModal(about)}
                            className="text-yellow-500 hover:text-yellow-700"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAbout(about);
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{selectedAbout?.title}</h2>
            <div className="mb-4">
              <strong>Content:</strong>
              <p className="mt-2 whitespace-pre-line">
                {truncateHtml(selectedAbout?.content || "")}
              </p>
            </div>
            <div className="space-y-2 mb-6">
              <p>
                <strong>Keyword:</strong> {selectedAbout?.keyword}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedAbout?.active ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Order:</strong> {selectedAbout?.order_no || "Not set"}
              </p>
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
            <h2 className="text-xl font-bold mb-4">Edit About Content</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <FormInput
                  id="title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Content
                </label>
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
                  value={editForm.content}
                  onEditorChange={handleEditorChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="keyword"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Keyword
                </label>
                <FormInput
                  id="keyword"
                  name="keyword"
                  type="text"
                  value={editForm.keyword}
                  onChange={handleEditChange}
                  placeholder="Enter keyword"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="order_no"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Order Number
                </label>
                <FormInput
                  id="order_no"
                  name="order_no"
                  type="number"
                  value={editForm.order_no || ""}
                  onChange={handleEditChange}
                  placeholder="Enter order number"
                />
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={editForm.active}
                  onChange={handleActiveChange}
                  className="mr-2"
                />
                <label
                  htmlFor="active"
                  className="text-sm font-medium text-gray-700"
                >
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => setEditModal(false)}
                  className="w-24"
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-24"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete About Content</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedAbout?.title}"?
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
                onClick={() => selectedAbout && handleDelete(selectedAbout)}
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

export default Main;
