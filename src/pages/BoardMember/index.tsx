import { Edit, Eye, Trash2, Loader2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBoardMemberMutation,
  useGetBoardMemberQuery,
  useUpdateBoardMemberMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import Lucide from "../../base-components/Lucide";
import Pagination from "../../components/Pagination";

export interface SocialLinks {
  twitter: string;
  facebook: string;
  linkedin: string;
}

export interface Category {
  uuid: string;
  name: string;
  description: string;
}

export interface BoardMember {
  uuid: string;
  name: string;
  position: string;
  about: string;
  socialLinks: SocialLinks;
  image: string;
  category: Category;
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

interface BoardMemberData {
  data: BoardMember[];
  meta: Meta;
  links: Links;
}

interface BoardMemberApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: BoardMemberData;
}

type EditFormType = {
  name: string;
  position: string;
  about: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  category: string;
  image: string | File | null;
};

function BoardMemberMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBoardMember, setSelectedBoardMember] =
    useState<BoardMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading, isFetching, refetch } =
    useGetBoardMemberQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const boardMem = data?.data || [];

  const filteredMembers = boardMem?.filter((member: any) => {
    const nameMatch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by category if selected
    const categoryMatch =
      selectedCategory === "" || member.category?.uuid === selectedCategory;

    return nameMatch && categoryMatch;
  });

  const [updateBoardMember, { isLoading: isUpdating }] =
    useUpdateBoardMemberMutation();
  const [deleteBoardMember, { isLoading: isDeleting }] =
    useDeleteBoardMemberMutation();

  const navigate = useNavigate();

  // Loading state for the entire component
  const loading = isLoading || isFetching;

  const handleView = (member: BoardMember) => {
    setSelectedBoardMember(member);
    setViewModal(true);
  };

  const handleDelete = async (member: BoardMember) => {
    try {
      const response = await deleteBoardMember(member.uuid).unwrap();
      if (response) {
        toast.success("Board member deleted successfully!");
        setDeleteModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete board member");
      console.error("Failed to delete board member:", error);
    }
  };

  const [editForm, setEditForm] = useState<EditFormType>({
    name: "",
    position: "",
    about: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    category: "",
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

  const openEditModal = (member: BoardMember) => {
    setSelectedBoardMember(member);
    setEditForm({
      name: member.name,
      position: member.position,
      about: member.about,
      twitter: member.socialLinks.twitter,
      facebook: member.socialLinks.facebook,
      linkedin: member.socialLinks.linkedin,
      category: member.category.uuid,
      image: member.image,
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBoardMember) return;

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("position", editForm.position);
      formData.append("about", editForm.about);
      formData.append("social_links[linkedin]", editForm.linkedin);
      formData.append("social_links[twitter]", editForm.twitter);
      formData.append("social_links[facebook]", editForm.facebook);
      // formData.append("category", editForm.category);

      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updateBoardMember({
        id: selectedBoardMember.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Board member updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update board member");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Board Members</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-board-member")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Board Member
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:justify-between pl-4 pr-4 sm:items-center sm:gap-6 ">
          <div className="relative w-full sm:w-64">
            <FormInput
              type="text"
              placeholder="Search by name..."
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
                new Set(data?.data?.map((member: any) => member.category?.uuid))
              ).map((categoryId) => {
                const category = data?.data?.find(
                  (member: any) => member.category?.uuid === categoryId
                )?.category;
                return (
                  <option key={categoryId || ""} value={categoryId || ""}>
                    {category?.name || "Uncategorized"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="p-5">
          {loading ? (
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
                    <Table.Th className="whitespace-nowrap">About</Table.Th>
                    <Table.Th className="whitespace-nowrap">Category</Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredMembers?.length ? (
                    filteredMembers?.map((member: any, index: any) => (
                      <Table.Tr key={member.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {member.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {member.position}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {member.about.length > 50
                            ? `${member.about.substring(0, 50)}...`
                            : member.about}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {member.category?.name || "N/A"}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {member.image ? (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="Board Member"
                                className="rounded-full"
                                src={member.image}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/illustrations.svg";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Lucide
                                icon="User"
                                className="w-5 h-5 text-gray-500"
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(member)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(member)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedBoardMember(member);
                                setDeleteModal(true);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={7} className="text-center">
                        No board members found matching your criteria
                      </Table.Td>
                    </Table.Tr>
                  )}
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
      <Dialog size="lg" open={viewModal} onClose={() => setViewModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent] overflow-y-auto max-h-[90vh]">
          {!selectedBoardMember ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                {selectedBoardMember?.name}
              </h2>
              <div className="mb-4">
                <strong>Position:</strong>
                <p className="mt-1">{selectedBoardMember?.position}</p>
              </div>
              <div className="mb-4">
                <strong>Category:</strong>
                <p className="mt-1">
                  {selectedBoardMember?.category?.name || "N/A"}
                </p>
              </div>
              <div className="mb-4">
                <strong>About:</strong>
                <p className="mt-2 whitespace-pre-line">
                  {selectedBoardMember?.about}
                </p>
              </div>
              <div className="mb-4">
                <strong>Social Links:</strong>
                <div className="mt-2 flex space-x-4">
                  {selectedBoardMember?.socialLinks?.twitter ? (
                    <a
                      href={selectedBoardMember.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Lucide
                        icon="Twitter"
                        className="w-5 h-5 text-blue-400"
                      />
                    </a>
                  ) : null}
                  {selectedBoardMember?.socialLinks?.facebook ? (
                    <a
                      href={selectedBoardMember.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Lucide
                        icon="Facebook"
                        className="w-5 h-5 text-blue-600"
                      />
                    </a>
                  ) : null}
                  {selectedBoardMember?.socialLinks?.linkedin ? (
                    <a
                      href={selectedBoardMember.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Lucide
                        icon="Linkedin"
                        className="w-5 h-5 text-blue-700"
                      />
                    </a>
                  ) : null}
                  {!selectedBoardMember?.socialLinks?.twitter &&
                    !selectedBoardMember?.socialLinks?.facebook &&
                    !selectedBoardMember?.socialLinks?.linkedin && (
                      <span className="text-gray-500">
                        No social links provided
                      </span>
                    )}
                </div>
              </div>
              {selectedBoardMember?.image && (
                <div className="mb-6">
                  <strong>Image:</strong>
                  <div className="mt-2">
                    <img
                      src={selectedBoardMember.image}
                      alt={selectedBoardMember.name}
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
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>

      {/* Edit Modal */}
      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Edit Board Member</h2>
            <form onSubmit={handleEditSubmit}>
              <FormInput
                name="name"
                type="text"
                value={editForm.name}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Name"
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
              <FormTextarea
                name="about"
                value={editForm.about}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="About"
                rows={6}
                required
              />
              <FormInput
                name="twitter"
                type="url"
                value={editForm.twitter}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Twitter URL"
              />
              <FormInput
                name="facebook"
                type="url"
                value={editForm.facebook}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Facebook URL"
              />
              <FormInput
                name="linkedin"
                type="url"
                value={editForm.linkedin}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="LinkedIn URL"
              />
              <FormInput
                name="category"
                type="text"
                value={editForm.category || ""}
                onChange={handleEditChange}
                className="mb-4"
                placeholder="Category UUID"
                required
              />

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Image</label>
                <div className="flex items-center">
                  {editForm.image && typeof editForm.image === "string" && (
                    <img
                      src={editForm.image}
                      alt="Current"
                      className="w-20 h-20 mr-4 rounded"
                    />
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-primary-dark"
                  />
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
                  {isUpdating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Save"
                  )}
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
            <h2 className="text-xl font-bold mb-4">Delete Board Member</h2>
            <p className="mb-6">
              Are you sure you want to delete "
              {selectedBoardMember?.name || "this board member"}"?
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
                  selectedBoardMember && handleDelete(selectedBoardMember)
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

export default BoardMemberMain;
