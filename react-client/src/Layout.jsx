import { Outlet } from "react-router-dom";
import Header from "../src/components/Header";

export default function Layout() {
  return (
      <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
