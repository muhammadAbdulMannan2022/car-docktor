import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Private = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (!loading) {
    return user ? (
      <>{children}</>
    ) : (
      <Navigate to="/login" state={location} replace={true} />
    );
  }
};

export default Private;
