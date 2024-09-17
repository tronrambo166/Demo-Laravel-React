import heroimg from "../../images/heroimg.png";
import leftArrow from "../../images/left vector.png";
import rightArrow from "../../images/right vector.png";

const Hero2 = () => {
  return (
    <div className="flex justify-center relative items-center py-6 gap-4">
         <img
                src={leftArrow}
                alt="Left Arrow"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                style={{ height: "100px", width: "auto" }}
            />
            <img
                src={rightArrow}
                alt="Right Arrow"
                className="absolute right-0 top-1/3 transform -translate-y-1/2 z-10"
                style={{ height: "100px", width: "auto" }}
            />

        <div>
        <h2 className="text-lg pb-4 font-semibold text-[#0A0A0A]/60">
                        Welcome to Jitume
                    </h2>
                    <h1 className="text-2xl py-4 text-black font-bold">
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
                    <button
                        // onClick={handleOpenAuthModal}
                        className="btn-primary my-4 font-semibold w-[125px] h-[50px] whitespace-nowrap rounded-2xl mx-auto lg:mx-0"
                    >
                        Join today
                    </button>
        </div>
        <img src={heroimg} />
    </div>
  )
}

export default Hero2