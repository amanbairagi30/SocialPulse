"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, FileText } from "lucide-react";
import { useState } from "react";
import { Social } from "@prisma/client";
import { createSocial } from "@/lib/actions";
import { useRouter } from "next/navigation";

export const PlatformCard = ({
  platform,
  icon,
  data,
}: {
  platform: string;
  icon: React.ReactNode;
  data: Social | undefined;
}) => {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  function handleSubmit() {
    async function addAccount() {
      setIsSubmitting(true);
      await createSocial({
        username,
        provider: platform.toLowerCase(),
        followers: 1000,
        posts: 10,
      });
      setUsername("");
      setIsSubmitting(false);
      router.refresh();
    }
    addAccount();
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold ">{platform}</CardTitle>
        <div className="rounded-full p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        {data?.username ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 ">
              <Users className="h-4 w-4" />
              <span className="text-2xl font-bold">
                {data.followers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 ">
              <FileText className="h-4 w-4" />
              <span>{data.posts.toLocaleString()} posts</span>
            </div>
          </div>
        ) : (
          <form className="mt-4">
            <Input
              placeholder={`Enter ${platform} username`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              className="mt-2 w-full"
              disabled={isSubmitting}
            >
              Add Account
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
