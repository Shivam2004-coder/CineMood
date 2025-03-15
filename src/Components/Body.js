import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();


    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                
                dispatch(addUser({ uid : uid, email : email, displayName : displayName }));
            } else {
                dispatch(removeUser());
            }
        });
    
        return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
    }, [dispatch]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
};

export default Body;