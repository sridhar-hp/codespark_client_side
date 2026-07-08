import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
    return (
        <div className="min-h-screen bg-[#0B1120] text-white">

            <Sidebar />

            <div className="md:ml-[290px] flex flex-col min-h-screen">

                <Navbar />

                <main className="
        flex-1
        p-6
        rounded-[32px]
        overflow-hidden
    ">
                    <div className="mt-4 min-h-full rounded-3xl border border-[#1F2937] bg-[#0F172A] p-8">
                        <Outlet />
                    </div>
                </main>

            </div>

        </div>
    );
}

export default MainLayout;