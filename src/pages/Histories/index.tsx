import { Edit, Eye, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteHistoryMutation,
  useGetHistoriesQuery,
  useUpdateHistoryMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import Lucide from "../../base-components/Lucide";
import { Loader2 } from "lucide-react";
import FileDropzone from "../../components/Dragzone";
import Pagination from "../../components/Pagination";

export interface HistoryItem {
  uuid: string;
  title: string;
  description: string;
  date: string;
  image: string;
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

interface HistoryData {
  data: HistoryItem[];
  meta: Meta;
  links: Links;
}

export interface HistoryApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: HistoryData;
}

type EditFormType = {
  title: string;
  description: string;
  date: string;
  image: string | File | null;
};

function HistoryMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(
    null
  );

  const { data, isLoading, isFetching, refetch } =
    useGetHistoriesQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateHistory, { isLoading: isUpdating }] = useUpdateHistoryMutation();
  const [deleteHistory] = useDeleteHistoryMutation();

  const navigate = useNavigate();

  const handleView = (history: HistoryItem) => {
    setSelectedHistory(history);
    setViewModal(true);
  };

  const handleDelete = async (history: HistoryItem) => {
    try {
      const response = await deleteHistory(history.uuid).unwrap();
      if (response) {
        toast.success("History item deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete history item");
      console.error("Failed to delete history:", error);
    }
  };

  const [editForm, setEditForm] = useState<EditFormType>({
    title: "",
    description: "",
    date: "",
    image: null,
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

  const openEditModal = (history: HistoryItem) => {
    setSelectedHistory(history);
    setEditForm({
      title: history.title,
      description: history.description,
      date: history.date,
      image: history.image,
    });
    setEditModal(true);
    setEditImagePreview(history.image);
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImagePreview(reader.result as string);
      setEditForm((prev) => ({
        ...prev,
        image: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedHistory) return;

    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      formData.append("date", editForm.date);
      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updateHistory({
        id: selectedHistory.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("History updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update history");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Our History</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-history")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add History Item
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
                      Description
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Date</Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((history, index) => (
                      <Table.Tr key={history.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {history.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {history.description.length > 50
                            ? `${history.description.substring(0, 50)}...`
                            : history.description}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {new Date(history.date).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {history.image && (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="History"
                                className="rounded-full"
                                src={history.image}
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(history)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(history)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedHistory(history);
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{selectedHistory?.title}</h2>
            <div className="mb-4">
              <strong>Date:</strong>
              <p className="mt-1">
                {selectedHistory?.date &&
                  new Date(selectedHistory.date).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-4">
              <strong>Description:</strong>
              <p className="mt-2 whitespace-pre-line">
                {selectedHistory?.description}
              </p>
            </div>
            {selectedHistory?.image && (
              <div className="mb-6">
                <strong>Image:</strong>
                <div className="mt-2">
                  <img
                    src={selectedHistory.image}
                    alt={selectedHistory.title}
                    className="max-w-full h-auto rounded"
                  />
                </div>
              </div>
            )}
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
            <h2 className="text-xl font-bold mb-4">Edit History Item</h2>
            <form onSubmit={handleEditSubmit}>
              <FormInput
                name="title"
                type="text"
                value={editForm.title}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Title"
                required
              />
              <FormTextarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Description"
                rows={6}
                required
              />
              <FormInput
                name="date"
                type="date"
                value={editForm.date.split("T")[0]}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Date"
                required
              />

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Image</label>
                <div className="flex items-center">
                  <FileDropzone
                    onFileAccepted={(file: File) => {
                      if (!file.type.match("image.*")) {
                        toast.error("Please select an image file");
                        return;
                      }
                      processImageFile(file);
                    }}
                    accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                  />
                  {editImagePreview && (
                    <img
                      src={editImagePreview}
                      alt="Current hero"
                      className="h-20 object-cover rounded mt-2"
                    />
                  )}
                </div>
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
                  {isUpdating ? "Saving..." : "Save"}
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
            <h2 className="text-xl font-bold mb-4">Delete History Item</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedHistory?.title}"?
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
                onClick={() => selectedHistory && handleDelete(selectedHistory)}
                className="w-24"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></span>
                  </span>
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

export default HistoryMain;
