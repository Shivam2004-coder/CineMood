import { useState } from "react";
import About from "./About";
import { useSelector } from "react-redux";

const Header = () => {

    const [isClicked , setIsClicked] = useState();
    const user = useSelector((store) => store.user);

    const handleClickButton = () => {
        setIsClicked(!isClicked);
    }
    return (
        <div className="
                        absolute 
                        w-screen
                        flex 
                        justify-between
                        bg-gradient-to-b from-black z-10" >
            <img 
                src="/Netflix_Logo_PMS.png" 
                alt="netflix-logo" 
                className="
                            h-16 
                            w-44" 
            />
             
             {user && <div className="flex items-center flex-col " >
                    <div onClick={handleClickButton} className="flex mr-28" >
                        <img 
                            src="./user-icon.png" 
                            alt="userIcon" 
                            className="h-10 w-10 rounded-full m-2 "
                        />
                        <span className="text-white font-bold m-2">
                            {isClicked ? "▴" : "▾"}
                        </span> 
                    </div>
                    <div>
                        { isClicked && <About /> }
                    </div>

                </div>
            }
            
        </div>
    )
};

export default Header;