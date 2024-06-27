import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="min-h-screen w-screen container">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
