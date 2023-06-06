"use client";
import { userRegister } from "@/redux/features/userSlice";
import Alert from "../common/Alert";
import Container from "../common/Container";
import RegisterForm from "./RegisterForm";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

function Register() {
  const dispatch = useAppDispatch();
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: {}) => {
    try {
      setLoading(true);
      const response = await dispatch(userRegister({ formData: data }));

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
          title="Registration Failed"
          show={toast}
          close
        />

        <RegisterForm onSubmit={handleSubmit} loading={loading} />
      </Container>
    </>
  );
}

export default Register;
