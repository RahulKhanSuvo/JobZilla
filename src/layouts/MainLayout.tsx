import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/NavBar/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
