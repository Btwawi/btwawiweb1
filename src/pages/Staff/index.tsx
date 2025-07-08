// pages/StaffMain.tsx
import {
  Edit,
  Eye,
  Loader2,
  Trash2,
  User,
  Briefcase,
  Award,
} from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteStaffsMutation,
  useGetStaffsQuery,
  useUpdateStaffsMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import toast from "react-hot-toast";
import {
  StaffApiResponse,
  StaffFormType,
  StaffItem,
} from "../../utils/dataTypes";
import FileDropzone from "../../components/Dragzone";
import Pagination from "../../components/Pagination";

function StaffMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetStaffsQuery(currentPage);
  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;
  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffsMutation();
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffsMutation();

  const navigate = useNavigate();

  const handleView = (staff: StaffItem) => {
    setSelectedStaff(staff);
    setViewModal(true);
  };

  const handleDelete = async (staff: StaffItem) => {
    try {
      const response = await deleteStaff(staff.uuid).unwrap();
      if (response) {
        toast.success("Staff deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete staff");
      console.error("Failed to delete staff:", error);
    }
  };

  const [editForm, setEditForm] = useState<StaffFormType>({
    name: "",
    position: "",
    field: "",
    image: null,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditForm((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const openEditModal = (staff: StaffItem) => {
    setSelectedStaff(staff);
    setEditForm({
      name: staff.name,
      position: staff.position,
      field: staff.field,
      image: staff.image,
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStaff) return;

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("position", editForm.position);
      formData.append("field", editForm.field);
      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updateStaff({
        id: selectedStaff.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Staff updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update staff");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Staff Members</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-staffs")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Staff
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
                    <Table.Th className="whitespace-nowrap">Position</Table.Th>
                    <Table.Th className="whitespace-nowrap">Field</Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((staff, index) => (
                      <Table.Tr key={staff.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {staff.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {staff.position}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {staff.field}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {staff.image && (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="Staff"
                                className="rounded-full"
                                src={staff.image}
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(staff)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(staff)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStaff(staff);
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
        size="xl"
        open={viewModal}
        onClose={() => setViewModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
      >
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              {selectedStaff?.image && (
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={selectedStaff.image}
                    alt={selectedStaff.name}
                    className="w-48 h-48 rounded-full object-cover"
                  />
                </div>
              )}
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-bold mb-4">
                  {selectedStaff?.name}
                </h2>

                <div className="space-y-4">
                  <div>
                    <strong className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" /> Position:
                    </strong>
                    <p className="mt-1">{selectedStaff?.position}</p>
                  </div>

                  <div>
                    <strong className="flex items-center">
                      <Award className="w-4 h-4 mr-2" /> Field:
                    </strong>
                    <p className="mt-1">{selectedStaff?.field}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right mt-6">
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

      <Dialog size="xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Staff Member</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="name"
                  type="text"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Full Name"
                  required
                />

                <FormInput
                  name="position"
                  type="text"
                  value={editForm.position}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Position"
                  required
                />

                <FormInput
                  name="field"
                  type="text"
                  value={editForm.field}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Field of Expertise"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Image</label>
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
                <p className="text-xs text-slate-500 mt-1">
                  Supported formats: JPEG, JPG, PNG, WEBP (Max 5MB)
                </p>
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
            <h2 className="text-xl font-bold mb-4">Delete Staff Member</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedStaff?.name}"?
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
                onClick={() => selectedStaff && handleDelete(selectedStaff)}
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

export default StaffMain;
