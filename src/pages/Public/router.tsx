import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../stores/store";
import { logOut } from "../../stores/authSlice";
import TokenService from "../../services";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state?.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [lastPath, setLastPath] = useState("");

  useEffect(() => {
    if (TokenService.isTokenExpired()) {
      setLastPath(location.pathname + location.search);
      dispatch(logOut());
      TokenService.removeUser();
      return;
    }

    if (!user) return;

    let inactivityTimer: number;

    const handleLogout = () => {
      setLastPath(location.pathname + location.search);
      dispatch(logOut());
      TokenService.removeUser();
    };

    const resetTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(handleLogout, 10 * 60 * 1000);
    };

    resetTimer();

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      window.clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user, location, dispatch]);

  if (!user || TokenService.isTokenExpired()) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{
          from: lastPath || location,
          sessionExpired: TokenService.isTokenExpired(),
        }}
      />
    );
  }

  return <>{children}</>;
}

// export default ProtectedRoute;
