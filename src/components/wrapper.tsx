import { WrapperProps } from "@/types/component";

export default function Wrapper(props: WrapperProps) {
  if ("if" in props && !props.if) return null;

  return <>{props.children}</>;
}
