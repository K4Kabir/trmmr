import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "@/lib/useFetch";
import { LoginFn } from "@/utils/authApis";
import { Loader } from "lucide-react";
import Error from "./error";
import { User } from "@/context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({});

  const handleInput = function (e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { loading, fn, error, data } = useFetch(LoginFn, formData);
  const { getUser } = useContext(User);

  useEffect(() => {
    getUser();
    if (data && error === null) {
      searchParams.get("createNew")
        ? navigate(`/dashboard?createNew=${searchParams.get("createNew")}`)
        : navigate("/dashboard");
    }
  }, [data, error]);

  return (
    <Card className="min-w-[400px]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fn();
        }}
      >
        <CardHeader>
          <CardDescription>Login with existing Account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {error && <Error>{error.message}</Error>}
          <Input
            onChange={(e) => handleInput(e)}
            name="email"
            required
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => handleInput(e)}
            name="password"
            required
            type="password"
            placeholder="Password"
          />
        </CardContent>
        <CardFooter className="w-[100%]">
          <Button className="w-[100%]" type="submit" disabled={loading}>
            {loading && <Loader className="animate animate-spin" />}Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
