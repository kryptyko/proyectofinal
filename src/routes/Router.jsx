import { createBrowserRouter } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import Home from "../components/Home/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../components/Profile";
import ArticleList from "../components/Articles/ArticleList";
import ArticlesDeploy from "../components/Articles/ArticlesDeploy";
import NotFound from "../components/NotFound/NotFound";
// import ArticleDetail from "../components/ArticleDetail/ArticleDetail";
//import SongList from "../components/MusicPlayer/SongList";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                //element: <Home />,
                element : <ArticleList />,
            },
            {
                path: "articles",
                children: [
                    {
                        index: true,
                        element: <ArticleList />,
                    },
                    {
                        path: ":id",
                        element: <ArticlesDeploy/>,
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
        element: <NotFound />,
    },
]);

export { Router };