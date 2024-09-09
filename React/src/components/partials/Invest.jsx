import frame from "../../images/frame.png";

const Invest = () => {
    return (
        <section className="flex flex-col items-center px-4 sm:px-8 py-12 mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center">
                <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left lg:mr-12 mb-8 lg:mb-0">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
                        <p className="text-green text-2xl font-bold">
                            100% of your investment
                        </p>
                        <p className="text-black font-bold text-sm lg:text-base">
                            goes to{" "}
                            <span className="text-green">
                                selected business.
                            </span>
                        </p>
                    </div>
                </div>
                <img
                    src={frame}
                    alt="Investment Frame"
                    className="w-full max-w-lg lg:max-w-xl" // Adjusted size of the image
                />
            </div>
        </section>
    );
};

export default Invest;
