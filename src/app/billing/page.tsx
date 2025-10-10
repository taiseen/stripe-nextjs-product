"use client";

import { useUserDocument, useUserSubscription } from "@/hook/useDataQuery";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import {
  CheckCircleIcon,
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Loader2,
  Link,
  Zap,
} from "lucide-react";

const BillingPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useUserDocument();

  if (!userData) router.push("/"); // go to root page

  const { userSubscription } = useUserSubscription(userData?._id);

  const handleManageBilling = async () => {
    setIsLoading(true);

    try {
      // 🟩🟩🟩 create a folder & file name according to this url...
      const endPoint = "/api/create-billing-portal";
      const response = await fetch(endPoint, { method: "POST" });
      const { billingUrl } = await response.json();

      console.log({ billingUrl });

      if (billingUrl) {
        // Go to stripe billing page...
        window.location.href = billingUrl;
      } else {
        throw new Error("Failed to create billing portal");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number): string => {
    // Convert Unix timestamp (seconds) to milliseconds
    const date = new Date(timestamp * 1000);

    // Format options for consistent date display
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  if (!userData || userSubscription === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl ">
      <h1 className="text-4xl font-bold mb-8 text-center text-muted-foreground">
        Billing Management
      </h1>

      <Card className="w-full shadow-lg border-0 overflow-hidden">
        {userSubscription ? (
          <>
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                Active Subscription
              </CardTitle>

              <CardDescription className="text-gray-400">
                Manage your subscription details below
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-lg font-semibold text-muted-foreground capitalize">
                    {userSubscription.planType}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-muted-foreground capitalize flex item-center gap-2">
                    {userSubscription.status}{" "}
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mt-1.5" />
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">
                    Next billing date
                  </p>

                  <p className="text-lg font-semibold text-muted-foreground">
                    {formatDate(userSubscription.currentPeriodEnd)}
                  </p>
                </div>
              </div>

              {userSubscription.cancelAtPeriodEnd && (
                <div className="flex items-center bg-red-100 p-4 rounded-lg text-red-700">
                  <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <p className="text-sm">
                    Your subscription will be cancelled at the end of the
                    current billing period at:-{" "}
                    {formatDate(userSubscription.currentPeriodEnd)}
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end bg-gray-50 dark:bg-gray-700 mt-6 pt-4">
              <Button
                onClick={handleManageBilling}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Manage Billing"
                )}
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-2 w-full"></div>
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
                No Active Subscription
              </CardTitle>

              <CardDescription className="text-muted-foreground">
                Upgrade to Pro to unlock premium features
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center py-12">
              <p className="text-lg mb-6 text-muted-foreground">
                Get access to exclusive content and features with our Pro plan.
              </p>

              <Link href="/pro">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Explore Pro Plans
                </Button>
              </Link>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default BillingPage;
