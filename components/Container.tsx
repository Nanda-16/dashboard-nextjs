import { ContainerStyles } from "./styles/styles";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <>
      <div className={`${className} ${ContainerStyles.container}`}>{children}</div>
    </>
  );
};

export default Container;