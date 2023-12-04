import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Activation from "./pages/Activation";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryCreate from "./pages/CategoryCreate";
import Posts from "./pages/AllPost";
import PostDetail from "./pages/Posts/PostDetail";
import PostEdit from "./pages/Posts/PostEdit";
import CreatePost from './pages/Posts/CreatePost';
//import PostDetail from "./pages";
//import AllPosts from './AllPosts';
import Single from './pages/SinglePost';
import CommentsByPost from './pages/CommentsByPost';
import CreateComment from './pages/Messages/CreateComment';
import PostCategories from './pages/PostCategories';
import PostLikes from './pages/PostLikes';

import CreateLike from './pages/CreateLike';
import UpdatePost from './pages/UpdatePost';
import "./style.scss";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/post/:id", element: <Single /> },
            { path: "/write", element: <Write /> },
            { path: "/categories", element: <Categories /> },
            { path: "/categories/create", element: <CategoryCreate  /> },
            { path: "/categories/:categoryId", element: <CategoryDetail /> },
            { path: "/categories/:categoryId/edit", element: <CategoryEdit /> },
           // { path: "/categories/:categoryId/posts", element: <CategoryPosts /> },
            { path: "/posts", element: <Posts /> },
            { path: "/posts/create", element: <CreatePost /> },
            { path: "/posts/:postId", element: <PostDetail /> },
            { path: "/posts/:postId/edit", element: <PostEdit /> },
            //{ path: "/posts/:postId/single", element: <SinglePost /> },
            { path: "/posts/:postId/comments", element: <CommentsByPost /> },
            { path: "/posts/:postId/comments/create", element: <CreateComment /> },
            { path: "/posts/:postId/categories", element: <PostCategories /> },
            { path: "/posts/:postId/likes", element: <PostLikes /> },
            { path: "/createpost", element: <CreatePost /> },
            { path: "/posts/:postId/like", element: <CreateLike /> },
            { path: "/posts/:postId/update", element: <UpdatePost /> },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/activation/:activation_token", element: <Activation /> },
]);

function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
