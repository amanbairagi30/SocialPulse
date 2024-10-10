import { Card } from "@/components/ui/card";
import { getAllSocials, updateYoutubeChannelId } from "@/lib/actions";
import { getAllVideos } from "@/lib/youtube";
import { YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const YoutubePage = async () => {
  const platformData = await getAllSocials();
  const youtube = platformData.find(
    (platform) => platform.provider === "youtube"
  );
  const channelId = youtube?.username || "";
  const data = await getAllVideos(channelId);

  console.log(data)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">YouTube Channel</h2>
        <form action={updateYoutubeChannelId} className="flex gap-2">
          <Input
            type="text"
            name="channelId"
            defaultValue={channelId}
            placeholder="Enter YouTube Channel ID"
          />
          <Button type="submit">Update Channel</Button>
        </form>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((video, i) => (
          <Link key={i} href={`/dashboard/youtube/${video.id?.videoId}`}>
            <Card className="flex flex-col items-start gap-4 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl p-3 hover:cursor-pointer">
              <Image
                src={video.snippet?.thumbnails?.high?.url ?? ""}
                alt={video.snippet?.title || "Video Thumbnail"}
                width={480}
                height={360}
                className="object-cover w-full aspect-video rounded-sm"
              />
              <div className="p-4 bg-background w-full">
                <h3 className="text-lg font-medium line-clamp-2">
                  {video.snippet?.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <YoutubeIcon className="w-4 h-4" />
                    <span>{video.snippet?.channelTitle}</span>
                  </div>
                  <span>&middot;</span>
                  <span>
                    {video.snippet?.publishedAt
                      ? new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                        }).format(new Date(video.snippet.publishedAt))
                      : "Date unavailable"}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default YoutubePage;
