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
import CategoryPosts from "./pages/CategoryPosts";
import Posts from "./pages/AllPost";
//import PostDetail from "./pages";
//import AllPosts from './AllPosts';
import Single from './pages/SinglePost';
import CommentsByPost from './pages/CommentsByPost';
import CreateComment from './pages/CreateComment';
import PostCategories from './pages/PostCategories';
import PostLikes from './pages/PostLikes';
import CreatePost from './pages/CreatePost';
import CreateLike from './pages/CreateLike';
import UpdatePost from './pages/UpdatePost';
import "./style.scss";
import AcountManegment from "./pages/AcountManegment";
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';
import CreateUser from './pages/CreateUser';
import ChangeAvatar from './pages/ChangeAvatar';
import UpdateUser from './pages/UpdateUser';
import DeleteUser from './pages/DeleteUser';
import UserManager from './pages/UserManager';
import ChangePassword from "./pages/ChangePassword";
import MyAccount from "./pages/MyAccounts";
import AllUsers from "./pages/AllUsers";
import NewUser from "./pages/NewUser";

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
            { path: "/acountManegment", element: <AcountManegment /> },
            { path: "/write", element: <Write /> },
            { path: "/categories", element: <Categories /> },
            { path: "/categories/:categoryId", element: <CategoryDetail /> },
            { path: "/categories/:categoryId/posts", element: <CategoryPosts /> },
            { path: "/posts", element: <Posts /> },
            //{ path: "/posts/:postId", element: <PostDetail /> },
            //{ path: "/posts/:postId/single", element: <SinglePost /> },
            { path: "/posts/:postId/comments", element: <CommentsByPost /> },
            { path: "/posts/:postId/comments/create", element: <CreateComment /> },
            { path: "/posts/:postId/categories", element: <PostCategories /> },
            { path: "/posts/:postId/likes", element: <PostLikes /> },
            { path: "/posts/create", element: <CreatePost /> },
            { path: "/posts/:postId/like", element: <CreateLike /> },
            { path: "/posts/:postId/update", element: <UpdatePost /> },
            { path:"/users", element:<UserList />},
            { path:"/users/:userId", element:<UserDetails />},
            { path:"/create", element:<CreateUser />},
            { path:"/change-avatar", element:<ChangeAvatar />},
            { path:"/update/:userId", element:<UpdateUser />},
            { path:"/delete/:userId", element:<DeleteUser />},
            { path:"/manager", element:<UserManager />}
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/activation/:activation_token", element: <Activation /> },
    { path: "/resetPassword/:confirmToken", element: <ChangePassword /> },
    { path:"/myAccount", element:<MyAccount />},
    { path:"/users", element:<AllUsers />},
    { path:"/users/:userId", element:<UserDetails/>},
    { path:"/newUser", element:<NewUser/>},
    { path:"/updateUser/:userId", element:<UpdateUser />}
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
