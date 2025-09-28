import { api } from "../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export default async function getAllCourse() {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    return await convex.query(api.controllers.courses.getCourses);
}