import { useState } from "react";
import Header from "./Header";

const Login = () => {
    
    const [ isSignInForm , setSignInForm ] = useState(true);

    const toggleSignInSignUpForm = () => {
        setSignInForm(!isSignInForm);
    };

    return (
        <div className="absolute w-screen h-screen overflow-hidden">
            <Header/>
            
            <div className="absolute" >
                <img 
                    src="/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_medium.jpg" 
                    alt="netflix-backgroung-img" 
                />
            </div>
            <form className="rounded-sm flex flex-col absolute bg-gray-900 w-4/12 my-16 mx-auto right-0 left-0 items-start justify-center p-8 bg-opacity-85">
                {isSignInForm && <h1 className="font-bold text-xl mb-4 text-white">Sign In</h1>}
                {!isSignInForm && <h1 className="font-bold text-xl mb-4 text-white">Sign Up</h1>}
                {!isSignInForm && <input
                    type="text"
                    placeholder="Full Name"
                    className="rounded-sm h-10 w-full mb-4 text-black bg-gray-500 border border-black p-2"
                /> }
                
                <input
                    type="text"
                    placeholder="Email Address"
                    className="rounded-sm h-10 w-full mb-4 text-black bg-gray-500 border border-black p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="rounded-sm h-10 w-full mb-4 text-black bg-gray-500 border border-black p-2"
                />
                {isSignInForm && <button className="rounded-md h-14 w-full mb-4 mt-4 text-white bg-red-600 border border-black p-2">
                    Sign In
                </button> }

                {!isSignInForm && <button className="rounded-md h-14 w-full mb-4 mt-4 text-white bg-red-600 border border-black p-2">
                    Sign Up
                </button> }
                
                { isSignInForm && <p className="text-white">New to Netflix? <span 
                                                            onClick={toggleSignInSignUpForm} 
                                                            className="text-white hover:underline hover:text-blue-500 active:text-white cursor-pointer font-bold"
                                                            >
                                                                Sign In
                                                            </span>
                </p> }
                { !isSignInForm && <p className="text-white">Already Registered? <span 
                                                            onClick={toggleSignInSignUpForm} 
                                                            className="text-white hover:underline hover:text-blue-500 active:text-white cursor-pointer font-bold"
                                                            >
                                                                Sign Up
                                                            </span>
                </p> }
                
            </form>

        </div>
    )
};

export default Login;