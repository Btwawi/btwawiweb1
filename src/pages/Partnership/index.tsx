import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeletePartnershipsMutation,
  useGetPartnershipsQuery,
  useUpdatePartnershipsMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormInput, FormTextarea } from "../../base-components/Form";
import { PartnershipItem, PartnershipApiResponse } from "../../utils/dataTypes";
import Pagination from "../../components/Pagination";

function PartnershipMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPartnership, setSelectedPartnership] =
    useState<PartnershipItem | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetPartnershipsQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updatePartnership, { isLoading: isUpdating }] =
    useUpdatePartnershipsMutation();
  const [deletePartnership, { isLoading: isDeleting }] =
    useDeletePartnershipsMutation();
  const navigate = useNavigate();

  const handleView = (partnership: PartnershipItem) => {
    setSelectedPartnership(partnership);
    setViewModal(true);
  };

  const handleEdit = (partnership: PartnershipItem) => {
    setSelectedPartnership(partnership);
    setUpdatedName(partnership.name);
    setUpdatedDescription(partnership.description);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedPartnership) return;

    try {
      const response = await updatePartnership({
        id: selectedPartnership.uuid,
        data: {
          name: updatedName,
          description: updatedDescription,
        },
      }).unwrap();

      if (response) {
        toast.success("Partnership updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update partnership");
      console.error("Failed to update partnership:", error);
    }
  };

  const handleDelete = async (partnership: PartnershipItem) => {
    try {
      const response = await deletePartnership(partnership.uuid).unwrap();
      if (response) {
        toast.success("Partnership deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete partnership");
      console.error("Failed to delete partnership:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Partnerships</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-partnership")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Partnership
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
                    <Table.Th className="whitespace-nowrap">
                      Description Preview
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((partnership, index) => (
                      <Table.Tr key={partnership.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {partnership.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {partnership.description.length > 50
                            ? `${partnership.description.substring(0, 50)}...`
                            : partnership.description}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {partnership.images.length > 0 && (
                            <img
                              src={partnership.images[0].image}
                              alt={partnership.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(partnership)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(partnership)}
                              className="text-yellow-500 hover:text-yellow-700"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPartnership(partnership);
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
            <h2 className="text-xl font-bold mb-4">
              {selectedPartnership?.name}
            </h2>

            <div className="mb-4">
              {selectedPartnership?.images?.[0] && (
                <img
                  src={selectedPartnership.images[0].image}
                  alt={selectedPartnership.name}
                  className="w-full h-64 object-contain rounded-lg mb-4"
                />
              )}
            </div>

            <div className="mb-4">
              <strong>Description:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">
                  {selectedPartnership?.description}
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
            <h2 className="text-xl font-bold mb-4">Edit Partnership</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Name*</label>
                <FormInput
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  placeholder="Partnership name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Description*</label>
                <FormTextarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  placeholder="Detailed partnership description"
                  rows={8}
                  required
                />
              </div>

              {selectedPartnership?.images?.[0] && (
                <img
                  src={selectedPartnership.images[0].image}
                  alt={selectedPartnership.name}
                  className="w-full h-64 object-contain rounded-lg mb-4"
                />
              )}

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
                  disabled={isUpdating || !updatedName || !updatedDescription}
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
            <h2 className="text-xl font-bold mb-4">Delete Partnership</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedPartnership?.name}"?
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
                  selectedPartnership && handleDelete(selectedPartnership)
                }
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

export default PartnershipMain;
