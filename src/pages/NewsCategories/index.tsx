import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteNewsCategoryMutation,
  useGetNewsCategoryQuery,
  useUpdateNewsCategoryMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";

type EditFormType = {
  name: string;
  description: string;
};

// Interface for a single news category item
export interface NewsCategory {
  uuid: string;
  name: string;
  description: string;
}

// Interface for the paginated API response
export interface NewsCategoryApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: {
    data: NewsCategory[];
    meta: {
      total: number;
      currentPage: number;
      totalPage: number;
      pageSize: number;
    };
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  };
}

function NewsCategoryMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetNewsCategoryQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateNewsCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteNewsCategoryMutation();

  const navigate = useNavigate();

  const handleView = (category: NewsCategory) => {
    setSelectedCategory(category);
    setViewModal(true);
  };

  const handleDelete = async (category: NewsCategory) => {
    try {
      const response = await deleteCategory(category.uuid).unwrap();
      if (response) {
        toast.success("Category deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error("Failed to delete category:", error);
    }
  };

  const [editForm, setEditForm] = useState<EditFormType>({
    name: "",
    description: "",
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

  const openEditModal = (category: NewsCategory) => {
    setSelectedCategory(category);
    setEditForm({
      name: category.name,
      description: category.description,
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) return;

    try {
      const response = await updateCategory({
        id: selectedCategory.uuid,
        name: editForm.name,
        description: editForm.description,
      }).unwrap();

      if (response) {
        toast.success("Category updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update category");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">News Categories</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-news-category")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
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
                              onClick={() => openEditModal(category)}
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
            <h2 className="text-xl font-bold mb-4">{selectedCategory?.name}</h2>
            <div className="mb-4">
              <strong>Description:</strong>
              <p className="mt-2 whitespace-pre-line">
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

      {/* Edit Modal */}
      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={handleEditSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category Name
                </label>
                <FormInput
                  name="name"
                  type="text"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Category Name"
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
                  placeholder="Category Description"
                  rows={6}
                  required
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
            <h2 className="text-xl font-bold mb-4">Delete Category</h2>
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

export default NewsCategoryMain;
