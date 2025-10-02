import { Id } from "../../convex/_generated/dataModel";

export type LayoutType = {
    children: React.ReactNode
}

export type CourseDetailPageProps = {
    params: { courseId: Id<"courses"> };
}