"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const PurchaseButton = ({ courseId }: { courseId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    // setIsLoading(true);
    console.log({ courseId });
  };

  return (
    // disabled={isLoading}
    <Button variant={"outline"} onClick={handlePurchase}>
      Enroll Now
    </Button>
  );
};

export default PurchaseButton;
