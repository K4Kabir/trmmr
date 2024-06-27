import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(User);
  return (
    <div className="flex flex-col h-[90vh] justify-center items-center gap-6">
      <p className="text-3xl font-extrabold">
        The Only URL Shortner you will ever need! 👇
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isAuthenticated) {
            navigate(`/auth?createNew=${longUrl}`);
            return;
          }
          navigate(`/dashboard?createNew=${longUrl}`);
        }}
        className="flex gap-3 w-full"
      >
        <Input
          required
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          type="text"
          placeholder="Your Long URL"
        />
        <Button className="bg bg-green-400">Shorten!!</Button>
      </form>
    </div>
  );
};

export default Landing;
