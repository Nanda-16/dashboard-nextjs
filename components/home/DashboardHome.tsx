"use client";
import { selectUser } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import Container from "../common/Container";
import { useRouter } from "next/navigation";

function DashboardHome() {
  const { user_data } = useAppSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (user_data.access_token !== "") {
      setLoading(false);
    } else {
      router.push("/");
    }
    // setLoading(Boolean(user_data.access_token));
  }, []);

  return (
    <Container loading={loading}>
      <div className="mx-auto flex justify-center align-middle">Welcome</div>
    </Container>
  );
}

export default DashboardHome;
