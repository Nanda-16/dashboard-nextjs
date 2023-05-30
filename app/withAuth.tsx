import { selectUser } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const { user_data } = useAppSelector(selectUser);

    useEffect(() => {
      if (user_data && user_data.access_token === "") {
        router.push("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
