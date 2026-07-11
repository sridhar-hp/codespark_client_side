import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/RegisterPage";
// import ForgotPassword from "./pages/ForgotPassword";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/TasksPage/Tasks";
import GitHub from "./pages/GithubPage/GitHub";
import LeetCode from "./pages/LeetCode/LeetCode";
import Learning from "./pages/Learning/Learning";
import Communication from "./pages/Communication/Communication";
import LinkedIn from "./pages/Linkedin/LinkedIn";
import Analytics from "./pages/Analytics/Analytics";
import Journal from "./pages/Journal/Journal";
// import Reports from "./pages/Reports";
import Achievements from "./pages/Achievements/Achievements";
// import Notifications from "./pages/Notifications";
// import Settings from "./pages/Settings";
// import Profile from "./pages/Profile";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

                {/* Main Application */}
                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/github" element={<GitHub />} />
                    <Route path="/leetcode" element={<LeetCode />} />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="/communication" element={<Communication />} />
                    <Route path="/linkedin" element={<LinkedIn />} />
                    <Route path="/analytics" element={<Analytics />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/achievements" element={<Achievements />} />


                    {/*  
          
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} /> */}

                </Route>

            </Routes>
        </BrowserRouter>
    );
}