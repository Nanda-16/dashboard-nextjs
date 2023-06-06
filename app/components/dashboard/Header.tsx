"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarCollapse,
  NavbarHead,
  NavbarLink,
  NavbarNav,
  NavbarToggler,
} from "../common/Navbar";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectUser } from "@/redux/features/userSlice";
import { persistor } from "@/redux/store";

const home = [
  { name: "Home", href: "/home" },
  { name: "Employees", href: "/employees" },
  { name: "Designation", href: "/designations" },
];

function Header() {
  const { user_data } = useAppSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLogin(Boolean(user_data?.access_token));
  }, []);

  const handleLogout = async () => {
    try {
      await persistor.purge();
      dispatch(logout());
      router.replace("/?login=true");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar className="bg-neutral-600 text-white">
        <NavbarHead href="/">Employee Manager</NavbarHead>
        {login && (
          <>
            <NavbarToggler />

            <NavbarCollapse>
              <NavbarNav orientation="start">
                <NavbarLink navLinks={home} />
              </NavbarNav>
              {pathname === "/home" && (
                <NavbarNav orientation="end">
                  <div onClick={() => setModal(true)}>
                    <span className="hover:underline text-white">Logout</span>
                  </div>
                </NavbarNav>
              )}
            </NavbarCollapse>
          </>
        )}
      </Navbar>
      <Modal show={modal} onClose={() => setModal}>
        <form>
          <Modal.Content>
            <Modal.Body className="">Do you really want to Logout ?</Modal.Body>
          </Modal.Content>

          <Modal.Footer>
            <Button
              size="default"
              variant="danger"
              type="submit"
              onClick={handleLogout}
            >
              Yes
            </Button>

            <Button
              size="default"
              variant="secondary"
              type="button"
              onClick={() => setModal(false)}
            >
              No
            </Button>
          </Modal.Footer>
        </form>
      </Modal>{" "}
    </>
  );
}

export default Header;
