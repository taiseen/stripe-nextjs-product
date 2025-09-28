"use client";

import { Id } from "../../../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

const CourseDetailPage = ({
  params,
}: {
  params: { courseId: Id<"courses"> };
}) => {
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isUserLoaded) return <div>Loading...</div>;
  if (!user) return <div>Please sign in to view course details.</div>;

  return <div>CourseDetailPage </div>;
};

export default CourseDetailPage;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CourseDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="w-full h-[600px] rounded-md" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
