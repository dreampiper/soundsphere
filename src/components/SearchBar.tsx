import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="flex max-w-[45rem] relative gap-2 w-full">
      <input className="relative w-full py-3 px-5 ring-1 ring-slate-900/10 text-slate-500 rounded-[90px] shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300" />
      <div className="absolute right-[20px] -translate-y-2/4 top-2/4">
        <Image
          src="/search-variant.svg"
          alt="search icon"
          width={20}
          height={20}
          priority
        />
      </div>
    </div>
  );
}
