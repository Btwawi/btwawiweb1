import { Eye, Trash2, Loader2, Edit } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeleteSocialMediaMutation,
  useGetSocialMediaQuery,
  useUpdateSocialMediaMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../base-components/Form";
import Pagination from "../../components/Pagination";

// Interfaces
export interface SocialMediaItem {
  uuid: string;
  name: string;
  link: string;
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

interface SocialMediaData {
  data: SocialMediaItem[];
  meta: Meta;
  links: Links;
}

export interface SocialMediaApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: SocialMediaData;
}

function SocialMediaMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] =
    useState<SocialMediaItem | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedLink, setUpdatedLink] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetSocialMediaQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateSocialMedia, { isLoading: isUpdating }] =
    useUpdateSocialMediaMutation();
  const [deleteSocialMedia, { isLoading: isDeleting }] =
    useDeleteSocialMediaMutation();
  const navigate = useNavigate();

  const handleView = (socialMedia: SocialMediaItem) => {
    setSelectedSocialMedia(socialMedia);
    setViewModal(true);
  };

  const handleEdit = (socialMedia: SocialMediaItem) => {
    setSelectedSocialMedia(socialMedia);
    setUpdatedName(socialMedia.name);
    setUpdatedLink(socialMedia.link);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedSocialMedia) return;

    try {
      const response = await updateSocialMedia({
        id: selectedSocialMedia.uuid,
        data: {
          name: updatedName,
          link: updatedLink,
        },
      }).unwrap();

      if (response) {
        toast.success("Social media updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update social media");
      console.error("Failed to update social media:", error);
    }
  };

  const handleDelete = async (socialMedia: SocialMediaItem) => {
    try {
      const response = await deleteSocialMedia(socialMedia.uuid).unwrap();
      if (response) {
        toast.success("Social media deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete social media");
      console.error("Failed to delete social media:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Social Media</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-social-medias")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Social Media
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
                    <Table.Th className="whitespace-nowrap">Link</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((socialMedia, index) => (
                      <Table.Tr key={socialMedia.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {socialMedia.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <a
                            href={socialMedia.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {socialMedia.link}
                          </a>
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(socialMedia)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(socialMedia)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSocialMedia(socialMedia);
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
            <h2 className="text-xl font-bold mb-4">Social Media Details</h2>
            <div className="mb-4">
              <strong>Name:</strong>
              <p className="mt-1">{selectedSocialMedia?.name}</p>
            </div>
            <div className="mb-4">
              <strong>Link:</strong>
              <p className="mt-1">
                <a
                  href={selectedSocialMedia?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {selectedSocialMedia?.link}
                </a>
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold mb-4">Edit Social Media</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name</label>
              <FormInput
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Social media name"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Link</label>
              <FormInput
                type="url"
                value={updatedLink}
                onChange={(e) => setUpdatedLink(e.target.value)}
                placeholder="https://example.com"
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
                disabled={isUpdating}
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
            <h2 className="text-xl font-bold mb-4">Delete Social Media</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedSocialMedia?.name}"?
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
                  selectedSocialMedia && handleDelete(selectedSocialMedia)
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

export default SocialMediaMain;
