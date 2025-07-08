import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteHeroMutation,
  useGetHeroSectionQuery,
  useUpdateHeroMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import { truncateText } from "../../services/utility";
import FileDropzone from "../../components/Dragzone";
import Pagination from "../../components/Pagination";
import { HeroItem } from "../../utils/dataTypes";

export interface HeroApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: {
    data: HeroItem[];
    meta: any;
    links: any;
  };
}

function Main() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedHero, setSelectedHero] = useState<HeroItem | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetHeroSectionQuery(currentPage);

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();
  const [deleteHero] = useDeleteHeroMutation();

  const navigate = useNavigate();

  const handleView = (hero: HeroItem) => {
    setSelectedHero(hero);
    setViewModal(true);
  };

  const handleDelete = async (hero: HeroItem) => {
    try {
      const response = await deleteHero(hero.uuid).unwrap();
      if (response) {
        toast.success("Hero content deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete hero");
      console.error("Failed to delete hero:", error);
    }
  };

  const [editForm, setEditForm] = useState<
    Omit<HeroItem, "uuid" | "image"> & { image?: File | string }
  >({
    title: "",
    caption: "",
    cta1: { title: "", link: "" },
    cta2: { title: "", link: "" },
  });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof editForm] as object),
          [child]: value,
        },
      }));
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const openEditModal = (hero: HeroItem) => {
    setSelectedHero(hero);
    setEditForm({
      title: hero.title,
      caption: hero.caption,
      cta1: { ...hero.cta1 },
      cta2: { ...hero.cta2 },
      image: hero.image,
    });
    setEditImagePreview(hero.image);
    setEditModal(true);
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImagePreview(reader.result as string);
      setEditForm((prev) => ({
        ...prev,
        image: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedHero || !editForm) return;
    console.log(selectedHero?.uuid, ">>>hero uuid");

    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("caption", editForm.caption);
      formData.append("cta1_title", editForm.cta1.title);
      formData.append("cta1_link", editForm.cta1.link);
      formData.append("cta2_title", editForm.cta2.title);
      formData.append("cta2_link", editForm.cta2.link);

      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updateHero({
        id: selectedHero.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Hero updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update hero");
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <div>
        <div className="mt-5 intro-y box">
          <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
            <h2 className="mr-auto text-base font-medium">Hero Section</h2>
            <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
              <Button
                onClick={() => navigate("/create-hero")}
                style={{ backgroundColor: "#4CAF50", color: "white" }}
              >
                Add Hero
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
                      <Table.Th className="whitespace-nowrap">Caption</Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        Primary CTA
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        Secondary CTA
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {!isLoading &&
                      data?.data.map((hero, index) => (
                        <Table.Tr key={hero.uuid}>
                          <Table.Td className="whitespace-nowrap">
                            {index + 1}
                          </Table.Td>
                          <Table.Td className="whitespace-nowrap">
                            {hero.title}
                          </Table.Td>
                          <Table.Td className="whitespace-nowrap">
                            {truncateText(hero.caption)}
                          </Table.Td>
                          <Table.Td className="whitespace-nowrap">
                            <a
                              href={hero.cta1.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {hero.cta1.title}
                            </a>
                          </Table.Td>
                          <Table.Td className="whitespace-nowrap">
                            <a
                              href={hero.cta2.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {hero.cta2.title}
                            </a>
                          </Table.Td>
                          <Table.Td className="whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleView(hero)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => openEditModal(hero)}
                                className="text-yellow-500 hover:text-yellow-700"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedHero(hero);
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
            <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{selectedHero?.title}</h2>
              <img
                src={selectedHero?.image}
                alt={selectedHero?.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="mb-4">{selectedHero?.caption}</p>
              <div className="space-y-2 mb-6">
                <p>
                  <strong>Primary Button:</strong> {selectedHero?.cta1.title}
                </p>
                <p>
                  <strong>Primary Link:</strong> {selectedHero?.cta1.link}
                </p>
                <p>
                  <strong>Secondary Button:</strong> {selectedHero?.cta2.title}
                </p>
                <p>
                  <strong>Secondary Link:</strong> {selectedHero?.cta2.link}
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

        <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
          <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
            <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Hero Section</h2>
              <form onSubmit={handleEditSubmit}>
                <FormInput
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Title"
                />
                <FormTextarea
                  name="caption"
                  value={editForm.caption}
                  onChange={handleEditChange}
                  className="mb-4"
                  placeholder="Caption"
                  rows={3}
                />

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block mb-2">Hero Image</label>
                  <FileDropzone
                    onFileAccepted={(file: File) => {
                      if (!file.type.match("image.*")) {
                        toast.error("Please select an image file");
                        return;
                      }
                      processImageFile(file);
                    }}
                    accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                  />
                  {editImagePreview && (
                    <img
                      src={editImagePreview}
                      alt="Current hero"
                      className="h-20 object-cover rounded mt-2"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <FormInput
                    name="cta1.title"
                    type="text"
                    value={editForm.cta1.title}
                    onChange={handleEditChange}
                    placeholder="Primary Button Text"
                  />
                  <FormInput
                    name="cta1.link"
                    type="url"
                    value={editForm.cta1.link}
                    onChange={handleEditChange}
                    placeholder="Primary Button Link"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <FormInput
                    name="cta2.title"
                    type="text"
                    value={editForm.cta2.title}
                    onChange={handleEditChange}
                    placeholder="Secondary Button Text"
                  />
                  <FormInput
                    name="cta2.link"
                    type="url"
                    value={editForm.cta2.link}
                    onChange={handleEditChange}
                    placeholder="Secondary Button Link"
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

        <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
          <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
            <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Delete Hero Section</h2>
              <p className="mb-6">
                Are you sure you want to delete "{selectedHero?.title}"?
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
                  onClick={() => selectedHero && handleDelete(selectedHero)}
                  className="w-24"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
    </>
  );
}

export default Main;
