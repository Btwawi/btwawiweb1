// NewsMain.tsx
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteNewsMutation,
  useGetNewsQuery,
  useUpdateNewsMutation,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import toast from "react-hot-toast";
import { useGetNewsCategoryQuery } from "../../stores/api/apiSlice";
import FileDropzone from "../../components/Dragzone";
import Lucide from "../../base-components/Lucide";
import Pagination from "../../components/Pagination";
import { truncateHtml } from "../../services/utility";
import { NewsItem } from "../../utils/dataTypes";

// interfaces.ts
export interface NewsCategory {
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

interface NewsData {
  data: NewsItem[];
  meta: Meta;
  links: Links;
}

export interface NewsApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: NewsData;
}

type EditFormType = {
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string | File | null;
  date_posted: string;
};

function NewsMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading, isFetching, refetch } = useGetNewsQuery(currentPage);

  const news = data?.data || [];

  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const filteredNews = news.filter((member: any) => {
    const nameMatch = member.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Safely handle cases where category might be undefined
    const categoryMatch =
      selectedCategory === "" ||
      //@ts-ignore
      (member.category && member.category?.uuid === selectedCategory);

    return nameMatch && categoryMatch;
  });

  const { data: categoriesData } = useGetNewsCategoryQuery(currentPage);

  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();
  const [deleteNews, { isLoading: isDeleting }] = useDeleteNewsMutation();

  const navigate = useNavigate();

  const handleView = (news: NewsItem) => {
    setSelectedNews(news);
    setViewModal(true);
  };

  const handleDelete = async (news: NewsItem) => {
    try {
      const response = await deleteNews(news.uuid).unwrap();
      if (response) {
        toast.success("News deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete news");
      console.error("Failed to delete news:", error);
    }
  };

  const [editForm, setEditForm] = useState<EditFormType>({
    title: "",
    slug: "",
    content: "",
    category: "",
    image: null,
    date_posted: "",
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

  const openEditModal = (news: NewsItem) => {
    setSelectedNews(news);
    setEditForm({
      title: news.title,
      slug: news.slug,
      content: news.content,
      category: news.category.uuid,
      image: news.image,
      date_posted: news.date_posted.split("T")[0],
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedNews) return;

    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("content", editForm.content);
      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      }

      const response = await updateNews({
        id: selectedNews.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("News updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update news");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">News</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-news")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add News
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
                new Set(data?.data?.map((member: any) => member.category?.uuid))
              ).map((categoryId) => {
                const category = data?.data?.find(
                  (member: any) => member.category?.uuid === categoryId
                )?.category;
                return (
                  <option
                    key={categoryId as string | number}
                    value={categoryId as string | number}
                  >
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
                    <Table.Th className="whitespace-nowrap">Category</Table.Th>
                    <Table.Th className="whitespace-nowrap">
                      Date Posted
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">Image</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    filteredNews.map((news: any, index: any) => (
                      <Table.Tr key={news.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {news.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {news?.category?.name || ""}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {new Date(news.date_posted).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {news.image && (
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img
                                alt="News"
                                className="rounded-full"
                                src={news.image}
                              />
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(news)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(news)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedNews(news);
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
      <Dialog size="lg" open={viewModal} onClose={() => setViewModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{selectedNews?.title}</h2>
            <div className="mb-4">
              <strong>Category:</strong>
              <p className="mt-1">{selectedNews?.category?.name || ""}</p>
            </div>
            <div className="mb-4">
              <strong>Date Posted:</strong>
              <p className="mt-1">
                {selectedNews?.date_posted &&
                  new Date(selectedNews.date_posted).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-4">
              <strong>Content:</strong>
              <p className="mt-2 whitespace-pre-line">
                {truncateHtml(selectedNews?.content ?? "")}
              </p>
            </div>
            {selectedNews?.image && (
              <div className="mb-6">
                <strong>Image:</strong>
                <div className="mt-2">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
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
        </Dialog.Panel>
      </Dialog>

      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Edit News</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  News Title
                </label>
                <FormInput
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Enter news title"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  News Content
                </label>
                <FormTextarea
                  name="content"
                  value={editForm.content}
                  onChange={handleEditChange}
                  placeholder="Enter news content"
                  rows={6}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select a category</option>
                  {categoriesData?.data.map((category) => (
                    <option key={category.uuid} value={category.uuid}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date Posted
                </label>
                <FormInput
                  name="date_posted"
                  type="date"
                  value={editForm.date_posted}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Image
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
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    JPEG, PNG, or JPG (Max 2MB)
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
          <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete News</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedNews?.title}"?
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
                onClick={() => selectedNews && handleDelete(selectedNews)}
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

export default NewsMain;
