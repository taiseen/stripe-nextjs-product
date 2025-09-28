import Course from "@/components/common/Course";
import Explore from "@/components/home/Explore";
import Info from "@/components/home/Info";
import getAllCourse from "./api/getAllCourse";

export default async function Home() {
  const courses = await getAllCourse();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-16">
        <Info />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.slice(0, 3).map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>

        <Explore />
      </main>
    </div>
  );
}
