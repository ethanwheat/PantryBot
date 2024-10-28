import { Outlet } from "react-router-dom";
import ThemedNavbar from "../components/navigation/ThemedNavbar";

export default function RootLayout() {
    return (
    <>
      <ThemedNavbar />
      <Outlet />
    </>
  )
}
