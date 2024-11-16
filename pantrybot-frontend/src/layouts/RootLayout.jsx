import { Outlet } from "react-router-dom";
import ThemedNavbar from "../components/navigation/ThemedNavbar";

export default function RootLayout() {
  return (
    <>
      <div className="position-fixed w-100 z-3">
        <ThemedNavbar />
      </div>
      <div style={{ paddingTop: "83px" }}>
        <Outlet />
      </div>
    </>
  );
}
