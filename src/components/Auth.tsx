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

export default function Auth() {
  const session = useSession();
  return (
    <div className="w-full flex justify-end p-4">
      <div className="flex space-x-4">
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
  );
}

function SignIn() {
  return (
    <Button variant={"link"} onClick={() => signIn()}>
      Sign in
    </Button>
  );
}

function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
