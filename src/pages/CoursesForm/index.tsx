import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../base-components/Button";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import FormSelect from "../../base-components/Form/FormSelect";
import {
  useCreateCoursesMutation,
  useGetCoursesQuery,
  useGetProgrammesQuery,
  useGetStaffsQuery,
} from "../../stores/api/apiSlice";
import toast from "react-hot-toast";
import {
  CourseApiResponse,
  CourseFormType,
  ProgrammeApiResponse,
  StaffApiResponse,
  ProgrammeItem,
  StaffItem,
} from "../../utils/dataTypes";
import FileDropzone from "../../components/Dragzone";

function CreateCourse() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [createCourse, { isLoading }] = useCreateCoursesMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch programmes data
  const { data: programmesData } = useGetProgrammesQuery(currentPage);

  // Fetch staff data
  const { data: staffsData } = useGetStaffsQuery(currentPage);

  const { refetch } = useGetCoursesQuery(currentPage);

  const [formData, setFormData] = useState<CourseFormType>({
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileAccepted = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleStaffSelection = (staffUuid: string) => {
    setFormData((prev) => {
      const staffUuids = prev.staffUuids.includes(staffUuid)
        ? prev.staffUuids.filter((id) => id !== staffUuid)
        : [...prev.staffUuids, staffUuid];
      return { ...prev, staffUuids };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload a course image");
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("course_code", formData.courseCode);
      formDataToSend.append("number_of_ects", formData.ects);
      formDataToSend.append("mandatory", formData.mandatory.toString());
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("fee", formData.fee);
      formDataToSend.append("learning_outcomes", formData.learningOutcomes);
      formDataToSend.append("assessment", formData.assessment);
      formDataToSend.append("language", formData.language);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("target_audience", formData.target_audience);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("course_chair_bio", formData.course_chair_bio);

      if (formData.programmeUuid) {
        formDataToSend.append("programme_id", formData.programmeUuid);
      }

      if (formData.startDate) {
        formDataToSend.append("date[start-date]", formData.startDate);
      }
      if (formData.endDate) {
        formDataToSend.append("date[end-date]", formData.endDate);
      }

      formData.staffUuids.forEach((uuid, index) => {
        formDataToSend.append(`staff[${index}]`, uuid);
      });

      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const response = await createCourse(formDataToSend).unwrap();

      if (response) {
        toast.success("Course created successfully!");
        refetch();
        navigate("/courses");
      }
    } catch (error) {
      toast.error("Failed to create course");
      console.error("Create error:", error);
    }
  };

  return (
    <div className="mt-5 intro-y box">
      <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
        <h2 className="mr-auto text-base font-medium">Create New Course</h2>
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title">Course Title</label>
                <FormInput
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Course Title"
                  required
                />
              </div>
              <div>
                <label htmlFor="code">Course Code</label>
                <FormInput
                  name="courseCode"
                  type="text"
                  value={formData.courseCode}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Course Code"
                  required
                />
              </div>
              <div>
                <label htmlFor="credits">ECTS Credits</label>
                <FormInput
                  name="ects"
                  type="text"
                  value={formData.ects}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="ECTS Credits"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="mandatory"
                  checked={formData.mandatory}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Mandatory Course</label>
              </div>
              <div>
                <label htmlFor="startDate">Start Date</label>
                <FormInput
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Start Date"
                  required
                />
              </div>
              <div>
                <label htmlFor="end date">End Date</label>
                <FormInput
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="End Date"
                  required
                />
              </div>
              <div>
                <label htmlFor="duration">Duration</label>
                <FormInput
                  name="duration"
                  type="text"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Duration"
                  required
                />
              </div>
              <div>
                <label htmlFor="fee">Course Fee</label>
                <FormInput
                  name="fee"
                  type="text"
                  value={formData.fee}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Fee"
                  required
                />
              </div>
              <div>
                <label htmlFor="Language">Course Language</label>
                <FormInput
                  name="language"
                  type="text"
                  value={formData.language}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Language"
                  required
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <FormSelect
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mb-4"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="latest">Latest</option>
                  <option value="popular">Popular</option>
                </FormSelect>
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <FormInput
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Course location"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="desc">Course Description</label>
            <FormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mb-4"
              placeholder="Description"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="target_audience">Target Audience</label>
            <FormTextarea
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              className="mb-4"
              placeholder="Who is this course for?"
              rows={3}
              required
            />
          </div>

          <div>
            <label htmlFor="">Learning Outcomes</label>
            <FormTextarea
              name="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleChange}
              className="mb-4"
              placeholder="Learning Outcomes"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="">Assessment Methods</label>
            <FormTextarea
              name="assessment"
              value={formData.assessment}
              onChange={handleChange}
              className="mb-4"
              placeholder="Assessment Methods"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="course_chair_bio">Course Chair Bio</label>
            <FormTextarea
              name="course_chair_bio"
              value={formData.course_chair_bio}
              onChange={handleChange}
              className="mb-4"
              placeholder="About the course chair"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Programme</label>
            <FormSelect
              name="programmeUuid"
              value={formData.programmeUuid}
              onChange={handleChange}
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
            <label className="block mb-2 text-sm font-medium">
              Staff Members
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {staffsData?.data.map((staff: StaffItem) => (
                <div key={staff.uuid} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`staff-${staff.uuid}`}
                    checked={formData.staffUuids.includes(staff.uuid)}
                    onChange={() => handleStaffSelection(staff.uuid)}
                    className="mr-2"
                  />
                  <label htmlFor={`staff-${staff.uuid}`}>
                    <div className="flex items-center">
                      {staff.image && (
                        <img
                          src={staff.image}
                          alt={staff.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      )}
                      {staff.name} ({staff.position})
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Course Image
            </label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Course Preview"
                    className="h-40 object-cover rounded-md"
                  />
                </div>
              )}
              <FileDropzone
                onFileAccepted={handleFileAccepted}
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
              onClick={() => navigate("/courses")}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="w-24"
              disabled={isLoading || !formData.image}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></span>
                  Creating...
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
