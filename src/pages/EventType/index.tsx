import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteEventTypesMutation,
  useGetEventTypesQuery,
  useUpdateEventTypesMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";

// interfaces.ts
export interface EventType {
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

interface EventTypeData {
  data: EventType[];
  meta: Meta;
  links: Links;
}

export interface EventTypeApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: EventTypeData;
}

type EditFormType = {
  name: string;
  description: string;
};

function EventTypeMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetEventTypesQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateEventType, { isLoading: isUpdating }] =
    useUpdateEventTypesMutation();
  const [deleteEventType, { isLoading: isDeleting }] =
    useDeleteEventTypesMutation();

  const navigate = useNavigate();

  const handleView = (eventType: EventType) => {
    setSelectedEventType(eventType);
    setViewModal(true);
  };

  const handleDelete = async (eventType: EventType) => {
    try {
      const response = await deleteEventType(eventType.uuid).unwrap();
      if (response) {
        toast.success("Event type deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete event type");
      console.error("Failed to delete event type:", error);
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

  const openEditModal = (eventType: EventType) => {
    setSelectedEventType(eventType);
    setEditForm({
      name: eventType.name,
      description: eventType.description,
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEventType) return;

    try {
      const response = await updateEventType({
        id: selectedEventType.uuid,
        data: {
          name: editForm.name,
          description: editForm.description,
        },
      }).unwrap();

      if (response) {
        toast.success("Event type updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update event type");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Event Types</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-event-type")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Event Type
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
                    data?.data.map((eventType, index) => (
                      <Table.Tr key={eventType.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {eventType.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {eventType.description.length > 50
                            ? `${eventType.description.substring(0, 50)}...`
                            : eventType.description}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(eventType)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(eventType)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEventType(eventType);
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
        open={viewModal}
        onClose={() => setViewModal(false)}
        className="relative z-50"
        size="2xl"
      >
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="flex flex-col gap-3">
            <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold mb-4">
                {selectedEventType?.name}
              </h2>
              <div className="mb-4">
                <strong>Description:</strong>
                <p className="mt-2 whitespace-pre-line">
                  {selectedEventType?.description || "No description available"}
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
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Edit Modal */}
      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Event Type</h2>
            <form onSubmit={handleEditSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="eventTypeName"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Event Type Name
                </label>
                <FormInput
                  id="eventTypeName"
                  name="name"
                  type="text"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Enter event type name"
                  className="w-full"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label
                  htmlFor="eventTypeDescription"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <FormTextarea
                  id="eventTypeDescription"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Enter event type description"
                  rows={6}
                  className="w-full"
                />
              </div>

              {/* Form Actions */}
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
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Event Type</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedEventType?.name}"?
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
                  selectedEventType && handleDelete(selectedEventType)
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

export default EventTypeMain;
