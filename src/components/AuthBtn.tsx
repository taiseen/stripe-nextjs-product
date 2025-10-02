import Link from "next/link";
import { CreditCardIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  SignOutButton,
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";

const AuthBtn = () => {
  return (
    <div className="flex items-center gap-2">
      <SignedIn>
        <Link href={"/billing"}>
          <Button
            variant={"outline"}
            size={"sm"}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <CreditCardIcon className="size-4" />
            <span className="hidden sm:inline">Billing</span>
          </Button>
        </Link>
      </SignedIn>

      {/* this will only be shown if user is signed in */}
      <UserButton />

      <SignedIn>
        <SignOutButton>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 text-muted-foreground"
          >
            <LogOutIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedOut>
        <SignUpButton mode="modal">
          <Button size={"sm"}>Sign Up</Button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
};

export default AuthBtn;
