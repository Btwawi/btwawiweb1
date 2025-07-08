import { Eye, Trash2, Loader2, Edit, Plus } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeletePositionMutation,
  useGetPositionQuery,
  useUpdatePositionMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../base-components/Form";
import { useGetCareerVolunteerQuery } from "../../stores/api/apiSlice";
import Pagination from "../../components/Pagination";

// Interfaces
export interface PositionCategory {
  uuid: string;
  name: string;
  description: string;
}

export interface PositionItem {
  uuid: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  position_category_id: string;
  date_created: string;
  category: PositionCategory;
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

interface PositionData {
  data: PositionItem[];
  meta: Meta;
  links: Links;
}

export interface PositionApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: PositionData;
}

export interface CareerVolunteerResponse {
  status: string;
  statusCode: number;
  message: string;
  data: {
    data: PositionCategory[];
    meta: Meta;
    links: Links;
  };
}

function PositionMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedPosition, setSelectedPosition] = useState<PositionItem | null>(
    null
  );
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedRequirements, setUpdatedRequirements] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedJobType, setUpdatedJobType] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  const { data, isLoading, isFetching, refetch } =
    useGetPositionQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const { data: categoriesResponse } = useGetCareerVolunteerQuery(currentPage);
  const navigate = useNavigate();

  const [updatePosition, { isLoading: isUpdating }] =
    useUpdatePositionMutation();
  const [deletePosition, { isLoading: isDeleting }] =
    useDeletePositionMutation();

  const handleView = (position: PositionItem) => {
    setSelectedPosition(position);
    setViewModal(true);
  };

  const handleEdit = (position: PositionItem) => {
    setSelectedPosition(position);
    setUpdatedTitle(position.title);
    setUpdatedDescription(position.description);
    setUpdatedRequirements(position.requirements);
    setUpdatedLocation(position.location);
    setUpdatedJobType(position.job_type);
    setUpdatedCategory(position.position_category_id);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedPosition) return;

    try {
      const response = await updatePosition({
        id: selectedPosition.uuid,
        data: {
          title: updatedTitle,
          description: updatedDescription,
          requirements: updatedRequirements,
          location: updatedLocation,
          job_type: updatedJobType,
          position_category_id: updatedCategory,
        },
      }).unwrap();

      if (response) {
        toast.success("Position updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update position");
      console.error("Failed to update position:", error);
    }
  };

  const handleDelete = async (position: PositionItem) => {
    try {
      const response = await deletePosition(position.uuid).unwrap();
      if (response) {
        toast.success("Position deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete position");
      console.error("Failed to delete position:", error);
    }
  };

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Temporary",
  ];

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Positions</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-positions")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Position
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
                    <Table.Th className="whitespace-nowrap">Location</Table.Th>
                    <Table.Th className="whitespace-nowrap">Job Type</Table.Th>
                    <Table.Th className="whitespace-nowrap">Posted</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((position, index) => (
                      <Table.Tr key={position.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {position.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {position.category.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {position.location}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {position.job_type}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {new Date(position.date_created).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(position)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(position)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPosition(position);
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
            <h2 className="text-xl font-bold mb-4">
              {selectedPosition?.title}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Category:</strong>
                <p className="mt-1">{selectedPosition?.category.name}</p>
              </div>
              <div>
                <strong>Location:</strong>
                <p className="mt-1">{selectedPosition?.location}</p>
              </div>
              <div>
                <strong>Job Type:</strong>
                <p className="mt-1">{selectedPosition?.job_type}</p>
              </div>
              <div>
                <strong>Posted:</strong>
                <p className="mt-1">
                  {selectedPosition?.date_created &&
                    new Date(
                      selectedPosition.date_created
                    ).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <strong>Description:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">
                  {selectedPosition?.description}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <strong>Requirements:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">
                  {selectedPosition?.requirements}
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
            <h2 className="text-xl font-bold mb-4">Edit Position</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title*</label>
                <FormInput
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Position title"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Description*</label>
                <FormTextarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  placeholder="Detailed position description"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Requirements*</label>
                <FormTextarea
                  value={updatedRequirements}
                  onChange={(e) => setUpdatedRequirements(e.target.value)}
                  placeholder="Required qualifications and skills"
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Location*</label>
                  <FormInput
                    type="text"
                    value={updatedLocation}
                    onChange={(e) => setUpdatedLocation(e.target.value)}
                    placeholder="e.g., Lagos, Nigeria"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Job Type*</label>
                  <FormSelect
                    value={updatedJobType}
                    onChange={(e) => setUpdatedJobType(e.target.value)}
                    required
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </FormSelect>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Category*</label>
                <FormSelect
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
                  disabled={
                    isUpdating ||
                    !updatedTitle ||
                    !updatedDescription ||
                    !updatedRequirements ||
                    !updatedLocation ||
                    !updatedJobType ||
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
            <h2 className="text-xl font-bold mb-4">Delete Position</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedPosition?.title}"?
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
                  selectedPosition && handleDelete(selectedPosition)
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

export default PositionMain;
