import Wrapper from "./wrapper";

interface Props {
  data: string[];
}

export default function Topic({ data }: Props) {
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
