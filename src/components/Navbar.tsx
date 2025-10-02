import { GraduationCap, BookOpenIcon, ZapIcon } from "lucide-react";
import AuthBtn from "./AuthBtn";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-background border-b">
      <Link
        href={"/"}
        className="text-xl font-extrabold text-primary flex items-center gap-2"
      >
        MasterClass <GraduationCap className="size-6" />
      </Link>

      <div className="flex items-center space-x-1 sm:space-x-4">
        <Link
          href={"/courses"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
        >
          <BookOpenIcon className="size-4" />
          <span className="hidden sm:inline">Courses</span>
        </Link>

        <Link
          href={"/pro"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
        >
          <ZapIcon className="size-4" />
          <span className="hidden sm:inline">Pro</span>
        </Link>

        <AuthBtn />
      </div>
    </nav>
  );
};

export default Navbar;
