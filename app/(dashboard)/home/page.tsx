"use client";
import withAuth from "@/app/withAuth";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { selectUser } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

export const metadata = {
  title: "Home - Employee Mananager",
  description: "Employee Manangement application",
};

function Home() {
  const { user_data } = useAppSelector(selectUser);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (user_data.access_token !== "") {
      setLogin(true);
    }
  }, []);
  
  return (
    <>
      <Container>
        {login ? (
          <div className="mx-auto flex justify-center align-middle">
            Welcome
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}

export default withAuth(Home);
