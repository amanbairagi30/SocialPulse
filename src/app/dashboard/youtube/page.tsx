import { Card } from "@/components/ui/card";
import { getAllSocials } from "@/lib/actions";
import { getAllVideos } from "@/lib/youtube";
import { YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const YoutubePage = async () => {
  const platformData = await getAllSocials();
  const youtube = platformData.find(
    (platform) => platform.provider === "youtube"
  );
  const data = await getAllVideos(youtube?.username?? "");
  return (
    <div className="grid gap-4 grid-cols-3 p-6">
      {data?.map((video, i) => (
        <Link key={i} href={`/dashboard/youtube/${video.id?.videoId}`}>
        <Card
          className="flex items-start gap-4 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl p-3 hover:cursor-pointer"
        >
          <Image
            src={video.snippet?.thumbnails?.high?.url ?? ""}
            alt="Fireship Video Thumbnail"
            width={480}
            height={360}
            className="object-cover w-1/2 aspect-video rounded-sm"
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-medium line-clamp-2">
              {video.snippet?.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <YoutubeIcon className="w-4 h-4" />
                <span>{video.snippet?.channelTitle}</span>
              </div>
              <span>&middot;</span>
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(new Date(video.snippet?.publishedAt?? ""))}
              </span>
            </div>
          </div>
        </Card>
        </Link>
      ))}
    </div>
  );
};

export default YoutubePage;
