import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-light px-5 flex items-center justify-center min-h-[calc(100vh-5.5rem)]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
