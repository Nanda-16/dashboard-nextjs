"use client";
import Image from "next/image";
import Link from "next/link";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import FormField from "../Form";

interface RegisterType {
  name: string;
  email: string;
  password: string | number;
  password_confirmation: string | number;
}
export default function RegisterForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: {}) => void;
  loading?: boolean;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.password_confirmation) {
      setErrorMessage("* Passwords do not match");
      return;
    }
    if (
      data.name &&
      data.email &&
      data.password &&
      data.password_confirmation
    ) {
      onSubmit(data);
      setData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:pt-10">
        <Card className="mx-3 sm:mx-auto sm:my-0">
          <Card.Header className="bg-white border-none pt-5 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mt-20 sm:mt-28 md:mt-10">
            WELCOME
          </Card.Header>
          
          <Card.Body className="px-10 pb-5">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="mb-12 md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
                <form className="w-full max-w-md mt-3" onSubmit={handleSubmit}>
                  <FormField>
                    <FormField.Label htmlFor="registerFullName">
                      Full Name
                    </FormField.Label>

                    <FormField.Input
                      id="registerFullName"
                      type="text"
                      name="name"
                      ref={inputRef}
                      value={data?.name}
                      onChange={handleInput}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormField.Label htmlFor="registerEmail">
                      Email
                    </FormField.Label>

                    <FormField.Input
                      id="registerEmail"
                      type="email"
                      name="email"
                      value={data?.email}
                      onChange={handleInput}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormField.Label htmlFor="registerPassword">
                      Password
                    </FormField.Label>

                    <FormField.Input
                      id="registerPassword"
                      type="password"
                      minLength={8}
                      name="password"
                      value={data?.password}
                      onChange={handleInput}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormField.Label htmlFor="registerpassword_confirmation">
                      Confirm Password
                    </FormField.Label>

                    <FormField.Input
                      id="registerpassword_confirmation"
                      type="password"
                      minLength={8}
                      name="password_confirmation"
                      value={data?.password_confirmation}
                      onChange={handleInput}
                      required
                    />
                  </FormField>

                  {errorMessage && (
                    <div className="text-red-500 text-[0.9em] w-full text-center lg:text-right">
                      <small>{errorMessage}</small>
                    </div>
                  )}

                  <div className="text-center lg:text-right mt-3">
                    <Button type="submit" variant="primary" size="default">
                      {loading ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-4 h-4 mr-2 text-white animate-spin  fill-violet-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="">Loading...</span>
                        </div>
                      ) : (
                        "Register"
                      )}
                    </Button>

                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                      Has an account?
                      <Link
                        href="/"
                        className="text-red-600 hover:text-red-400 focus:text-red-400 outline-none active:text-danger-700"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
              
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-8/12 md:shrink-0 lg:w-5/12 xl:w-5/12">
                <Image
                  src="/images/login.png"
                  alt="login"
                  width={300}
                  height={10}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
