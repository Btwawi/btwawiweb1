import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeletePublicationCategoriesMutation,
  useGetPublicationCategoriesQuery,
  useUpdatePublicationCategoriesMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { FormInput, FormTextarea } from "../../base-components/Form";
import { Link, useNavigate } from "react-router-dom";
import {
  PublicationCategory,
  PublicationCategoryApiResponse,
} from "../../utils/dataTypes";
import Pagination from "../../components/Pagination";

function PublicationCategoryMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<PublicationCategory | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } =
    useGetPublicationCategoriesQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdatePublicationCategoriesMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeletePublicationCategoriesMutation();

  const handleView = (category: PublicationCategory) => {
    setSelectedCategory(category);
    setViewModal(true);
  };

  const handleEdit = (category: PublicationCategory) => {
    setSelectedCategory(category);
    setUpdatedName(category.name);
    setUpdatedType(category.type);
    setUpdatedDescription(category.description || "");
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;

    try {
      const response = await updateCategory({
        id: selectedCategory.uuid,
        data: {
          name: updatedName,
          type: updatedType,
          description: updatedDescription || null,
        },
      }).unwrap();

      if (response) {
        toast.success("Publication category updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update publication category");
      console.error("Failed to update publication category:", error);
    }
  };

  const handleDelete = async (category: PublicationCategory) => {
    try {
      const response = await deleteCategory(category.uuid).unwrap();
      if (response) {
        toast.success("Publication category deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete publication category");
      console.error("Failed to delete publication category:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">
            Publication Categories
          </h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-publication-category")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
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
                    <Table.Th className="whitespace-nowrap">Type</Table.Th>
                    <Table.Th className="whitespace-nowrap">
                      Description
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((category, index) => (
                      <Table.Tr key={category.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {category.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {category.type}
                        </Table.Td>

                        <Table.Td className="whitespace-nowrap">
                          {category.description &&
                          category.description.length > 50
                            ? `${category.description.substring(0, 50)}...`
                            : category.description || "N/A"}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(category)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(category)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCategory(category);
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
            <h2 className="text-xl font-bold mb-4">Category Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Name:</strong>
                <p className="mt-1">{selectedCategory?.name}</p>
              </div>
              <div>
                <strong>Type:</strong>
                <p className="mt-1">{selectedCategory?.type}</p>
              </div>
              <div className="md:col-span-2">
                <strong>Description:</strong>
                <p className="mt-1 whitespace-pre-line">
                  {selectedCategory?.description || "N/A"}
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Edit Publication Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-medium">Name</label>
                <FormInput
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  placeholder="Publication category name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Type</label>
                <FormInput
                  type="text"
                  value={updatedType}
                  onChange={(e) => setUpdatedType(e.target.value)}
                  placeholder="Publication type"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Description</label>
              <FormTextarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="Description of the publication category"
                rows={4}
              />
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
                onClick={handleUpdate}
                className="w-24"
                disabled={isUpdating || !updatedName || !updatedType}
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
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Delete Publication Category
            </h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedCategory?.name}"?
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
                  selectedCategory && handleDelete(selectedCategory)
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

export default PublicationCategoryMain;
