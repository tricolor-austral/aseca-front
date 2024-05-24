import Eccomerce from './pages/ecommerce.js';
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";
import {Shipping} from "./pages/shipping";
import Login from "./pages/login";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
    {
        path: '/eccomerce',
        element: <Eccomerce/>
    },
    {
        path: '/',
        element: localStorage.getItem('token') ? <Shipping /> : <LoginPage />
    },

]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
