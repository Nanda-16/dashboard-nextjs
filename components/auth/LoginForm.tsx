"use client";
import Image from "next/image";
import Link from "next/link";
import Card from "../common/Card";
import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import FormField from "../Form";

function LoginForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: {}) => void;
  loading?: boolean;
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.email && data.password) {
      onSubmit(data);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:pt-10">
      <Card className="mx-3 sm:mx-auto sm:my-0">
        <Card.Header className="bg-white border-none pt-5 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mt-20 sm:mt-28 md:mt-10">
          WELCOME BACK
        </Card.Header>

        <Card.Body className="px-8 pb-5">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-8/12 md:shrink-0 lg:w-5/12 xl:w-5/12">
              <Image
                src="/images/login.png"
                alt="login"
                width={300}
                height={10}
              />
            </div>

            <div className="mb-12 md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
              <form className="w-full max-w-md mt-3" onSubmit={handleSubmit}>
                <FormField>
                  <FormField.Label htmlFor="loginEmail">Email</FormField.Label>

                  <FormField.Input
                    id="loginEmail"
                    type="email"
                    name="email"
                    ref={inputRef}
                    onChange={handleInput}
                    value={data?.email}
                    required
                  />
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="loginPassword">
                    Password
                  </FormField.Label>

                  <FormField.Input
                    minLength={8}
                    id="loginPassword"
                    type="password"
                    onChange={handleInput}
                    name="password"
                    value={data?.password}
                    required
                  />
                </FormField>

                <div className="text-center lg:text-left">
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
                      "Login"
                    )}
                  </Button>

                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Dont has an account?
                    <Link
                      href="/register"
                      className="text-red-600 hover:text-red-400 focus:text-red-400 outline-none active:text-danger-700"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginForm;