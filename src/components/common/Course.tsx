import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import PurchaseButton from "./PurchaseButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";

const Course = ({ course }: { course: any }) => {
  return (
    <Card className="flex flex-col">
      <Link href={`/courses/${course._id}`} className="cursor-pointer">
        <CardHeader>
          <Image
            width={640}
            height={360}
            alt={course.title}
            src={course.imageUrl}
            className="rounded-md object-cover"
          />
        </CardHeader>

        <CardContent className="flex-grow">
          <CardTitle className="text-xl mb-2 hover:underline">
            {course.title}
          </CardTitle>
        </CardContent>
      </Link>

      <CardFooter className="flex justify-between items-center">
        <Badge variant="default" className="text-lg px-3 py-1">
          ${course.price.toFixed(2)}
        </Badge>

        <SignedIn>
          <PurchaseButton courseId={course._id} />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant={"outline"}>Enroll Now</Button>
          </SignInButton>
        </SignedOut>
      </CardFooter>
    </Card>
  );
};

export default Course;
