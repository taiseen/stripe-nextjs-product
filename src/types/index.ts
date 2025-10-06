import { Id } from "../../convex/_generated/dataModel";

export type LayoutType = {
    children: React.ReactNode
}

export type courseId = Id<"courses">;

export type userId = Id<"users">;


export type CourseDetailPageProps = {
    params: { courseId: courseId };
}

export type SuccessPageProps = {
    params: { courseId: string };
    searchParams: { session_id: string };
}