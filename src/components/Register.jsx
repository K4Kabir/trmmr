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
import { SignUp } from "@/utils/authApis";
import { Loader } from "lucide-react";
import Error from "./error";
import { toast } from "./ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleInput = function (e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { loading, fn, error, data } = useFetch(SignUp, formData);

  useEffect(() => {
    if (data && error === null) {
      toast({
        title: "User Created Successfully",
        description: "Please Login again with your credentials",
      });
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
          <CardDescription>Register your new Account!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {error && <Error>{error.message}</Error>}
          <Input
            onChange={(e) => handleInput(e)}
            name="name"
            required
            type="text"
            placeholder="username"
          />
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
            {loading && <Loader className="animate animate-spin" />}Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
