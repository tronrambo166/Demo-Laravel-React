import React from "react";
import { Link } from "react-router-dom";

const CategoryLinks = () => {
    return (
        <div className="flex flex-col pt-8 justify-center px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <ul className="flex flex-wrap gap-4 justify-center">
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#arts-culture" className="no-underline">
                            Arts/Culture
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#auto" className="no-underline">
                            Auto
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#domestic" className="no-underline">
                            Domestic (Home Help etc)
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#fashion" className="no-underline">
                            Fashion
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#finance-accounting" className="no-underline">
                            Finance/Accounting
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#food" className="no-underline">
                            Food
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#legal" className="no-underline">
                            Legal
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#media-internet" className="no-underline">
                            Media/Internet
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#pets" className="no-underline">
                            Pets
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#retail" className="no-underline">
                            Retail
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#real-estate" className="no-underline">
                            Real Estate
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#security" className="no-underline">
                            Security
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#sports-gaming" className="no-underline">
                            Sports/Gaming
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link
                            to="#technology-communications"
                            className="no-underline"
                        >
                            Technology/Communications
                        </Link>
                    </li>
                    <li className="border border-gray-300 text-black rounded-md px-4 py-2 text-sm md:text-base hover:text-green-700">
                        <Link to="#other" className="no-underline">
                            Other
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CategoryLinks;
