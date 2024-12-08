import Wrapper from "./wrapper";
import { TopicProps } from "@/types/component";

export default function Topic({ data }: TopicProps) {
  return (
    <Wrapper if={data.length > 0}>
      <div className="flex items-center gap-2 flex-wrap">
        {data.map((y: any, i: number) => (
          <p
            key={i}
            className="rounded-lg text-xs font-semibold px-3 py-1 bg-[#F9DBBA] text-[#212121]"
          >
            {y}
          </p>
        ))}
      </div>
    </Wrapper>
  );
}
