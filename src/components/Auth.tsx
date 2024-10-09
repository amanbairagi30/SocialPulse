"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { MessageCircleHeart } from "lucide-react";

export default function Auth() {
  const session = useSession();
  return (
    <div className="w-full h-fit py-6 z-[20] px-2 fixed top-0">
      <div className="max-w-7xl px-4 py-4 rounded-xl backdrop-blur-md bg-primary/10 text-2xl flex items-center justify-between mx-auto">
        {/* <div className="text-foreground font-extrabold">SocialPulse<span className="text-primary">.</span></div> */}
        <div className="text-foreground font-extrabold">
          <span>Social</span>
          <span className="text-primary">Pulse.</span>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {session.data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={session.data.user.image!} />
                  <AvatarFallback>
                    {session.data.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <Button className="text-sm transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary" variant={"default"} onClick={() => signIn()}>
      Sign in
    </Button>
  );
}

function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
