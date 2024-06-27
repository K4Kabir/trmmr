import { createContext, useEffect } from "react";
import { getCurrentUser } from "@/utils/authApis";
import useFetch from "@/lib/useFetch";

export const User = createContext();
const UserContext = function ({ children }) {
  const { data: user, fn: getUser, loading, error } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    getUser();
  }, []);

  return (
    <User.Provider value={{ user, getUser, loading, error, isAuthenticated }}>
      {children}
    </User.Provider>
  );
};

export default UserContext;
