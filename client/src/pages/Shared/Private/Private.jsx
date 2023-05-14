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
  } else {
    return (
      <div className="flex items-center justify-center py-10 spinner spinner-primary">
        <div
          className="radial-progress text-primary-content animate-spin"
          style={{ "--value": 50 }}
        ></div>
      </div>
    );
  }
};

export default Private;
