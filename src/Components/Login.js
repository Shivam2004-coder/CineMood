import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [ isSignInForm , setSignInForm ] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);

    const toggleSignInSignUpForm = () => {
        setErrorMessage(null);
        setSignInForm(!isSignInForm);
    };

    const userName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleSubmitButton = () => {
        //  Validate our sign in sign up form
        const message = checkValidData( isSignInForm ? null : userName.current.value , email.current.value , password.current.value , isSignInForm );

        setErrorMessage(message);
        if( message ){
            return ;
        }

        // Sign In / Sign Up

        if ( !isSignInForm ) {
            // Sign Up Logic
            createUserWithEmailAndPassword(auth , email.current.value , password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // console.log(userName.current.value);
                    updateProfile(user, {
                        displayName: userName.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                        }).then(() => {
                            // Profile updated!
                            const updatedUser = auth.currentUser;
                            dispatch(addUser({
                                uid: updatedUser.uid,
                                email: updatedUser.email,
                                displayName: updatedUser.displayName
                            }));
                            navigate("/browse");
                            // ...
                        }).catch((error) => {
                            setErrorMessage(error.message);
                        });
                        
                    })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                    // ..
                });
                
            }
            else{
                // Sign In Logic
                signInWithEmailAndPassword(auth, email.current.value , password.current.value )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });

        }
        

    }

    return (
        <div className="absolute w-screen h-screen overflow-hidden">
            <Header/>
            
            <div className="absolute" >
                <img 
                    src="/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_medium.jpg" 
                    alt="netflix-backgroung-img" 
                />
            </div>
            <form onSubmit={(e) => e.preventDefault() } className="rounded-sm flex flex-col absolute bg-gray-900 w-4/12 my-16 mx-auto right-0 left-0 items-start justify-center p-8 bg-opacity-85">
                {isSignInForm && <h1 className="font-bold text-xl mb-4 text-white">Sign In</h1>}
                {!isSignInForm && <h1 className="font-bold text-xl mb-4 text-white">Sign Up</h1>}
                {!isSignInForm && <input
                    ref={userName} 
                    type="text"
                    placeholder="User Name"
                    className="rounded-sm h-10 w-full mb-4 text-black bg-gray-600 border border-black p-2"
                /> }
                
                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="rounded-sm h-10 w-full mb-4 text-black bg-gray-600 border border-black p-2"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="rounded-sm h-10 w-full mb-4 text-black bg-gray-600 border border-black p-2"
                />
                <p className="font-bold text-red-700 text-xl" >{errorMessage}</p>
                <button className="
                                                    rounded-md 
                                                    h-14 
                                                    w-full 
                                                    mb-4 
                                                    mt-4 
                                                    text-white 
                                                    bg-red-600 
                                                    border 
                                                    border-black 
                                                    p-2"
                                        onClick={handleSubmitButton} >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                
                { isSignInForm && <p className="text-white">New to Netflix? <span 
                                                            onClick={toggleSignInSignUpForm} 
                                                            className="text-white hover:underline hover:text-blue-500 active:text-white cursor-pointer font-bold"
                                                            >
                                                                Sign Up
                                                            </span>
                </p> }
                { !isSignInForm && <p className="text-white">Already Registered? <span 
                                                            onClick={toggleSignInSignUpForm} 
                                                            className="text-white hover:underline hover:text-blue-500 active:text-white cursor-pointer font-bold"
                                                            >
                                                                Sign In
                                                            </span>
                </p> }
                
            </form>

        </div>
    )
};

export default Login;