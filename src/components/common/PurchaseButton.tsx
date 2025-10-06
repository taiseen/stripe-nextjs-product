"use client";

import { useUserAccess, useUserDocument } from "@/hook/useDataQuery";
import { api } from "../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { useAction } from "convex/react";
import { Button } from "../ui/button";
import { courseId } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const PurchaseButton = ({ courseId }: { courseId: courseId }) => {
  const { userData } = useUserDocument();

  const { userAccess } = useUserAccess(userData?._id, courseId);

  const { createCheckoutSession } = api.controllers.stripe;

  // when we need to call third party services like:- stripe - then we use useAction...
  const createCheckout = useAction(createCheckoutSession);

  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!userData)
      return toast.error("Please log in to purchase", { id: "login-error" });

    setIsLoading(true);

    try {
      const { checkoutUrl } = await createCheckout({ courseId });

      if (checkoutUrl) {
        // Go to stripe checkout page...
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error: any) {
      error.message.includes("Rate limit exceeded")
        ? toast.error("You've tried too many times. Please try again later.")
        : toast.error(
            error.message || "Something went wrong. Please try again later."
          );

      console.log("🟥 " + error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userAccess.hasAccess) {
    return (
      <Button variant={"outline"} onClick={handlePurchase} disabled={isLoading}>
        Enroll
      </Button>
    );
  }

  if (userAccess.hasAccess) {
    return (
      <Button variant={"ghost"} className="text-green-400">
        ✅ Enrolled
      </Button>
    );
  }

  if (isLoading) {
    return (
      <Button>
        <Loader2Icon className="mr-2 size-4 animate-spin" />
        Processing...
      </Button>
    );
  }
};

export default PurchaseButton;
