import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    console.log(user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
        }).catch((error) => {
        // An error happened.
            navigate("/error");
        });
    }

    return (
        <div className="border border-black bg-gray-500 bg-opacity-50 w-44 p-3 mr-5 rounded-md">
            <div className="flex items-center" >
                <img alt="userProfileIcon" src="./user-profile-icon.png" className="h-6 w-6 rounded-full m-2" />
                <p>{user.displayName}</p>
            </div>
            <div className="flex items-center" >
                <p className="bg-slate-600 h-6 w-6 rounded-full m-2 text-center">?</p>
                <p>Need Help </p>
            </div>
            <hr className="font-bold border-black border-dotted" />
            <p 
                className="text-center cursor-pointer text-red-600 hover:font-bold hover:underline active:font-normal"
                onClick={handleSignOut}
            >
                Signout
            </p>
        </div>
    )
};

export default About;