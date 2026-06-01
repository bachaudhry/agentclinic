import type { ReactNode } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "./layout.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="ac-layout">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}