import { Eye, Trash2, Loader2, Edit } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeleteContactFormsMutation,
  useGetContactFormsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormInput, FormTextarea } from "../../base-components/Form";
import Pagination from "../../components/Pagination";
import { ContactFormItem } from "../../utils/dataTypes";

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

interface ContactFormData {
  data: ContactFormItem[];
  meta: Meta;
  links: Links;
}

export interface ContactFormApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: ContactFormData;
}

type EditFormType = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function ContactFormMain() {
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedContactForm, setSelectedContactForm] =
    useState<ContactFormItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, isFetching, refetch } =
    useGetContactFormsQuery(currentPage);

  const contacts = data?.data || [];

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [editForm, setEditForm] = useState<EditFormType>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [deleteContactForm, { isLoading: isDeleting }] =
    useDeleteContactFormsMutation();

  const navigate = useNavigate();

  const handleView = (contactForm: ContactFormItem) => {
    setSelectedContactForm(contactForm);
    setViewModal(true);
  };

  const handleDelete = async (contactForm: ContactFormItem) => {
    try {
      const response = await deleteContactForm(contactForm.uuid).unwrap();
      if (response) {
        toast.success("Contact form deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete contact form");
      console.error("Failed to delete contact form:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Contact Forms</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-contact-form")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Contact Forms
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
                    <Table.Th className="whitespace-nowrap">Email</Table.Th>
                    <Table.Th className="whitespace-nowrap">Subject</Table.Th>
                    <Table.Th className="whitespace-nowrap">Date</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    contacts.map((contactForm, index) => (
                      <Table.Tr key={contactForm.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {contactForm.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {contactForm.email}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {contactForm.subject.length > 30
                            ? `${contactForm.subject.substring(0, 30)}...`
                            : contactForm.subject}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {new Date(
                            contactForm.date_created
                          ).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(contactForm)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedContactForm(contactForm);
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
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Contact Form Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Name:</strong>
                <p className="mt-1">{selectedContactForm?.name}</p>
              </div>
              <div>
                <strong>Email:</strong>
                <p className="mt-1">{selectedContactForm?.email}</p>
              </div>
              <div>
                <strong>Phone:</strong>
                <p className="mt-1">{selectedContactForm?.phone || "N/A"}</p>
              </div>
              <div>
                <strong>Date:</strong>
                <p className="mt-1">
                  {selectedContactForm?.date_created &&
                    new Date(
                      selectedContactForm.date_created
                    ).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <strong>Subject:</strong>
              <p className="mt-1">{selectedContactForm?.subject}</p>
            </div>
            <div className="mb-4">
              <strong>Message:</strong>
              <p className="mt-2 whitespace-pre-line">
                {selectedContactForm?.message}
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

      {/* Delete Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Contact Form</h2>
            <p className="mb-6">
              Are you sure you want to delete the contact form from "
              {selectedContactForm?.name}"?
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
                  selectedContactForm && handleDelete(selectedContactForm)
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

export default ContactFormMain;
