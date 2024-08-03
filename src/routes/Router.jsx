import { createBrowserRouter } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../components/Profile";
import ArticlesList from "../components/Articles/ArticlesList";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                //element: <Home />,
                element : <ArticlesList/>,
            },
            {
                path: "articles",
                children: [
                    {
                        index: true,
                        element: <ArticlesList/>,
                    },
                    {
                        path: "add",
                        element: (
                            <ProtectedRoute>
                                <ArticleForm />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                //path: "songs",
                //element: <SongList />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };