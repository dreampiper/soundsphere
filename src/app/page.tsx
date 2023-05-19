import DaoCard from "@/components/DaoCard";
import MusicPlayer from "@/components/MusicPlayer";
import ProfileNav from "@/components/ProfileNav";

export default function Home() {
  return (
    <>
      <ProfileNav />

      <div className="flex gap-4 flex-col w-full">
        <h2 className={`text-2xl text-text-secondary font-semibold`}>
          Recommended
        </h2>

        <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <DaoCard id={"jdj"} />
          <DaoCard id={"jdj"} />
        </div>
      </div>

      <div className="flex gap-4 flex-col w-full">
        <h2 className={`text-2xl text-text-secondary font-semibold`}>
          Featured songs
        </h2>

        <div className="flex flex-col gap-4">
          <MusicPlayer id={"jdj"} />
          <MusicPlayer id={"jdj"} />
        </div>
      </div>
    </>
  );
}
