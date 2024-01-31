import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

const AuhtorizedRoute = () => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("auth"));
    if (!token && storedUserData?.token) {
      dispatch(setCredentials(storedUserData));
    }
  }, []);

  return token ? <Outlet /> : <p>Nemate prava da pristupite ovoj stranici</p>;
};
export default AuhtorizedRoute;
