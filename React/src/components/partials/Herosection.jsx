import heroimg from "../../images/heroimg.png";
import leftArrow from "../../images/left vector.png";
import rightArrow from "../../images/right vector.png";

const Herosection = () => {
    return (
        <div className="bg-white h-[80vh] relative mt-8">
            {/* Vector on the left */}
            <img
                src={leftArrow}
                alt="Left Arrow"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                style={{ height: "100px", width: "auto" }}
            />

            {/* Vector on the right */}
            <img
                src={rightArrow}
                alt="Right Arrow"
                className="absolute right-0 top-1/3 transform -translate-y-1/2 z-10"
                style={{ height: "100px", width: "auto" }}
            />

            <div className="flex justify-center flex-col lg:flex-row gap-[24px] lg:items-center lg:gap-[10px] text-center lg:text-left mx-auto w-full lg:w-[832.55px] h-[406.54px] my-[0px]">
                <div className="flex flex-col gap-[24px] ">
                    <h2 className="text-sm font-semibold text-[#0A0A0A]/60">
                        Welcome to Jitume
                    </h2>
                    <h1 className="text-2xl text-black font-bold">
                        Real businesses, real <br className="hidden lg:block" />{" "}
                        solutions,
                        <span className="text-green font-bold text-dark-green">
                            {" "}
                            real change
                        </span>
                    </h1>
                    <h2 className="text-md text-[#0A0A0A] font-semibold">
                        Invest in a business you believe in with{" "}
                        <br className="hidden lg:block" /> as little as $100
                    </h2>
                    <button className="btn-primary font-semibold w-[125px] h-[50px] whitespace-nowrap rounded-2xl mx-auto lg:mx-0">
                        Join today
                    </button>
                </div>
                <div>
                    <img
                        src={heroimg}
                        alt="hero-image"
                        className="w-[380px]  h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Herosection;
