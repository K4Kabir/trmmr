import { Loader } from "lucide-react";
import React from "react";

const MainLoader = ({ text }) => {
  return (
    <div className="h-screen w-screen  fixed top-0 left-0 flex justify-center items-center">
      <Loader className="animate animate-spin  " size={30} />
      {text && <p className="text-3xl text-extrabold">{text}</p>}
    </div>
  );
};

export default MainLoader;
