import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // const location = useLocation();
  return (
    <div
      className="min-h-screen flex justify-center"
      // style={{
      //   backgroundImage: "url(/temp_back.png)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <div
        className="w-full max-w-[700px] min-h-screen max-h-screen"
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
        style={{
          backgroundImage: "url(/temp_letter4.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
