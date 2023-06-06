import { Navbar, NavbarHead } from "../common/Navbar";

function Header() {
  return (
    <Navbar className="bg-neutral-600 text-white">
      <NavbarHead href="/">Employee Manager</NavbarHead>
    </Navbar>
  );
}

export default Header;