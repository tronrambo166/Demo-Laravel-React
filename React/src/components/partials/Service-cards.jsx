import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Servicecards = () => {
  const containerRef = useRef(null);

  const cards = [
    { id: 1, image: 'https://via.placeholder.com/300', title: 'Mountain Adventure', description: 'Explore the majestic mountains with breathtaking views.' },
    { id: 2, image: 'https://via.placeholder.com/300', title: 'Beach Paradise', description: 'Relax on the sandy beaches with crystal clear waters.' },
    { id: 3, image: 'https://via.placeholder.com/300', title: 'City Lights', description: 'Experience the vibrant city life with endless entertainment.' },
    { id: 4, image: 'https://via.placeholder.com/300', title: 'Desert Safari', description: 'Embark on a thrilling journey through the vast deserts.' },
    { id: 5, image: 'https://via.placeholder.com/300', title: 'Forest Retreat', description: 'Enjoy a peaceful escape into the lush forests.' },
    { id: 6, image: 'https://via.placeholder.com/300', title: 'River Cruise', description: 'Sail down the serene rivers and enjoy the views.' },
    { id: 7, image: 'https://via.placeholder.com/300', title: 'Tropical Island', description: 'Discover the beauty of tropical islands and clear blue waters.' },
    { id: 8, image: 'https://via.placeholder.com/300', title: 'Historical Sites', description: 'Explore ancient historical sites and learn their stories.' },
  ];

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -containerRef.current.offsetWidth / 3, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: containerRef.current.offsetWidth / 3, behavior: 'smooth' });
  };

  return (
    <div className="relative flex justify-center my-10 items-center group">
      <button
        onClick={scrollLeft}
        className="absolute left-0 sm:left-4 md:left-6 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ top: '50%' }}
      >
        <FaChevronLeft size={24} />
      </button>
      <div
        ref={containerRef}
        className="flex gap-6 py-2"
        style={{
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          maxWidth: 'calc(300px * 3 + 32px * 2)',
          scrollbarWidth: 'none', /* For Firefox */
          msOverflowStyle: 'none', /* For Internet Explorer and Edge */
        }}
      >
        <style>
          {`
            .no-scrollbar::-webkit-scrollbar {
              display: none; /* For Chrome, Safari, and Opera */
            }
          `}
        </style>
        {cards.map((card) => (
          <Link to={`/service-details/${card.id}`} key={card.id} className="bg-white w-[300px] rounded-xl shadow-lg flex-shrink-0">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-700 hidden">{card.description}</p>
              <p>Contact: 27389202</p>
              <p className="text-black font-semibold">Amount Requested: $5000</p>
              <div className='flex text-black font-bold gap-1 items-center'>
                <button>Learn more</button>
                <FaChevronRight size={15} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 sm:right-4 md:right-6 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ top: '50%' }}
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default Servicecards;
