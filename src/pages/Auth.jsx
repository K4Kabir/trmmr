import Login from "@/components/Login";
import Register from "@/components/Register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const { user } = useContext(User);

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="h-[90vh] flex flex-col gap-5 justify-center items-center">
      <p className="text-3xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold Up Login First!!"
          : "Login/SignUp"}
      </p>
      <Tabs defaultValue="account">
        <TabsList className="w-[400px]">
          <TabsTrigger className="w-full" value="account">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="password">
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Login />
        </TabsContent>
        <TabsContent value="password">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
