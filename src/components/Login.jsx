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
import { LoginFn, LoginWithGoogle } from "@/utils/authApis";
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
  const {
    loading: googleLoading,
    fn: googleLoginFn,
    err: googleError,
  } = useFetch(LoginWithGoogle);
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
        <CardFooter className="w-[100%] flex flex-col gap-4">
          <Button className="w-[100%]" type="submit" disabled={loading}>
            {loading && <Loader className="animate animate-spin" />}Login
          </Button>
          <Button
            onClick={() => googleLoginFn()}
            variant="outline"
            className="w-[100%]"
            type="button"
            disabled={loading}
          >
            {loading && <Loader className="animate animate-spin" />}Login with{" "}
            <svg
              className="ml-3"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
