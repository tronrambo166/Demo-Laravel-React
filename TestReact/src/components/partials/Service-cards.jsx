import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Servicecards = () => {
  const cards = [
    { image: 'https://via.placeholder.com/300', title: 'Mountain Adventure', description: 'Explore the majestic mountains with breathtaking views.' },
    { image: 'https://via.placeholder.com/300', title: 'Beach Paradise', description: 'Relax on the sandy beaches with crystal clear waters.' },
    { image: 'https://via.placeholder.com/300', title: 'City Lights', description: 'Experience the vibrant city life with endless entertainment.' },
    { image: 'https://via.placeholder.com/300', title: 'Desert Safari', description: 'Embark on a thrilling journey through the vast deserts.' },
    { image: 'https://via.placeholder.com/300', title: 'Forest Retreat', description: 'Enjoy a peaceful escape into the lush forests.' },
    { image: 'https://via.placeholder.com/300', title: 'River Cruise', description: 'Sail down the serene rivers and enjoy the views.' },
    { image: 'https://via.placeholder.com/300', title: 'Tropical Island', description: 'Discover the beauty of tropical islands and clear blue waters.' },
    { image: 'https://via.placeholder.com/300', title: 'Historical Sites', description: 'Explore ancient historical sites and learn their stories.' },
  ];

  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -containerRef.current.offsetWidth / 3, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: containerRef.current.offsetWidth / 3, behavior: 'smooth' });
  };

  return (
    <div className="relative flex justify-center mb-[170px] pt-[20px]">

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 ml-4 rounded-full shadow-lg"
        style={{ marginLeft: '10px' }}
      >
        <FaChevronLeft size={24} />
      </button>
      <div
        ref={containerRef}
        className="flex justify-start gap-6 overflow-x-auto py-2 px-[20px] no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          width: 'calc(280px * 3 + 32px * 2)', // Width to show exactly 3 cards including gap
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white w-[280px] rounded-xl shadow-lg flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <h2>Contact</h2>
              <h2>Amount requested</h2>
              <p className="text-gray-700 hidden">{card.description}</p>
              <div className='flex text-black font-bold gap-1 items-center'>
                <button>Learn more</button>
                <FaChevronRight size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 mr-4 bg-white p-3 rounded-full shadow-lg"
        style={{ marginRight: '10px' }}
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default Servicecards;
