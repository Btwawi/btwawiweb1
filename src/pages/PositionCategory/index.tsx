import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useCreateCareerVolunteerMutation,
  useDeleteCareerVolunteerMutation,
  useGetCareerVolunteerQuery,
  useUpdateCareerVolunteerMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { FormInput, FormTextarea } from "../../base-components/Form";
import Pagination from "../../components/Pagination";

// Interfaces
export interface PositionCategory {
  uuid: string;
  name: string;
  description: string;
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

interface PositionCategoryData {
  data: PositionCategory[];
  meta: Meta;
  links: Links;
}

interface PositionCategoryApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: PositionCategoryData;
}

function PositionCategoryMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<PositionCategory | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetCareerVolunteerQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [createCategory, { isLoading: isCreating }] =
    useCreateCareerVolunteerMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCareerVolunteerMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCareerVolunteerMutation();

  const handleView = (category: PositionCategory) => {
    setSelectedCategory(category);
    setViewModal(true);
  };

  const handleEdit = (category: PositionCategory) => {
    setSelectedCategory(category);
    setUpdatedName(category.name);
    setUpdatedDescription(category.description);
    setEditModal(true);
  };

  const handleCreate = async () => {
    try {
      const response = await createCategory({
        name: newName,
        description: newDescription,
      }).unwrap();

      if (response) {
        toast.success("Position category created successfully!");
        setCreateModal(false);
        setNewName("");
        setNewDescription("");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to create position category");
      console.error("Failed to create position category:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;

    try {
      const response = await updateCategory({
        id: selectedCategory.uuid,
        data: {
          name: updatedName,
          description: updatedDescription,
        },
      }).unwrap();

      if (response) {
        toast.success("Position category updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update position category");
      console.error("Failed to update position category:", error);
    }
  };

  const handleDelete = async (category: PositionCategory) => {
    try {
      const response = await deleteCategory(category.uuid).unwrap();
      if (response) {
        toast.success("Position category deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete position category");
      console.error("Failed to delete position category:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Position Categories</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => setCreateModal(true)}
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
                          {category.description.length > 50
                            ? `${category.description.substring(0, 50)}...`
                            : category.description}
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
            <div className="mb-4">
              <strong>Name:</strong>
              <p className="mt-1">{selectedCategory?.name}</p>
            </div>
            <div className="mb-4">
              <strong>Description:</strong>
              <p className="mt-1 whitespace-pre-line">
                {selectedCategory?.description}
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

      {/* Create Modal */}
      <Dialog open={createModal} onClose={() => setCreateModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Add New Position Category
            </h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name</label>
              <FormInput
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Intern, Manager"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Description</label>
              <FormTextarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Describe the position category"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline-secondary"
                onClick={() => setCreateModal(false)}
                className="w-24"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreate}
                className="w-24"
                disabled={isCreating || !newName || !newDescription}
              >
                {isCreating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Edit Modal */}
      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Position Category</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name</label>
              <FormInput
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Position category name"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Description</label>
              <FormTextarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="Description of the position category"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
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
        </Dialog.Panel>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Position Category</h2>
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

export default PositionCategoryMain;
