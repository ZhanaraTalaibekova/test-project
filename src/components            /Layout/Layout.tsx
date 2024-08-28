import { Outlet } from "react-router"
import { Header } from "../Header"

export const Layout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  )
}