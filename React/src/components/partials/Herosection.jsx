import React, { useState } from "react";
import heroimg from "../../images/heroimg.png";
import leftArrow from "../../images/left vector.png";
import rightArrow from "../../images/right vector.png";
import Modal from "./Authmodal"; // Ensure correct import

const Herosection = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleOpenAuthModal = () => {
        console.log("Opening modal..."); // Debugging
        setIsAuthModalOpen(true);
    };

    const handleCloseAuthModal = () => {
        console.log("Closing modal..."); // Debugging
        setIsAuthModalOpen(false);
    };

    return (
        <div className="bg-white relative mt-10">
            {/* Arrows for Navigation */}
            <img
                src={leftArrow}
                alt="Left Arrow"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
                style={{ height: "80px", width: "auto" }}
            />
            <img
                src={rightArrow}
                alt="Right Arrow"
                className="absolute right-0 top-1/3 transform -translate-y-1/2 z-10 hidden md:block"
                style={{ height: "80px", width: "auto" }}
            />

            {/* Hero Section Content */}
            <div className="flex flex-col lg:flex-row justify-center items-center text-center lg:text-left gap-6 lg:gap-10 w-full lg:w-[900px] h-auto mx-auto">
                <div className="flex flex-col gap-6 w-full lg:w-1/2 px-4">
                    <h2 className="text-lg font-semibold text-gray-600">
                        Welcome to Jitume
                    </h2>
                    <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                        Real businesses, real{" "}
                        <br className="hidden lg:block" />
                        solutions,{" "}
                        <span className="text-green font-bold text-dark-green">
                            real change
                        </span>
                    </h1>
                    <h2 className="text-md text-gray-900 font-semibold">
                        Invest in a business you believe in with{" "}
                        <br className="hidden lg:block" /> as little as $100
                    </h2>
                    <button
                        onClick={handleOpenAuthModal}
                        className="btn-primary font-semibold w-40 h-12 rounded-full mx-auto lg:mx-0"
                    >
                        Join today
                    </button>
                </div>

                {/* Hero Image */}
                <div className="w-full lg:w-1/2 px-4">
                    <img
                        src={heroimg}
                        alt="hero-image"
                        className="w-full max-w-[350px] lg:max-w-none mx-auto"
                    />
                </div>
            </div>

            {/* Modal */}
            {isAuthModalOpen && (
                <Modal
                    isOpen={isAuthModalOpen}
                    onClose={handleCloseAuthModal}
                />
            )}
        </div>
    );
};

export default Herosection;
