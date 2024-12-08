import Search from "@/components/search";

export default function Layout({ children }: any) {
  return (
    <div className="relative h-screen w-full flex flex-col items-center overflow-y-hidden">
      <Search />
      <>{children}</>
    </div>
  );
}
