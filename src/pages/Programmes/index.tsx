import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProgrammesMutation,
  useGetProgrammesQuery,
  useUpdateProgrammesMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import {
  ProgrammeApiResponse,
  ProgrammeItem,
  ProgrammeFormType,
} from "../../utils/dataTypes";
import FileDropzone from "../../components/Dragzone";
import Pagination from "../../components/Pagination";
import Lucide from "../../base-components/Lucide";

function ProgrammeMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProgramme, setSelectedProgramme] =
    useState<ProgrammeItem | null>(null);

  const { data, isLoading, isFetching, refetch } =
    useGetProgrammesQuery(currentPage);

  const programmes = data?.data || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const filteredProgrammes = Array.isArray(programmes)
    ? programmes.filter((member) => {
        const nameMatch = member.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return nameMatch;
      })
    : [];

  const [updateProgramme, { isLoading: isUpdating }] =
    useUpdateProgrammesMutation();
  const [deleteProgramme, { isLoading: isDeleting }] =
    useDeleteProgrammesMutation();

  const navigate = useNavigate();

  const handleView = (programme: ProgrammeItem) => {
    setSelectedProgramme(programme);
    setViewModal(true);
  };

  const handleDelete = async (programme: ProgrammeItem) => {
    try {
      const response = await deleteProgramme(programme.uuid).unwrap();
      if (response) {
        toast.success("Programme deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete programme");
      console.error("Failed to delete programme:", error);
    }
  };

  const [editForm, setEditForm] = useState<ProgrammeFormType>({
    name: "",
    description: "",
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

  const openEditModal = (programme: ProgrammeItem) => {
    setSelectedProgramme(programme);
    setEditForm({
      name: programme.name,
      description: programme.description,
      image: programme.image, // This will be either a string URL or null
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProgramme) return;

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);

      // Only append image if it's a File object (new upload)
      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      } else if (editForm.image === null) {
        formData.append("remove_image", "true");
      }

      const response = await updateProgramme({
        id: selectedProgramme.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Programme updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update programme");
      console.error("Update error:", error);
    }
  };
  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Programmes</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-programmes")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Programme
            </Button>
          </div>
        </div>
        <div className="relative w-full sm:w-64 left-4">
          <FormInput
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10"
          />
          <Lucide
            icon="Search"
            className="absolute inset-y-0 left-0 w-4 h-4 my-auto ml-3 text-slate-400"
          />
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
                    <Table.Th className="whitespace-nowrap">
                      Description
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">
                      Date Created
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    filteredProgrammes.map((programme, index) => (
                      <Table.Tr key={programme.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {programme.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {programme.description.length > 50
                            ? `${programme.description.substring(0, 50)}...`
                            : programme.description}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {programme.image && (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="Programme"
                                className="rounded-full"
                                src={programme.image}
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {new Date(
                            programme.date_created
                          ).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(programme)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(programme)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProgramme(programme);
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
      <Dialog
        size="2xl"
        open={viewModal}
        onClose={() => setViewModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
      >
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {selectedProgramme?.name}
            </h2>
            <div className="mb-4">
              <strong>Description:</strong>
              <p className="mt-2 whitespace-pre-line">
                {selectedProgramme?.description}
              </p>
            </div>
            <div className="mb-4">
              <strong>Date Created:</strong>
              <p className="mt-2">
                {selectedProgramme?.date_created &&
                  new Date(selectedProgramme.date_created).toLocaleString()}
              </p>
            </div>
            {selectedProgramme?.image && (
              <div className="mb-6">
                <strong>Image:</strong>
                <div className="mt-2">
                  <img
                    src={selectedProgramme.image}
                    alt={selectedProgramme.name}
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Programme</h2>
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
                  Description
                </label>
                <FormTextarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Description"
                  rows={6}
                  required
                />
              </div>
              <div className="mb-4">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Image
                  </label>
                  <div className="flex flex-col space-y-4">
                    {editForm.image && (
                      <div className="flex items-center">
                        <img
                          src={
                            typeof editForm.image === "string"
                              ? editForm.image
                              : URL.createObjectURL(editForm.image)
                          }
                          alt="Current Programme"
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <FileDropzone
                      onFileAccepted={(file: File) => {
                        setEditForm((prev) => ({
                          ...prev,
                          image: file,
                        }));
                      }}
                    />
                    <div className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, WEBP (Max 5MB)
                    </div>
                  </div>
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
            <h2 className="text-xl font-bold mb-4">Delete Programme</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedProgramme?.name}"?
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
                  selectedProgramme && handleDelete(selectedProgramme)
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

export default ProgrammeMain;
