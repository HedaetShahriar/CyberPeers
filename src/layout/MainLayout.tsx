import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <>
    <Sidebar />
    <div>
        <Header />
        <Outlet />
    </div>
    </>
  );
};

export default MainLayout;
