import Login from "./page/login/Login"
import Signin from "./page/signin/Signin"
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LeftBar from "./components/LeftBar/LeftBar";
import RightBar from "./components/RightBar/RightBar";
import Home from "./page/home/Home";
import Profile from "./page/profile/Profile";
import { useContext } from "react";

import { AuthContext } from "./components/Authentification";



function App() {
  const {currentUser} = useContext(AuthContext);

  const Layout = () =>{
    return(
      <div>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({children}) => {
    if (!currentUser){
      return <Navigate to="/login"/>

    }
    return children;
  }
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>,
      children:[
        {
        path:"/",
        element:<Home/>
        },
        {
        path:"/profile/:id",
        element:<Profile/>
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signin",
      element: <Signin/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
