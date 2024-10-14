import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useRouter } from "next/router";

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <React.Fragment>
      {router.pathname !== "/login" || (router.pathname !== "/" && <Navbar />)}{" "}
      {children}
      <Footer />
    </React.Fragment>
  );
}
