// PartnerMain.tsx
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeletePartnersMutation,
  useGetPartnersQuery,
  useUpdatePartnersMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import toast from "react-hot-toast";
import FileDropzone from "../../components/Dragzone";
import Pagination from "../../components/Pagination";

// interfaces.ts
export interface Partner {
  uuid: string;
  name: string;
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

interface PartnerData {
  data: Partner[];
  meta: Meta;
  links: Links;
}

export interface PartnerApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: PartnerData;
}

type EditFormType = {
  name: string;
  image: string | File | null;
};

function PartnerMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetPartnersQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updatePartners, { isLoading: isUpdating }] =
    useUpdatePartnersMutation();
  const [deletePartners, { isLoading: isDeleting }] =
    useDeletePartnersMutation();

  const navigate = useNavigate();

  const handleView = (partner: Partner) => {
    setSelectedPartner(partner);
    setViewModal(true);
  };

  const handleDelete = async (partner: Partner) => {
    try {
      const response = await deletePartners(partner.uuid).unwrap();
      if (response) {
        toast.success("Partner deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete partner");
      console.error("Failed to delete partner:", error);
    }
  };

  const [editForm, setEditForm] = useState<EditFormType>({
    name: "",
    image: null,
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setEditForm({
      name: partner.name,
      image: partner.image,
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPartner) return;

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updatePartners({
        id: selectedPartner.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Partner updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update partner");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Our Partners</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-our-partner")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Partner
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
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((partner, index) => (
                      <Table.Tr key={partner.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {partner.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {partner.image && (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="Partner"
                                className="rounded-full"
                                src={partner.image}
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(partner)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(partner)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPartner(partner);
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
            <h2 className="text-xl font-bold mb-4">{selectedPartner?.name}</h2>
            {selectedPartner?.image && (
              <div className="mb-6">
                <div className="mt-2">
                  <img
                    src={selectedPartner.image}
                    alt={selectedPartner.name}
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Partner</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="block mb-2 text-sm font-medium">
                Partner Name
              </label>
              <FormInput
                name="name"
                type="text"
                value={editForm.name}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Partner Name"
                required
              />

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Logo</label>
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
            <h2 className="text-xl font-bold mb-4">Delete Partner</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedPartner?.name}"?
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
                onClick={() => selectedPartner && handleDelete(selectedPartner)}
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

export default PartnerMain;
