import { Eye, Trash2, Loader2, Edit } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import {
  useDeleteNewsLetterMutation,
  useGetNewsLetterQuery,
  useUpdateNewsLetterMutation,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { NewsletterSubscriber } from "../../utils/dataTypes";

// interfaces.ts

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

interface NewsletterData {
  data: NewsletterSubscriber[];
  meta: Meta;
  links: Links;
}

export interface NewsletterApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: NewsletterData;
}

function NewsletterSubscribersMain() {
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<NewsletterSubscriber | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetNewsLetterQuery(currentPage);

  const newsletters = data?.data || [];

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [deleteSubscriber, { isLoading: isDeleting }] =
    useDeleteNewsLetterMutation();

  const navigate = useNavigate();

  const handleView = (subscriber: NewsletterSubscriber) => {
    setSelectedSubscriber(subscriber);
    setViewModal(true);
  };

  const handleDelete = async (subscriber: NewsletterSubscriber) => {
    try {
      const response = await deleteSubscriber(subscriber.uuid).unwrap();
      if (response) {
        toast.success("Subscriber deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete subscriber");
      console.error("Failed to delete subscriber:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">
            Newsletter Subscribers
          </h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-newsletter")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Newsletter
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
                    <Table.Th className="whitespace-nowrap">
                      Subscription Date
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    newsletters.map((subscriber, index) => (
                      <Table.Tr key={subscriber.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {subscriber.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {subscriber.email}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {new Date(
                            subscriber.date_created
                          ).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(subscriber)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedSubscriber(subscriber);
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
            <h2 className="text-xl font-bold mb-4">Subscriber Details</h2>
            <div className="mb-4">
              <strong>Name:</strong>
              <p className="mt-1">{selectedSubscriber?.name}</p>
            </div>
            <div className="mb-4">
              <strong>Email:</strong>
              <p className="mt-1">{selectedSubscriber?.email}</p>
            </div>
            <div className="mb-4">
              <strong>Subscription Date:</strong>
              <p className="mt-1">
                {selectedSubscriber?.date_created &&
                  new Date(
                    selectedSubscriber.date_created
                  ).toLocaleDateString()}
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
            <h2 className="text-xl font-bold mb-4">Delete Subscriber</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedSubscriber?.name}"?
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
                  selectedSubscriber && handleDelete(selectedSubscriber)
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

export default NewsletterSubscribersMain;
