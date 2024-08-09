import { Link } from "react-router-dom";
import logo from "../assets/icons/tbclogo.svg";

const Header = () => {
  return (
    <>
      <nav className="flex items-center justify-between py-5 px-6 md:px-12">
        <img src={logo} alt="logo" />
        <Link
          to="/"
          className="px-4 py-3 rounded-lg bg-darkPink hover:opacity-75 ease-in-out duration-300 transition-all"
        >
          მთავარი
        </Link>
      </nav>
    </>
  );
};

export default Header;
