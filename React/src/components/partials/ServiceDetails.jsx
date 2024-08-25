import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faStar, faStarHalfAlt, faExclamationCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Navbar from './Navbar';

const ServiceDetails = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState('');
  const [rebookRes, setRebookRes] = useState('');
  const [detailsRes, setDetailsRes] = useState('');
  const [milestonesRes, setMilestonesRes] = useState('');
  const [cartRes, setCartRes] = useState('');
  const [ratingRes, setRatingRes] = useState('');

  const form = {
    name: 'Service Name',
    image: 'https://via.placeholder.com/500',
    location: 'Service Location',
    rating: 4.5,
    rating_count: 20,
    amount_required: 3300,
    service_id: id,
    range: 'silver',
  };

  const auth_user = true;
  const plan = 'silver';
  const subscrib_id = '123';

  const unlockBySubs = (serviceId, subscribId, plan) => {
    console.log(`Unlocking service ${serviceId} with plan ${plan}`);
  };

  const makeSession = (serviceId) => {
    console.log(`Making session for service ${serviceId}`);
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

    // begin rebook
    // this is from the rebook () in serviceDetails.vue
    const rebook = () =>{
      axiosClient.get('/rebook_service/'+ 'test_id')
      .then(({ data }) => {
        setReebokRes(data.data);         
       })
       .catch(err => {
         console.log(err); 
       })
    };
    rebook();    

    //end rebook

    // begin getDetails
    // this is from the getDetails () in serviceDetails.vue
    const getDetails = () =>{
      axiosClient.get('/ServiceResults/'+ 'test_id')
      .then(({ data }) => {
        setDetailsRes(data.data);        
       })
       .catch(err => {
         console.log(err); 
       })
    };
    getDetails();    

    //end getDetails

    // begin getMilestones
    // this is from the getMilestones () in serviceDetails.vue
    const getMilestones = () =>{
      axiosClient.get('/getMilestonesS/'+ 'test_id')
      .then(({ data }) => {
        setMilestonesRes(data.data);        
       })
       .catch(err => {
         console.log(err); 
       })
    };
    getMilestones();    

    //end getMilestones

    // begin addToCart
    // this is from the addToCart () in serviceDetails.vue
    const addToCart = () =>{
      axiosClient.get('/addToCart/'+ 'test_id'+ '-' + 'qty')
      .then(({ data }) => {
        setCartRes(data.data);        
       })
       .catch(err => {
         console.log(err); 
       })
    };
    addToCart();    

    //end addToCart

    // begin rating
    // this is from the rating () in serviceDetails.vue
    const rating = () =>{
      axiosClient.get('/ratingService/'+ 'test_id'+ '/' + 'rating' + 'text')
      .then(({ data }) => {
        setRatingRes(data.data);        
       })
       .catch(err => {
         console.log(err); 
       })
    };
    rating();    

    //end rating

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-center items-center py-4 lg:py-8 mt-3">
      <div className="px-4 md:px-6 lg:px-8 xl:px-12 my-3 pt-3 w-full flex flex-col md:flex-row justify-center mx-auto gap-4 md:gap-6 lg:gap-8">
        <div className="md:w-1/3 flex flex-col mr-0">
          <div className="relative">
            <img
              className="w-full max-h-[250px] shadow-sm rounded-lg"
              src={form.image}
              alt="Service"
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
            <div className="my-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Desired start date:</label>
                <input
                  type="date"
                  className="w-full border-gray-300 border rounded-lg p-2"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Enter additional notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border-gray-300  border  rounded-lg p-2"
                  rows="4"
                />
              </div>
              <div>
                <button className='btn-primary my-3 rounded-xl py-2 px-6 text-white font-semibold'>Book Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 px-6">
          <h2 className="text-black text-sm sm:text-xs md:text-sm lg:text-base font-bold">More business information</h2>
          <p className="py-3 text-lg font-semibold text-black">{form.name}</p>
          <p className="py-3 text-[13px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quasi delectus dolores, quos aperiam ut illum deleniti quaerat quod, ex, expedita atque officiis molestias ipsam natus saepe ipsum dolorum quisquam reprehenderit? Quae magni architecto dignissimos nesciunt numquam libero vero autem magnam distinctio quod iste, fuga voluptatibus voluptas corporis sit eos temporibus et nemo! Aspernatur nam, accusamus cumque quidem ducimus iusto!
          </p>
          <div className='flex items-center mt-2 gap-6 text-sm'>
            <button className='border rounded-md py-1 px-2'>Service Milestone Breakdown</button>
            <button className='border py-1 rounded-md px-6'>Contact us</button>
          </div>
          <div className="my-4 text-left">
            <h3 className="font-bold my-3">Reviews</h3>
            <div>
              <img className="inline" src="https://via.placeholder.com/30" alt="User" width="30" />
              <p className="inline text-sm">
                <b className="text-green-700">Person</b> Lorem60
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
