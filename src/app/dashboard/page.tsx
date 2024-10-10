import { Youtube, Twitter, Instagram, Facebook } from "lucide-react";
import { PlatformCard } from "@/components/PlatformCard";
import { getAllSocials } from "@/lib/actions";

export default async function Dashboard() {
  const platformData = await getAllSocials();
  const youtube = platformData.find(
    (platform) => platform.provider === "youtube"
  );
  const twitter = platformData.find(
    (platform) => platform.provider === "twitter"
  );
  const instagram = platformData.find(
    (platform) => platform.provider === "instagram"
  );
  const facebook = platformData.find(
    (platform) => platform.provider === "facebook"
  );

  return (
    <div className="min-h-scree px-4">
      <div className="">
        <h1 className="text-2xl font-bold mb-8 mt-4">
          Social Media Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlatformCard
            platform="youtube"
            icon={<Youtube className="h-6 w-6 text-red-600" />}
            data={youtube}
          />
          <PlatformCard
            platform="twitter"
            icon={<Twitter className="h-6 w-6 text-blue-400" />}
            data={twitter}
          />
          <PlatformCard
            platform="instagram"
            icon={<Instagram className="h-6 w-6 text-pink-600" />}
            data={instagram}
          />
          <PlatformCard
            platform="facebook"
            icon={<Facebook className="h-6 w-6 text-blue-600" />}
            data={facebook}
          />
        </div>
      </div>
    </div>
  );
}
