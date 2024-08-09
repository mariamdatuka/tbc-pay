import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mt-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
