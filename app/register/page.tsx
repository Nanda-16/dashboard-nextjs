"use client";
import Alert from "@/components/Alert";
import Container from "@/components/Container";
import Header from "@/components/login/Header";
import RegisterForm from "@/components/login/RegisterForm";
import { userRegister } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const metadata = {
  title: "Register - Employee Mananager",
  description: "Employee Manangement application",
};

export default function Register() {
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
      <Header />
      <Container>
        {toast && (
          <div className="w-full flex justify-end px-3">
            <Alert
              variant="danger"
              message="The given data was invalid"
              title="Registeration Failed"
              className="w-1/2"
              close
            />
          </div>
        )}

        <RegisterForm onSubmit={handleSubmit} loading={loading} />
      </Container>
    </>
  );
}
