import { Eye, Trash2, Loader2, Edit, Plus, Download } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeletePublicationsMutation,
  useGetPublicationQuery,
  useUpdatePublicationsMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormLabel,
  FormSwitch,
} from "../../base-components/Form";
import { useGetPublicationCategoriesQuery } from "../../stores/api/apiSlice";
import {
  PublicationApiResponse,
  PublicationCategoryApiResponse,
  PublicationItem,
} from "../../utils/dataTypes";
import { config } from "../../config";
import { Editor } from "@tinymce/tinymce-react";
import Pagination from "../../components/Pagination";

const { EditorKey } = config;

function PublicationMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPublication, setSelectedPublication] =
    useState<PublicationItem | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedSlug, setUpdatedSlug] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetPublicationQuery(currentPage);

  const { data: categoriesResponse } =
    useGetPublicationCategoriesQuery(currentPage);

  const publications = data?.data || [];

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const navigate = useNavigate();

  const [updatePublication, { isLoading: isUpdating }] =
    useUpdatePublicationsMutation();
  const [deletePublication, { isLoading: isDeleting }] =
    useDeletePublicationsMutation();

  const handleView = (publication: PublicationItem) => {
    setSelectedPublication(publication);
    setViewModal(true);
  };

  const handleEdit = (publication: PublicationItem) => {
    setSelectedPublication(publication);
    setUpdatedTitle(publication.title);
    setUpdatedDescription(publication.description);
    setUpdatedCategory(publication.category.uuid);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedPublication) return;

    try {
      const response = await updatePublication({
        id: selectedPublication.uuid,
        data: {
          title: updatedTitle,
          description: updatedDescription,
          category_id: updatedCategory,
        },
      }).unwrap();

      if (response) {
        toast.success("Publication updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update publication");
      console.error("Failed to update publication:", error);
    }
  };

  const handleDelete = async (publication: PublicationItem) => {
    try {
      const response = await deletePublication(publication.uuid).unwrap();
      if (response) {
        toast.success("Publication deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete publication");
      console.error("Failed to delete publication:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Publications</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-publication")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Publication
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
                    <Table.Th className="whitespace-nowrap">Category</Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Published</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    publications.map((publication, index) => (
                      <Table.Tr key={publication.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {publication.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {publication.category.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {publication.image && (
                            <img
                              src={publication.image}
                              alt={publication.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {formatDate(publication.createdAt)}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(publication)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(publication)}
                              className="text-yellow-500 hover:text-yellow-700"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <a
                              href={publication.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-500 hover:text-green-700"
                              title="Download"
                            >
                              <Download className="w-5 h-5" />
                            </a>
                            <button
                              onClick={() => {
                                setSelectedPublication(publication);
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
      <Dialog size="2xl" open={viewModal} onClose={() => setViewModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">
              {selectedPublication?.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Category:</strong>
                <p className="mt-1">{selectedPublication?.category.name}</p>
              </div>
              <div>
                <strong>Published Date:</strong>
                <p className="mt-1">
                  {selectedPublication?.createdAt &&
                    formatDate(selectedPublication.createdAt)}
                </p>
              </div>
            </div>

            {selectedPublication?.image && (
              <div className="mb-4">
                <strong>Image:</strong>
                <div className="mt-2">
                  <img
                    src={selectedPublication.image}
                    alt={selectedPublication.title}
                    className="max-w-full h-auto rounded"
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <strong>Description:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">
                  {selectedPublication?.description}
                </p>
              </div>
            </div>

            {selectedPublication?.file && (
              <div className="mb-4">
                <strong>File:</strong>
                <div className="mt-2">
                  <a
                    href={selectedPublication.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Publication File
                  </a>
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
            <h2 className="text-xl font-bold mb-4">Edit Publication</h2>

            <div className="space-y-4">
              <div>
                <FormLabel htmlFor="title">Title*</FormLabel>
                <FormInput
                  id="title"
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Publication title"
                  required
                />
              </div>

              <div>
                <FormLabel htmlFor="description">Description*</FormLabel>
                <Editor
                  apiKey={EditorKey}
                  value={updatedDescription}
                  onEditorChange={(content: string) =>
                    setUpdatedDescription(content)
                  }
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
                      bullist numlist outdent indent | removeformat | help | image",
                  }}
                />
              </div>

              <div>
                <FormLabel htmlFor="category">Category*</FormLabel>
                <FormSelect
                  id="category"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categoriesResponse?.data.map((category) => (
                    <option key={category.uuid} value={category.uuid}>
                      {category.name}
                    </option>
                  ))}
                </FormSelect>
              </div>

              {selectedPublication?.image && (
                <div>
                  <FormLabel>Current Image</FormLabel>
                  <img
                    src={selectedPublication.image}
                    alt={selectedPublication.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
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
                  disabled={
                    isUpdating ||
                    !updatedTitle ||
                    !updatedDescription ||
                    !updatedCategory
                  }
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
            <h2 className="text-xl font-bold mb-4">Delete Publication</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedPublication?.title}"?
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
                  selectedPublication && handleDelete(selectedPublication)
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

export default PublicationMain;
