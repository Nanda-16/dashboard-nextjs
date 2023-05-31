import { ButtonStyles } from "../styles/styles";

type Variant =
  | "primary"
  | "outline-primary"
  | "icon-primary"
  | "secondary"
  | "success"
  | "danger"
  | "icon-danger";

type Size = "default" | "sm" | "lg" | "icon";
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {
  variant: Variant;
  size: Size;
  className?: string;
}

const Button = ({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  const btnClassName = `${className} ${ButtonStyles.btn} ${ButtonStyles.variant[variant]} ${ButtonStyles.size[size]}`;
  return (
    <button className={btnClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
