"use client";

import { useState } from "react";
import { AlertStyles } from "./styles/styles";

interface AlertProps {
  variant: "primary" | "success" | "warning" | "danger";
  title?: string;
  message?: string;
  close?: boolean;
  className?: string;
}

const Alert = ({ className,variant, title, message, close }: AlertProps) => {
  const [show, setShow] = useState(true);
  
  if(!show){
    return <></>
  }
  return (
    <div
    className={`${className} ${AlertStyles.alert} ${AlertStyles.variant[variant]}`}
    role="alert"
  >
    <div className="flex justify-between">
      <div className="flex flex-col animate-pulse">
        <div className="font-bold sm:text-lg text-start">{title}</div>
        <div className="break-words text-start text-sm sm:text-base">
          {message}
        </div>
      </div>
      <div
        className={close ? "pt-4 hidden sm:block" : "hidden"}
        onClick={() => setShow(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  </div>
  );
};

export default Alert;