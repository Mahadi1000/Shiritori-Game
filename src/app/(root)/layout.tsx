import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({ children }: Readonly<{children:React.ReactNode}>) => {
  return (
    <div className="">
      <Navbar />
      <div className="h-[calc(100vh-120px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
