import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext, useEffect } from "react";
import { User } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import useFetch from "@/lib/useFetch";
import { logout } from "@/utils/authApis";
import { Loader } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(User);
  const { fn, loading } = useFetch(logout);

  if (loading) {
    return (
      <div className="h-screen w-screen  fixed top-0 left-0 flex justify-center items-center">
        <Loader className="animate animate-spin  " size={30} />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between py-4 ">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          {/* <img className="h-10 rounded-full cursor-pointer " src="/logo.png" /> */}
          <p className="text-2xl font-extrabold">Trimmr/..</p>
        </div>
        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>
                    {user.email?.split("")[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/dashboard"}>
                  <DropdownMenuItem>My Links</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() => {
                    fn().then(() => {
                      window.location.reload();
                    });
                  }}
                  className="text text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
