import type { ReactNode } from "react";

interface Props {
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  onClick: () => void;
  children?: ReactNode;
}

function Button({ color = "primary", onClick, children = "Button" }: Props) {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
