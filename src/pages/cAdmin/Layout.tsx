import { Outlet } from "react-router-dom";


const RootLayout = () => {

  return (
      <div>
        {/* <NavBarLayout /> */}
          <Outlet />
      </div>
  );
};

export default RootLayout;
