import { FC, MouseEventHandler } from "react";
import "./Button.css";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  theme?: "classic" | "danger" | "success";
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = ({ text, type, theme, onClick }) => {
  return (
    <button
      className={
        theme
          ? `btn-component btn-component--${theme}`
          : "btn-component btn-component--classic"
      }
      type={type ? type : "submit"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
