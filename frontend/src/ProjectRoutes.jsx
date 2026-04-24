import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from 'react-router-dom';

// Pages List
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FeatureDetail from "./pages/FeatureDetail";
import Workflow from "./pages/Workflow";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Issue from "./components/issue/Issue";
import Repo from "./components/repo/Repo";

// Auth Context
import { useAuth } from "./authContext";
import CreateRepo from "./components/repo/createRepo";
import Content from "./components/content/content";
import StarredRepos from "./components/repo/StarredRepos";
import CLIGuide from "./pages/CLIGuide";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        const path = location.pathname;
        const isPublicPath = ["/", "/auth", "/signup", "/workflow"].includes(path) || path.startsWith("/features/");

        if (!userIdFromStorage && !isPublicPath) {
            navigate("/auth");
        }

        if (userIdFromStorage && (path === '/auth' || path === '/signup')) {
            navigate("/dashboard");
        }
    }, [currentUser, navigate, setCurrentUser, location.pathname]);

    let element = useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: "features/:id", element: <FeatureDetail /> },
                { path: "workflow", element: <Workflow /> },
                { path: "cli-guide", element: <CLIGuide /> }
            ]
        },
        /* AUTH ROUTES - Matching your userRouter.post("/login" & "/signup") */
        {
            path: "/auth",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        /* DASHBOARD - Your main hub */
        {
            path: "/dashboard",
            element: <Dashboard />
        },
        {
            path: "/userProfile/:id",
            element: <Profile />
        },
        {
            path: "/repo/:id",
            element: <Repo />
        },
        {
            path: "/repo/create",
            element: <CreateRepo />
        },
        {
            path: "/issue/:id",
            element: <Issue />
        },
        {
            path: "/issue",
            element: <Issue />
        },
        {
            path: "/starred",
            element: <StarredRepos />
        },
        {
            path: "/all/Admin2026",
            element: <Content />
        },
        {
            path: "/content/:id",
            element: <Content />
        }
    ]);

    return element;
}

export default ProjectRoutes;