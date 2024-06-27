import { User } from "@/context/UserContext";
import { Loader } from "lucide-react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthPage = function ({ children, redirect = "/auth" }) {
  const { user, loading } = useContext(User);

  if (loading) {
    return (
      <div className="h-screen w-screen  fixed top-0 left-0 flex justify-center items-center">
        <Loader className="animate animate-spin  " size={30} />
      </div>
    );
  }
  if (!user && !loading) {
    return <Navigate to={redirect} />;
  }
  return <>{children}</>;
};

export default AuthPage;
