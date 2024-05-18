import Eccomerce from './pages/ecommerce.js';
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";
import {Shipping} from "./pages/shipping";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Eccomerce/>
    },
    {
        path: '/shipping',
        element: <Shipping/>
    },

]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
