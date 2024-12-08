import Search from "@/components/search";
import { LayoutProps } from "@/types/component";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative h-screen w-full flex flex-col items-center overflow-y-hidden">
      <Search />
      <>{children}</>
    </div>
  );
}
