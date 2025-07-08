import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeleteCollaborationsMutation,
  useGetCollaborationsQuery,
  useUpdateCollaborationsMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormInput, FormTextarea } from "../../base-components/Form";
import {
  CollaborationItem,
  CollaborationApiResponse,
} from "../../utils/dataTypes";
import Pagination from "../../components/Pagination";

function CollaborationMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCollaboration, setSelectedCollaboration] =
    useState<CollaborationItem | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetCollaborationsQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateCollaboration, { isLoading: isUpdating }] =
    useUpdateCollaborationsMutation();
  const [deleteCollaboration, { isLoading: isDeleting }] =
    useDeleteCollaborationsMutation();
  const navigate = useNavigate();

  const handleView = (collaboration: CollaborationItem) => {
    setSelectedCollaboration(collaboration);
    setViewModal(true);
  };

  const handleEdit = (collaboration: CollaborationItem) => {
    setSelectedCollaboration(collaboration);
    setUpdatedTitle(collaboration.title);
    setUpdatedContent(collaboration.content);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedCollaboration) return;

    try {
      const response = await updateCollaboration({
        id: selectedCollaboration.uuid,
        data: {
          title: updatedTitle,
          content: updatedContent,
        },
      }).unwrap();

      if (response) {
        toast.success("Collaboration updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update collaboration");
      console.error("Failed to update collaboration:", error);
    }
  };

  const handleDelete = async (collaboration: CollaborationItem) => {
    try {
      const response = await deleteCollaboration(collaboration.uuid).unwrap();
      if (response) {
        toast.success("Collaboration deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete collaboration");
      console.error("Failed to delete collaboration:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Collaborations</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-collaboration")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Collaboration
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
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((collaboration, index) => (
                      <Table.Tr key={collaboration.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {collaboration.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {collaboration.content.length > 50
                            ? `${collaboration.content.substring(0, 50)}...`
                            : collaboration.content}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(collaboration)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(collaboration)}
                              className="text-yellow-500 hover:text-yellow-700"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCollaboration(collaboration);
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
              {selectedCollaboration?.title}
            </h2>

            <div className="mb-4">
              <strong>Content:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">
                  {selectedCollaboration?.content}
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
            <h2 className="text-xl font-bold mb-4">Edit Collaboration</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title*</label>
                <FormInput
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Collaboration title"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content*</label>
                <FormTextarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  placeholder="Detailed collaboration content"
                  rows={8}
                  required
                />
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
                  disabled={isUpdating || !updatedTitle || !updatedContent}
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
            <h2 className="text-xl font-bold mb-4">Delete Collaboration</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedCollaboration?.title}"?
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
                  selectedCollaboration && handleDelete(selectedCollaboration)
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

export default CollaborationMain;
