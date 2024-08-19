import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faStar, faStarHalfAlt, faExclamationCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Footer from './footer';

const ListingDetails = () => {
  const { id } = useParams();
  const form = {
    name: 'Business Name',
    image: 'https://via.placeholder.com/500',
    location: 'Business Location',
    rating: 4.5,
    rating_count: 20,
    amount_required: 5000,
    investors_fee: 100,
    listing_id: id, // Use the id from URL
    range: 'gold',
  };

  const auth_user = true;
  const plan = 'gold';
  const subscrib_id = '123';

  const unlockBySubs = (listingId, subscribId, plan) => {
    console.log(`Unlocking listing ${listingId} with plan ${plan}`);
  };

  const makeSession = (listingId) => {
    console.log(`Making session for listing ${listingId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-green" />);
    }
    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-green" />);
    }
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center py-4 lg:py-8 mt-3">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 my-3 pt-3 w-full flex flex-col md:flex-row justify-center mx-auto gap-4 md:gap-6 lg:gap-8">
          <div className="md:w-1/3 px-6">
            <h2 className="text-[#0A0A0A]/60 text-sm sm:text-xs md:text-sm lg:text-base font-bold">More business information</h2>
            <p className="py-3 text-lg font-semibold text-black">{form.name}</p>
            <p className="py-3 text-[15px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            </p>
            <div className="flex gap-2">
              <div className="flex w-full items-center gap-10">
                {auth_user ? (
                  <a
                    onClick={() => unlockBySubs(form.listing_id, subscrib_id, plan)}
                    className="bg-black hover:bg-green w-1/2 text-sm text-center rounded-full text-white py-[6px] cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faLock} className="mr-2 text-sm" />
                    Unlock To Invest
                  </a>
                ) : (
                  <a
                    onClick={() => makeSession(form.listing_id)}
                    className="bg-gray-700 w-1/2 text-center rounded-lg text-white py-2 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Unlock To Invest
                  </a>
                )}
              </div>
            </div>
            <p className="text-slate-700 text-sm flex gap-2 py-2 whitespace-nowrap items-center py-2 px-2">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-sm text-black font-bold mr-1" />
              Unlock this business to learn more about it and invest
            </p>
            <div className="my-4 text-left">
              <h3 className="font-bold my-3">Reviews</h3>
              <div>
                <img className="inline" src="https://via.placeholder.com/30" alt="User" width="30" />
                <p className="inline text-sm">
                  <b className="text-green-700">Person</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col mr-0">
            <div className="relative">
              <img
                className="w-full max-h-[250px] shadow-sm rounded-lg"
                src={form.image}
                alt="Business"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-60 rounded-b-lg text-white text-center py-2">
                <p className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {form.location}
                </p>
              </div>
            </div>
            <div className="w-full py-3 flex flex-col text-right">
              <div className="text-black font-bold mb-2">
                Amount Requested: <span className="font-semibold text-green-700">${form.amount_required}</span>
              </div>
              <div className="flex items-center justify-end text-right mb-2">
                {renderStars(form.rating)}
              </div>
              <div className="text-gray-500 text-sm">
                {form.rating_count} Ratings
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
