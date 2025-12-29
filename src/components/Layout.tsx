import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        backgroundImage: "url(/temp_back.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full max-w-[700px] min-h-screen bg-white/20 backdrop-blur-sm"
        // style={
        //   location.pathname.includes("/letter")
        //     ? {
        //         backgroundImage: "url(/temp_letter.png)",
        //         backgroundSize: "contain",
        //         backgroundPosition: "center",
        //         backgroundRepeat: "no-repeat",
        //       }
        //     : {}
        // }
      >
        {children}
      </div>
    </div>
  );
}
