import heroimg from "../../images/heroimg.png";
import leftArrow from "../../images/left vector.png";
import rightArrow from "../../images/right vector.png";

const Herosection = () => {
    return (
        <div className="bg-white min-h-[80vh] flex items-center justify-center relative px-6 md:px-12">
            {/* Vector on the left */}
            <img
                src={leftArrow}
                alt="Left Arrow"
                className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 md:w-16 lg:w-20"
            />

            {/* Vector on the right */}
            <img
                src={rightArrow}
                alt="Right Arrow"
                className="absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 md:w-16 lg:w-20"
            />

            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 w-full max-w-6xl mx-auto text-center lg:text-left py-8">
                <div className="flex flex-col gap-4 px-4 md:px-0 max-w-lg lg:max-w-none">
                    <h2 className="text-base md:text-lg font-semibold text-[#0A0A0A]/60">
                        Welcome to Jitume
                    </h2>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-black font-bold leading-snug">
                        Real businesses, real <br className="hidden lg:block" />{" "}
                        solutions,
                        <span className="text-dark-green font-bold">
                            {" "}
                            real change
                        </span>
                    </h1>
                    <h2 className="text-md md:text-lg lg:text-xl text-[#0A0A0A] font-semibold leading-relaxed">
                        Invest in a business you believe in with{" "}
                        <br className="hidden lg:block" /> as little as $100
                    </h2>
                    <button className="btn-primary font-semibold w-[150px] h-[50px] lg:w-[175px] lg:h-[60px] whitespace-nowrap rounded-2xl mx-auto lg:mx-0">
                        Join today
                    </button>
                </div>
                <div className="w-full max-w-md lg:max-w-xl">
                    <img
                        src={heroimg}
                        alt="hero-image"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Herosection;
