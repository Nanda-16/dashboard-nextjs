"use client";
import Alert from "../common/Alert";
import Container from "../common/Container";
import { useAppDispatch } from "@/redux/hooks";
import { userLogin } from "@/redux/features/userSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

function Login() {
  const dispatch = useAppDispatch();
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: {}) => {
    try {
      setLoading(true);
      const response = await dispatch(userLogin({ formData: data }));

      if (response.payload && response.payload.data) {
        router.push("/home");
      } else {
        setToast(true);
        setLoading(false);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Alert
          variant="danger"
          message="Something went wrong. Please try again"
          title="Login Failed"
          close
          show={toast}
        />
        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </Container>
    </>
  );
}

export default Login;