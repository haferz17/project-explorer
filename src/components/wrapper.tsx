interface Props {
  if?: boolean;
  children: React.ReactNode;
}

export default function Wrapper(props: Props) {
  if ("if" in props && !props.if) return null;

  return <>{props.children}</>;
}
