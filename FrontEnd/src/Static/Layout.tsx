import { Outlet } from "react-router-dom";
import Header from "./Header";
import SIder from "./SIder";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex ">
        <div className="hidden md:flex">
          <SIder />
        </div>
        <div className="flex justify-end w-[100%]">
          <div className="w-full transition-all duration-300 md:w-[calc(100%-320px)] relative flex m-2 p-2 rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
