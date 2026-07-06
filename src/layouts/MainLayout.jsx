// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/layout/Sidebar";
// import Navbar from "../components/layout/Navbar";

// function MainLayout() {
//   return (
//     <div className="flex min-h-screen bg-[#0B1120] text-white">

//       <Sidebar />

//       <div className="flex flex-col flex-1">

//         <Navbar />

//         <main className="flex-1 overflow-y-auto">
//           <Outlet />
//         </main>

//       </div>

//     </div>
//   );
// }

// export default MainLayout;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0B1120] text-white">
      <Sidebar />

      <div className="flex-1 md:ml-[260px]">
        <Navbar />

        <main className="p-6 border-4 border-red-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;