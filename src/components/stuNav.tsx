import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

import { Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { buttonVariants } from "./ui/button";
import axios from 'axios';

import { stunavlinks } from "@/constants";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://backend.foworks.com.tr/auth/logout", {}, {
        withCredentials: true, // Send cookies along with the request
      });
      console.log(response.data); // Debugging: Check the response from the server
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-black dark:border-b-slate-700 dark:bg-background text-white ">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a href="/" className="ml-2 font-bold text-xl flex">
              FOWORKS
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                  FOWORKS
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {stunavlinks.map(({label,path }) => (
                    <a
                      key={label}
                      href={path}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                    Github
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {stunavlinks.map((route, i) => (
              <a
                href={route.path}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring" onClick={handleLogout}>
            {/* <a
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            > */}
              {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                 Giriş Yap
            {/* </a> */}
          </button> 
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Nav;