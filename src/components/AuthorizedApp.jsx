import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./SideBar/SideBar";
import { selectCurrentUser, setCredentials } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

const AuthorizedApp = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `UPG - ${location.pathname}`;
  }, [location.pathname]);

  return (
    <div className="root">
      <div>
        <Sidebar
          user={user}
          onLogout={() => {
            dispatch(setCredentials({}));
            localStorage.removeItem("auth");
          }}
        />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthorizedApp;
