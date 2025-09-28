import getAllCourse from "../api/getAllCourse";
import Course from "@/components/common/Course";

const CorsePage = async () => {
  const courses = await getAllCourse();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Course key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CorsePage;
