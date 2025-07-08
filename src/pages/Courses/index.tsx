import {
  Edit,
  Eye,
  Loader2,
  Trash2,
  Calendar,
  BookOpen,
  Users,
  CreditCard,
  Award,
  Check,
  Globe,
} from "lucide-react";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCoursesMutation,
  useGetCoursesQuery,
  useUpdateCoursesMutation,
  useGetProgrammesQuery,
} from "../../stores/api/apiSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import FormSelect from "../../base-components/Form/FormSelect";
import FormCheck from "../../base-components/Form/FormCheck";
import toast from "react-hot-toast";
import {
  CourseApiResponse,
  CourseFormType,
  CourseItem,
  ProgrammeApiResponse,
  ProgrammeItem,
} from "../../utils/dataTypes";
import FileDropzone from "../../components/Dragzone";
import { formatDate } from "../../utils/helper";
import Pagination from "../../components/Pagination";

function CourseMain() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching, refetch } =
    useGetCoursesQuery(currentPage);

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCoursesMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCoursesMutation();

  // Fetch programmes data
  const { data: programmesData } = useGetProgrammesQuery(currentPage);
  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  const navigate = useNavigate();

  const handleView = (course: CourseItem) => {
    setSelectedCourse(course);
    setViewModal(true);
  };

  const handleDelete = async (course: CourseItem) => {
    try {
      const response = await deleteCourse(course.uuid).unwrap();
      if (response) {
        toast.success("Course deleted successfully!");
        setDeleteModal(false);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to delete course");
      console.error("Failed to delete course:", error);
    }
  };

  const [editForm, setEditForm] = useState<CourseFormType>({
    title: "",
    description: "",
    programmeUuid: "",
    image: null,
    courseCode: "",
    ects: "",
    mandatory: false,
    startDate: "",
    endDate: "",
    duration: "",
    fee: "",
    learningOutcomes: "",
    assessment: "",
    language: "",
    status: "",
    staffUuids: [],
    target_audience: "",
    location: "",
    course_chair_bio: "",
  });

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStaffSelection = (staffUuid: string) => {
    setEditForm((prev) => {
      const staffUuids = prev.staffUuids.includes(staffUuid)
        ? prev.staffUuids.filter((id) => id !== staffUuid)
        : [...prev.staffUuids, staffUuid];
      return { ...prev, staffUuids };
    });
  };

  const openEditModal = (course: CourseItem) => {
    setSelectedCourse(course);
    setEditForm({
      title: course.title,
      description: course.description,
      programmeUuid: course.programme.uuid,
      image: course.image,
      courseCode: course.courseCode,
      ects: course.ects,
      mandatory: course.mandatory,
      startDate: course.date["start-date"],
      endDate: course.date["end-date"],
      duration: course.duration,
      fee: course.fee,
      learningOutcomes: course.learningOutcomes,
      assessment: course.assessment,
      language: course.language,
      status: course.status,
      staffUuids: course.staffs.map((staff) => staff.uuid),
      target_audience: course["target_audience"],
      location: course.location,
      course_chair_bio: course["course_chair_bio"],
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) return;

    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      formData.append("mandatory", editForm.mandatory.toString());
      formData.append("duration", editForm.duration);
      formData.append("fee", editForm.fee);
      formData.append("assessment", editForm.assessment);
      formData.append("language", editForm.language);
      formData.append("programme_id", editForm.programmeUuid);
      formData.append("status", editForm.status);
      formData.append("target_audience", editForm.target_audience);
      formData.append("location", editForm.location);
      formData.append("course_chair_bio", editForm.course_chair_bio);

      editForm.staffUuids.forEach((uuid) => formData.append("staff[0]", uuid));

      // Only append image if it's a File object (new upload)
      if (editForm.image instanceof File) {
        formData.append("image", editForm.image);
      } else if (editForm.image === null) {
        // If you want to allow removing the image, handle that case here
        formData.append("remove_image", "true");
      }

      const response = await updateCourse({
        id: selectedCourse.uuid,
        data: formData,
      }).unwrap();

      if (response) {
        toast.success("Course updated successfully!");
        setEditModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update course");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="mt-5 intro-y box">
        <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Courses</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Button
              onClick={() => navigate("/create-course")}
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              Add Course
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
                    <Table.Th className="whitespace-nowrap">Programme</Table.Th>
                    <Table.Th className="whitespace-nowrap">Code</Table.Th>
                    <Table.Th className="whitespace-nowrap">ECTS</Table.Th>
                    <Table.Th className="whitespace-nowrap">Mandatory</Table.Th>
                    <Table.Th className="whitespace-nowrap">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {!isLoading &&
                    data?.data.map((course, index) => (
                      <Table.Tr key={course.uuid}>
                        <Table.Td className="whitespace-nowrap">
                          {index + 1}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {course.title}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {course.programme.name}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {course.courseCode}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {course.ects}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          {course.mandatory ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <span className="text-gray-400">No</span>
                          )}
                        </Table.Td>
                        <Table.Td className="whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(course)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(course)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
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
        size="2xl"
        open={viewModal}
        onClose={() => setViewModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
      >
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{selectedCourse?.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <strong className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" /> Description:
                  </strong>
                  <p className="mt-2 whitespace-pre-line">
                    {selectedCourse?.description}
                  </p>
                </div>

                <div className="mb-4">
                  <strong className="flex items-center">
                    <Award className="w-4 h-4 mr-2" /> Learning Outcomes:
                  </strong>
                  <p className="mt-2 whitespace-pre-line">
                    {selectedCourse?.learningOutcomes}
                  </p>
                </div>

                <div className="mb-4">
                  <strong className="flex items-center">
                    <Check className="w-4 h-4 mr-2" /> Assessment:
                  </strong>
                  <p className="mt-2 whitespace-pre-line">
                    {selectedCourse?.assessment}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <strong className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Duration:
                  </strong>
                  <p className="mt-2">
                    {selectedCourse?.duration} (
                    {selectedCourse?.date &&
                      `${new Date(
                        selectedCourse.date["start-date"]
                      ).toLocaleDateString()} - 
                      ${new Date(
                        selectedCourse.date["end-date"]
                      ).toLocaleDateString()}`}
                    )
                  </p>
                </div>

                <div className="mb-4">
                  <strong className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" /> Fee:
                  </strong>
                  <p className="mt-2">${selectedCourse?.fee}</p>
                </div>

                <div className="mb-4">
                  <strong className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" /> Language:
                  </strong>
                  <p className="mt-2">{selectedCourse?.language}</p>
                </div>

                <div className="mb-4">
                  <strong>Status:</strong>
                  <p className="mt-2 capitalize">{selectedCourse?.status}</p>
                </div>

                <div className="mb-4">
                  <strong>Location:</strong>
                  <p className="mt-2">{selectedCourse?.location}</p>
                </div>

                {selectedCourse?.staffs && selectedCourse.staffs.length > 0 && (
                  <div className="mb-4">
                    <strong className="flex items-center">
                      <Users className="w-4 h-4 mr-2" /> Staff:
                    </strong>
                    <div className="mt-2 space-y-2">
                      {selectedCourse.staffs.map((staff) => (
                        <div key={staff.uuid} className="flex items-center">
                          {staff.image && (
                            <img
                              src={staff.image}
                              alt={staff.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                          )}
                          <span>
                            {staff.name} ({staff.position})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <strong>Target Audience:</strong>
              <p className="mt-2 whitespace-pre-line">
                {selectedCourse?.target_audience}
              </p>
            </div>

            <div className="mb-4">
              <strong>Course Chair Bio:</strong>
              <p className="mt-2 whitespace-pre-line">
                {selectedCourse?.course_chair_bio}
              </p>
            </div>

            {selectedCourse?.image && (
              <div className="mb-6">
                <strong>Course Image:</strong>
                <div className="mt-2">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
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

      {/* Edit Modal */}
      <Dialog size="2xl" open={editModal} onClose={() => setEditModal(false)}>
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4 bg-[transparent]">
          <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium"
                  >
                    Course Title
                  </label>
                  <FormInput
                    id="title"
                    name="title"
                    type="text"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Course Title"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="courseCode"
                    className="block mb-2 text-sm font-medium"
                  >
                    Course Code
                  </label>
                  <FormInput
                    id="courseCode"
                    name="courseCode"
                    type="text"
                    value={editForm.courseCode}
                    onChange={handleEditChange}
                    placeholder="Course Code"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="ects"
                    className="block mb-2 text-sm font-medium"
                  >
                    ECTS Credits
                  </label>
                  <FormInput
                    id="ects"
                    name="ects"
                    type="text"
                    value={editForm.ects}
                    onChange={handleEditChange}
                    placeholder="ECTS Credits"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium"
                  >
                    Location
                  </label>
                  <FormInput
                    id="location"
                    name="location"
                    type="text"
                    value={editForm.location}
                    onChange={handleEditChange}
                    placeholder="Course location"
                    required
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="mandatory"
                    name="mandatory"
                    checked={editForm.mandatory}
                    onChange={handleEditChange}
                    className="mr-2"
                  />
                  <label htmlFor="mandatory">Mandatory Course</label>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium"
                  >
                    Status
                  </label>
                  <FormSelect
                    id="status"
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="latest">Latest</option>
                    <option value="popular">Popular</option>
                  </FormSelect>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium"
                  >
                    Start Date
                  </label>
                  <FormInput
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formatDate(editForm.startDate, "YYYY-MM-DD")}
                    onChange={handleEditChange}
                    placeholder="Start Date"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium"
                  >
                    End Date
                  </label>
                  <FormInput
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formatDate(editForm.endDate, "YYYY-MM-DD")}
                    onChange={handleEditChange}
                    placeholder="End Date"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="duration"
                    className="block mb-2 text-sm font-medium"
                  >
                    Duration
                  </label>
                  <FormInput
                    id="duration"
                    name="duration"
                    type="text"
                    value={editForm.duration}
                    onChange={handleEditChange}
                    placeholder="Duration"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="fee"
                    className="block mb-2 text-sm font-medium"
                  >
                    Fee
                  </label>
                  <FormInput
                    id="fee"
                    name="fee"
                    type="text"
                    value={editForm.fee}
                    onChange={handleEditChange}
                    placeholder="Fee"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="language"
                    className="block mb-2 text-sm font-medium"
                  >
                    Language
                  </label>
                  <FormInput
                    id="language"
                    name="language"
                    type="text"
                    value={editForm.language}
                    onChange={handleEditChange}
                    placeholder="Language"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="target_audience"
                  className="block mb-2 text-sm font-medium"
                >
                  Target Audience
                </label>
                <FormTextarea
                  id="target_audience"
                  name="target_audience"
                  value={editForm.target_audience}
                  onChange={handleEditChange}
                  placeholder="Who is this course for?"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="course_chair_bio"
                  className="block mb-2 text-sm font-medium"
                >
                  Course Chair Bio
                </label>
                <FormTextarea
                  id="course_chair_bio"
                  name="course_chair_bio"
                  value={editForm.course_chair_bio}
                  onChange={handleEditChange}
                  placeholder="About the course chair"
                  rows={4}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium"
                >
                  Description
                </label>
                <FormTextarea
                  id="description"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="learningOutcomes"
                  className="block mb-2 text-sm font-medium"
                >
                  Learning Outcomes
                </label>
                <FormTextarea
                  id="learningOutcomes"
                  name="learningOutcomes"
                  value={editForm.learningOutcomes}
                  onChange={handleEditChange}
                  placeholder="Learning Outcomes"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="assessment"
                  className="block mb-2 text-sm font-medium"
                >
                  Assessment Methods
                </label>
                <FormTextarea
                  id="assessment"
                  name="assessment"
                  value={editForm.assessment}
                  onChange={handleEditChange}
                  placeholder="Assessment Methods"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="programmeUuid"
                  className="block mb-2 text-sm font-medium"
                >
                  Programme
                </label>
                <FormSelect
                  id="programmeUuid"
                  name="programmeUuid"
                  value={editForm.programmeUuid}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select Programme</option>
                  {programmesData?.data.map((programme: ProgrammeItem) => (
                    <option key={programme.uuid} value={programme.uuid}>
                      {programme.name}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Staff</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedCourse?.staffs.map((staff) => (
                    <div key={staff.uuid} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`staff-${staff.uuid}`}
                        checked={editForm.staffUuids.includes(staff.uuid)}
                        onChange={() => handleStaffSelection(staff.uuid)}
                        className="mr-2"
                      />
                      <label htmlFor={`staff-${staff.uuid}`}>
                        {staff.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Image</label>
                <div className="space-y-4">
                  {editForm.image && (
                    <div className="flex justify-center">
                      <img
                        src={
                          typeof editForm.image === "string"
                            ? editForm.image
                            : URL.createObjectURL(editForm.image)
                        }
                        alt="Course Preview"
                        className="h-40 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <FileDropzone
                    onFileAccepted={(file: File) => {
                      setEditForm((prev) => ({
                        ...prev,
                        image: file,
                      }));
                    }}
                    accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                    maxSize={5 * 1024 * 1024} // 5MB
                  />
                  <p className="text-xs text-gray-500 text-center">
                    Supported formats: JPG, PNG, WEBP (Max 5MB)
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
            <h2 className="text-xl font-bold mb-4">Delete Course</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedCourse?.title}"?
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
                onClick={() => selectedCourse && handleDelete(selectedCourse)}
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

export default CourseMain;
