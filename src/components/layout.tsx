import Search from "@/components/search";

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative h-screen w-full flex flex-col items-center overflow-y-hidden">
      <Search />
      <>{children}</>
    </div>
  );
}
