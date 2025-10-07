
import { api } from '../../convex/_generated/api';
import { courseId, userId } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';



export const useUserDocument = () => {
    const { user, isLoaded } = useUser();

    const { getUserByClerkId } = api.controllers.user;

    // Fetch user data
    const userData = useQuery(getUserByClerkId, user ? { clerkId: user.id } : 'skip');

    return {
        user,
        isUserLoaded: isLoaded,
        userData,
        isLoading: isLoaded && !userData,
    };
};



export const useCourse = (courseId: courseId) => {

    const { getCourseById } = api.controllers.courses;

    // Fetch course data
    const courseData = useQuery(getCourseById, { courseId });

    return { courseData, isLoading: !courseData };
};



export const useUserAccess = (userId: userId | undefined, courseId: courseId) => {

    const { getUserAccess } = api.controllers.user;

    const shouldFetch = userId != null;

    // Fetch userAccess data
    const userAccess = useQuery(
        getUserAccess,
        shouldFetch ? { userId, courseId } : 'skip'
    );

    return {
        userAccess: userAccess ?? { hasAccess: false },
        isLoading: shouldFetch && userAccess === undefined,
    };
};



export const useUserSubscription = (userId: userId | undefined) => {
    const { getUserSubscription } = api.controllers.subscriptions;

    const userSubscription = useQuery(
        getUserSubscription,
        userId ? { userId } : "skip"
    );

    return { userSubscription, };
}