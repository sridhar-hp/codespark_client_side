import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0B1120] text-white">
      <Sidebar />

      <div className="flex-1 md:ml-[260px]">
        <Navbar />

        {/* <main className="flex-1 overflow-y-auto p-6 bg-[#0B1120]">
          <div className="min-h-full rounded-3xl bg-[#0F172A] border border-[#1F2937] p-8">
            <Outlet />
          </div>
        </main> */}

        <main
          className="
    flex-1
    mt-4
    mx-4
    mb-4
    rounded-3xl
    bg-[#0F172A]
    border border-[#1F2937]
    overflow-y-auto
    p-8
  "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;