import Image from "next/image";

export default function DaoCard({ id }: { id: string }) {
  // fetch dao data using id
  const daoData = {
    name: "SoundSphere",
    description: "A DAO for music lovers",
    members: 100,
    image: "/jazz-dao.png",
  };

  const { name, description, members, image } = daoData;

  return (
    <div className="flex gap-4 flex-col bg-card p-5 rounded">
      <div className="h-44 w-50 relative">
        <Image
          className="rounded"
          src={image}
          alt={`${name} Logo`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-text-secondary text-base font-semibold tracking-normal text-left">
          {name}
        </h3>
        <p className="text-xs font-normal leading-[15px] tracking-normal text-left">
          {description}
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2 justify-center items-center ">
          <Image
            src="/people.svg"
            alt="people icon"
            width={22}
            height={18}
            priority
          />
          <p className="text-text-secondary text-xs font-semibold tracking-normal text-left">
            {members}
          </p>
        </div>
        <button className="flex gap-3 justify-center items-center w-max bg-primary-300 text-white py-1 px-5 rounded-[90px]">
          Join
        </button>
      </div>
    </div>
  );
}
