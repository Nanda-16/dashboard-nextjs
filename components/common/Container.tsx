import { PropsWithChildren, useState } from "react";
import { ContainerStyles } from "../styles/styles";
import Loading from "./Loading";

interface ContainerProps extends PropsWithChildren {
  className?: string;
  loading?: boolean;
}

const Container = ({ children, className, loading }: ContainerProps) => {
  if (loading) {
    return (
      <div className={`${className} ${ContainerStyles.container}`}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={`${className} ${ContainerStyles.container}`}>
      {children}
    </div>
  );
};

export default Container;
