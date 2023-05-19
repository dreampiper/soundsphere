import Image from "next/image";

export default function MusicPlayer({ id }: { id: string }) {
  const musicData = {
    name: "SoundSphere",
    artist: "Jazz DAO",
    songTitle: "Jazz Music",
    fromDAO: "Jazz DAO",
    image: "/jazz-dao.png",
  };

  const { name, artist, songTitle, fromDAO, image } = musicData;

  return (
    <div className="flex justify-between">
      <div className="flex gap-8 justify-center items-center ">
        <div className="h-[100px] w-[100px] relative">
          <Image
            className="rounded"
            src={image}
            alt={`${name} Logo`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-col gap-1 text-text-secondary">
          <h3 className="text-lg font-normal leading-[22px] tracking-normal text-left;">
            {artist}
          </h3>
          <p className="text-lg font-bold leading-[22px] tracking-normal text-left">
            {songTitle}
          </p>
          <p className="text-xs font-normal leading-[15px] tracking-normal text-left">
            <span className="text-xs font-semibold leading-[15px] tracking-normal text-left">from:</span> {fromDAO}
          </p>
        </div>
      </div>

      <Image src="/play.svg" alt="play icon" width={48} height={48} priority />
    </div>
  );
}
