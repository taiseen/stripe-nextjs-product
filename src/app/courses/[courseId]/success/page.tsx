import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SuccessPageProps } from "@/types";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const SuccessPage = ({ params, searchParams }: SuccessPageProps) => {
  const { courseId } = params;
  const { session_id } = searchParams;

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto p-4">
        <CardHeader className="text-center">
          <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />

          <CardTitle className="text-3xl font-bold text-green-700">
            Purchase Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <p className="text-xl text-muted-foreground">
            Thank you for enrolling our course. Your journey to new skills and
            knowledge begins now!
          </p>

          <div>
            <p className="font-semibold mb-2 text-muted-foreground">
              Transaction ID:-
            </p>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <p className="text-sm font-semibold text-muted-foreground">
                {session_id}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href={`/courses/${courseId}`}>
              <Button variant="default" className="w-full sm:w-auto">
                Go to Course
              </Button>
            </Link>

            <Link href="/courses">
              <Button variant="outline" className="w-full sm:w-auto">
                Browse More Courses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
