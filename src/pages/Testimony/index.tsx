// TestimonyMain.tsx
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteTestimoniesMutation,
  useGetTestimoniesQuery,
  useUpdateTestimoniesMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import FileDropzone from "../../components/Dragzone";
import Pagination from "../../components/Pagination";
import { TestimonyItem } from "../../utils/dataTypes";

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

interface TestimonyData {
  data: TestimonyItem[];
  meta: Meta;
  links: Links;
}

export interface TestimonyApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: TestimonyData;
}

type EditFormType = {
  name: string;
  testimony: string;
  image: string | File | null;
};

function TestimonyMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedTestimony, setSelectedTestimony] =
    useState<TestimonyItem | null>(null);

  const { data, isLoading, isFetching, refetch } =
    useGetTestimoniesQuery(currentPage);

  const testimonies = data?.data || [];

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateTestimony, { isLoading: isUpdating }] =
    useUpdateTestimoniesMutation();
  const [deleteTestimony, { isLoading: isDeleting }] =
    useDeleteTestimoniesMutation();

  const navigate = useNavigate();

  const handleView = (testimony: TestimonyItem) => {
    setSelectedTestimony(testimony);
    setViewModal(true);
  };

  const handleDelete = async (testimony: TestimonyItem) => {
    try {
      const response = await deleteTestimony(testimony.uuid).unwrap();
      if (response) {
        toast.success("Testimony deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete testimony");
      console.error("Failed to delete testimony:", error);
    }
  };

  const [editForm, setEditForm] = useState<EditFormType>({
    name: "",
    testimony: "",
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

  const openEditModal = (testimony: TestimonyItem) => {
    setSelectedTestimony(testimony);
    setEditForm({
      name: testimony.name,
      testimony: testimony.testimony,
      image: testimony.image,
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTestimony) return;

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("testimony", editForm.testimony);
      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updateTestimony({
        id: selectedTestimony.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Testimony updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update testimony");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Testimonies</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-testimony")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Testimony
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
                    <Table.Th className="whitespace-nowrap">Name</Table.Th>
                    <Table.Th className="whitespace-nowrap">Testimony</Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    testimonies.map((testimony, index) => (
                      <Table.Tr key={testimony.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {testimony.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {testimony.testimony.length > 50
                            ? `${testimony.testimony.substring(0, 50)}...`
                            : testimony.testimony}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {testimony.image && (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="Testimony"
                                className="rounded-full"
                                src={testimony.image}
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(testimony)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(testimony)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedTestimony(testimony);
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
      <Dialog
        size="2xl"
        open={viewModal}
        onClose={() => setViewModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">
              {selectedTestimony?.name}
            </h2>
            <div className="mb-4">
              <strong>Testimony:</strong>
              <p className="mt-2 whitespace-pre-line">
                {selectedTestimony?.testimony}
              </p>
            </div>
            {selectedTestimony?.image && (
              <div className="mb-6">
                <strong>Image:</strong>
                <div className="mt-2">
                  <img
                    src={selectedTestimony.image}
                    alt={selectedTestimony.name}
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

      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Edit Testimony</h2>
            <form onSubmit={handleEditSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <FormInput
                  name="name"
                  type="text"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Testimony Content
                </label>
                <FormTextarea
                  name="testimony"
                  value={editForm.testimony}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Testimony"
                  rows={6}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Image</label>
                <div className="flex flex-col">
                  <FileDropzone
                    onFileAccepted={(file: File) => {
                      setEditForm((prev) => ({
                        ...prev,
                        image: file,
                      }));
                    }}
                    initialPreview={
                      typeof editForm.image === "string" ? editForm.image : null
                    }
                    accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                    maxSize={2 * 1024 * 1024} // 2MB
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    JPEG, PNG, or JPG (Max 2MB)
                  </p>
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
            <h2 className="text-xl font-bold mb-4">Delete Testimony</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedTestimony?.name}"?
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
                onClick={() =>
                  selectedTestimony && handleDelete(selectedTestimony)
                }
                className="w-24"
                disabled={isDeleting}
              >
                {isDeleting ? (
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

export default TestimonyMain;
