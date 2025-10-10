"use client";

import { useUserDocument, useUserSubscription } from "@/hook/useDataQuery";
import { api } from "../../../convex/_generated/api";
import { Check, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { PRO_PLANS } from "@/constants";
import { useState } from "react";
import { toast } from "sonner";
import {
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";

const ProPage = () => {
  const [loadingPlan, setLoadingPlan] = useState<"month" | "year" | "">("");

  const { userData, isUserLoaded } = useUserDocument();
  const { userSubscription } = useUserSubscription(userData?._id);

  const { createProPlanCheckoutSession } = api.controllers.stripe;

  // Derived subscription states
  const isActiveSubscription = userSubscription?.status === "active";

  const isYearlySubscriptionActive =
    isActiveSubscription && userSubscription.planType === "year";

  const createProPlanCheckoutPage = useAction(createProPlanCheckoutSession);

  const handlePlanSelection = async (planId: "month" | "year") => {
    if (!userData) {
      toast.error("Please log in to select a plan.", {
        id: "login-error",
        position: "top-center",
        duration: 3000,
      });

      return;
    }

    setLoadingPlan(planId);

    try {
      const { checkoutUrl } = await createProPlanCheckoutPage({ planId });

      if (checkoutUrl) {
        // Go to stripe checkout page...
        window.location.href = checkoutUrl;
      }
    } catch (error: any) {
      if (error.message.includes("Rate limit exceeded")) {
        toast.error("You've tried too many times. Please try again later.");
      } else {
        toast.error(
          "There was an error initiating your purchase. Please try again."
        );
      }
      console.log(error);
    } finally {
      setLoadingPlan("");
    }
  };

  // Helper to determine button state for a given plan
  const getButtonState = (planId: "month" | "year") => {
    if (!isUserLoaded) {
      return {
        disabled: false,
        text: PRO_PLANS.find((p) => p.id === planId)?.ctaText || "Select Plan",
      };
    }

    if (isActiveSubscription && userSubscription.planType === planId) {
      return { disabled: true, text: "Current Plan" };
    }

    if (planId === "month" && isYearlySubscriptionActive) {
      return { disabled: true, text: "Yearly Plan Active" };
    }

    return {
      disabled: false,
      text: PRO_PLANS.find((p) => p.id === planId)?.ctaText || "Select Plan",
    };
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl h-screen">
      <h1 className="text-4xl font-bold text-center mb-4">
        Choose Your Pro Journey
      </h1>

      <p className="text-xl text-center mb-12 text-muted-foreground">
        Unlock premium features and accelerate your learning
      </p>

      {/* Active subscription banner */}
      {isUserLoaded && isActiveSubscription && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-md">
          <p className="text-blue-700">
            You have an active{" "}
            <span className="font-semibold">{userSubscription.planType}</span>{" "}
            subscription.
          </p>
        </div>
      )}

      {/* Plan cards */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {PRO_PLANS.map((plan) => {
          const planId = plan.id as "month" | "year";
          const isLoading = loadingPlan === planId;
          const { disabled, text: buttonText } = getButtonState(planId);

          return (
            <Card
              key={plan.id}
              className={`flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "border-purple-400 shadow-lg hover:shadow-xl"
                  : "hover:border-purple-200 hover:shadow-md"
              }`}
            >
              <CardHeader className="flex-grow">
                <CardTitle
                  className={`text-2xl ${
                    plan.highlighted
                      ? "text-purple-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.title}
                </CardTitle>

                <CardDescription className="mt-2">
                  <span className="text-3xl font-bold text-muted-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check
                        className={`h-5 w-5 mr-2 flex-shrink-0 ${
                          plan.highlighted
                            ? "text-purple-500"
                            : "text-green-500"
                        }`}
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto">
                <Button
                  disabled={disabled}
                  onClick={() => handlePlanSelection(planId)}
                  className={`w-full py-6 text-lg ${
                    plan.highlighted
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    buttonText
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProPage;
