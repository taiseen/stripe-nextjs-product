import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Explore = () => {
  return (
    <div className="text-center">
      <Link href="/pro">
        <Button
          size="lg"
          className="group hover:bg-purple-600 transition-colors duration-300"
        >
          Explore Pro Plans
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
};

export default Explore;
