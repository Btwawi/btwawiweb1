import { Edit, Eye, Trash2, Loader2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteEventsMutation,
  useGetEventsQuery,
  useUpdateEventsMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import { useGetEventTypesQuery } from "../../stores/api/apiSlice";
import FileDropzone from "../../components/Dragzone";
import { Editor } from "@tinymce/tinymce-react";
import { config } from "../../config";
import Pagination from "../../components/Pagination";
import Lucide from "../../base-components/Lucide";
import { truncateHtml } from "../../services/utility";
import { EventItem } from "../../utils/dataTypes";

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

interface EventData {
  data: EventItem[];
  meta: Meta;
  links: Links;
}

interface EventApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: EventData;
}

type EditFormType = {
  title: string;
  date: string;
  location: string;
  topic: string;
  description: string;
  event_type: string;
  image: string | File | null;
};

interface EventTypesData {
  data: EventType[];
  meta: Meta;
  links: Links;
}

interface EventTypesResponse {
  status: string;
  statusCode: number;
  message: string;
  data: EventTypesData;
}

const { EditorKey } = config;

function EventMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading, isFetching, refetch } =
    useGetEventsQuery(currentPage);

  const { data: eventTypesData } = useGetEventTypesQuery(currentPage);

  const events = data?.data || [];

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const filteredNews = events.filter((member) => {
    const nameMatch = member.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by category if selected
    const categoryMatch =
      selectedCategory === "" || member.event_type?.uuid === selectedCategory;

    return nameMatch && categoryMatch;
  });

  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventsMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventsMutation();

  const navigate = useNavigate();

  const handleView = (event: EventItem) => {
    setSelectedEvent(event);
    setViewModal(true);
  };

  const handleDelete = async (event: EventItem) => {
    try {
      const response = await deleteEvent(event.uuid).unwrap();
      if (response) {
        toast.success("Event deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete event");
      console.error("Failed to delete event:", error);
    }
  };

  const [editForm, setEditForm] = useState<EditFormType>({
    title: "",
    date: "",
    location: "",
    topic: "",
    description: "",
    event_type: "",
    image: null,
  });

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditModal = (event: EventItem) => {
    setSelectedEvent(event);
    setEditForm({
      title: event.title,
      date: event.date.split("T")[0],
      location: event.location,
      topic: event.topic,
      description: event.description,
      event_type: event.event_type.uuid,
      image: event.image, // This will be a string URL initially
    });
    setEditModal(true);
  };

  const handleEditorChange = (content: string) => {
    setEditForm((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent) return;

    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("date", editForm.date);
      formData.append("location", editForm.location);
      formData.append("topic", editForm.topic);
      formData.append("description", editForm.description);
      formData.append("event_type_id", editForm.event_type);

      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updateEvent({
        id: selectedEvent.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Event updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      console.error("Full error:", error);
      toast.error("Failed to update event");
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Events</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-event")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Event
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:justify-between pl-4 pr-4 sm:items-center sm:gap-6 ">
          <div className="relative w-full sm:w-64">
            <FormInput
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10"
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 left-0 w-4 h-4 my-auto ml-3 text-slate-400"
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full form-select"
            >
              <option value="">All Categories</option>
              {Array.from(
                new Set(data?.data?.map((member) => member.event_type?.uuid))
              ).map((categoryId) => {
                const category = data?.data?.find(
                  (member) => member.event_type?.uuid === categoryId
                )?.event_type;
                return (
                  <option key={categoryId} value={categoryId}>
                    {category?.name || "Uncategorized"}
                  </option>
                );
              })}
            </select>
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
                    <Table.Th className="whitespace-nowrap">Date</Table.Th>
                    <Table.Th className="whitespace-nowrap">Location</Table.Th>
                    <Table.Th className="whitespace-nowrap">
                      Event Type
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    filteredNews.map((event, index) => (
                      <Table.Tr key={event.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {event.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {new Date(event.date).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {event.location}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {event.event_type?.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {event.image && (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="Event"
                                className="rounded-full"
                                src={event.image}
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(event)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(event)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEvent(event);
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
            <h2 className="text-xl font-bold mb-4">{selectedEvent?.title}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Date:</strong>
                <p className="mt-1">
                  {selectedEvent?.date &&
                    new Date(selectedEvent.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <strong>Location:</strong>
                <p className="mt-1">{selectedEvent?.location}</p>
              </div>
              <div>
                <strong>Event Type:</strong>
                <p className="mt-1">{selectedEvent?.event_type?.name || ""}</p>
              </div>
              <div>
                <strong>Created:</strong>
                <p className="mt-1">
                  {selectedEvent?.date_created &&
                    new Date(selectedEvent.date_created).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <strong>Topic:</strong>
              <p className="mt-1">{selectedEvent?.topic}</p>
            </div>
            <div className="mb-4">
              <strong>Description:</strong>
              <p className="mt-2 whitespace-pre-line">
                {truncateHtml(selectedEvent?.description || "")}
              </p>
            </div>
            {selectedEvent?.image && (
              <div className="mb-6">
                <strong>Image:</strong>
                <div className="mt-2">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
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
                type="button"
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
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleEditSubmit}>
              {/* Event Title */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <FormInput
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Enter event title"
                  required
                />
              </div>

              {/* Event Date */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Event Date
                </label>
                <FormInput
                  name="date"
                  type="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  required
                />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location
                </label>
                <FormInput
                  name="location"
                  type="text"
                  value={editForm.location}
                  onChange={handleEditChange}
                  placeholder="Enter event location"
                  required
                />
              </div>

              {/* Topic */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Topic
                </label>
                <FormInput
                  name="topic"
                  type="text"
                  value={editForm.topic}
                  onChange={handleEditChange}
                  placeholder="Enter event topic"
                  required
                />
              </div>

              {/* Event Type */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select
                  name="event_type"
                  value={editForm.event_type}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select an event type</option>
                  {eventTypesData?.data.map((type) => (
                    <option key={type.uuid} value={type.uuid}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description - Rich Text Editor */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description (Rich Text)
                </label>
                <Editor
                  apiKey={EditorKey}
                  value={editForm.description}
                  onEditorChange={handleEditorChange}
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

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Event Image
                </label>
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
                    maxSize={5 * 1024 * 1024} // 5MB
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    JPEG, PNG, or JPG (Max 5MB)
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
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Event</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedEvent?.title}"?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline-secondary"
                onClick={() => setDeleteModal(false)}
                className="w-24"
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => selectedEvent && handleDelete(selectedEvent)}
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

export default EventMain;
