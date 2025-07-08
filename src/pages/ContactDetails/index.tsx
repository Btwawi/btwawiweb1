import { Eye, Trash2, Loader2, Edit, Check, X } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeleteContactDetailsMutation,
  useGetContactDetailsQuery,
  useUpdateContactDetailsMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormTextarea,
  FormSwitch,
} from "../../base-components/Form";
import Pagination from "../../components/Pagination";

// interfaces.ts
export interface ContactDetailItem {
  uuid: string;
  title: string;
  content: string;
  order_no: number;
  active: boolean;
  keyword: string;
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

interface ContactDetailData {
  data: ContactDetailItem[];
  meta: Meta;
  links: Links;
}

export interface ContactDetailApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: ContactDetailData;
}

type EditFormType = {
  title: string;
  content: string;
  order_no: number;
  active: boolean;
  keyword: string;
};

function ContactDetailsMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedContactDetail, setSelectedContactDetail] =
    useState<ContactDetailItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetContactDetailsQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateContactDetail, { isLoading: isUpdating }] =
    useUpdateContactDetailsMutation();
  const [deleteContactDetail, { isLoading: isDeleting }] =
    useDeleteContactDetailsMutation();

  const navigate = useNavigate();

  const [editForm, setEditForm] = useState<EditFormType>({
    title: "",
    content: "",
    order_no: 0,
    active: false,
    keyword: "",
  });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setEditForm((prev) => ({
      ...prev,
      active: checked,
    }));
  };

  const openEditModal = (contactDetail: ContactDetailItem) => {
    setSelectedContactDetail(contactDetail);
    setEditForm({
      title: contactDetail.title,
      content: contactDetail.content,
      order_no: contactDetail.order_no,
      active: contactDetail.active,
      keyword: contactDetail.keyword,
    });
    setEditModal(true);
  };

  const handleView = (contactDetail: ContactDetailItem) => {
    setSelectedContactDetail(contactDetail);
    setViewModal(true);
  };

  const handleDelete = async (contactDetail: ContactDetailItem) => {
    try {
      const response = await deleteContactDetail(contactDetail.uuid).unwrap();
      if (response) {
        toast.success("Contact detail deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete contact detail");
      console.error("Failed to delete contact detail:", error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedContactDetail) return;

    try {
      const response = await updateContactDetail({
        id: selectedContactDetail.uuid,
        data: editForm,
      }).unwrap();

      if (response) {
        toast.success("Contact detail updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update contact detail");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Contact Details</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-contact-details")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Contact Detail
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
                    <Table.Th className="whitespace-nowrap">Keyword</Table.Th>
                    <Table.Th className="whitespace-nowrap">Order</Table.Th>
                    <Table.Th className="whitespace-nowrap">Status</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((contactDetail, index) => (
                      <Table.Tr key={contactDetail.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {contactDetail.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {contactDetail.keyword}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {contactDetail.order_no}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {contactDetail.active ? (
                            <span className="flex items-center text-success">
                              <Check className="w-4 h-4 mr-1" /> Active
                            </span>
                          ) : (
                            <span className="flex items-center text-danger">
                              <X className="w-4 h-4 mr-1" /> Inactive
                            </span>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(contactDetail)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(contactDetail)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedContactDetail(contactDetail);
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
            <h2 className="text-xl font-bold mb-4">
              {selectedContactDetail?.title}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Keyword:</strong>
                <p className="mt-1">{selectedContactDetail?.keyword}</p>
              </div>
              <div>
                <strong>Order:</strong>
                <p className="mt-1">{selectedContactDetail?.order_no}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <p className="mt-1">
                  {selectedContactDetail?.active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <strong>Content:</strong>
              <div className="mt-2 p-3 bg-slate-50 rounded-md">
                <p className="whitespace-pre-line">
                  {selectedContactDetail?.content}
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
            <h2 className="text-xl font-bold mb-4">Edit Contact Detail</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Title
                </label>
                <FormInput
                  id="title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="keyword"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Keyword
                </label>
                <FormInput
                  id="keyword"
                  name="keyword"
                  type="text"
                  value={editForm.keyword}
                  onChange={handleEditChange}
                  placeholder="Enter keyword"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="order_no"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Order Number
                </label>
                <FormInput
                  id="order_no"
                  name="order_no"
                  type="number"
                  value={editForm.order_no}
                  onChange={handleEditChange}
                  placeholder="Enter order number"
                  required
                />
              </div>

              <div className="mb-4 flex items-center">
                <label
                  htmlFor="active"
                  className="mr-3 font-medium text-sm text-gray-700"
                >
                  Active:
                </label>
                <FormSwitch>
                  <FormSwitch.Input
                    id="active"
                    type="checkbox"
                    checked={editForm.active}
                    onChange={() => handleSwitchChange(!editForm.active)}
                  />
                </FormSwitch>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Content
                </label>
                <FormTextarea
                  id="content"
                  name="content"
                  value={editForm.content}
                  onChange={handleEditChange}
                  placeholder="Enter content"
                  rows={8}
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
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Contact Detail</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedContactDetail?.title}"?
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
                  selectedContactDetail && handleDelete(selectedContactDetail)
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

export default ContactDetailsMain;
