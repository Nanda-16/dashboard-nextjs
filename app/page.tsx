"use client";
import Alert from "@/components/Alert";
import Container from "@/components/Container";
import Header from "@/components/login/Header";
import LoginForm from "@/components/login/LoginForm";
import { selectUser, userLogin } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user_data && user_data.access_token) {
      router.push("/home");
    }
  }, []);

  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <Header />
      <Container>
        {toast && (
          <div className="w-full flex justify-end px-3">
            <Alert
              variant="danger"
              message="Invalid E-mail or Password"
              title="Login Failed"
              className="w-1/2"
              close
            />
          </div>
        )}

        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </Container>
    </>
  );
}
