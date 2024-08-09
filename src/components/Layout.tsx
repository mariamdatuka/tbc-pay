import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-4 bg-light px-20">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
