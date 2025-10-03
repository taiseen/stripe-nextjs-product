import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { courseId } from '@/types';


const useCourseAccess = (courseId: courseId) => {

    const { user, isLoaded: isUserLoaded } = useUser();


    const { getUserByClerkId, getUserAccess } = api.controllers.user;
    const { getCourseById } = api.controllers.courses;


    // Fetch user data
    const userData = useQuery(getUserByClerkId, { clerkId: user?.id ?? "" });


    // Fetch course data
    const courseData = useQuery(getCourseById, { courseId });


    // Fetch userAccess data
    const userAccess = useQuery(
        getUserAccess,
        userData
            ? {
                userId: userData._id ?? "",
                courseId,
            }
            : "skip"
    ) || { hasAccess: false };


    return {
        isUserLoaded,
        user,
        userData,
        courseData,
        userAccess,
        isLoading: !isUserLoaded || !courseData,
    };
}

export default useCourseAccess