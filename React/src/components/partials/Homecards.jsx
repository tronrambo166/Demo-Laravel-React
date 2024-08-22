import { Link } from 'react-router-dom';
import axiosClient from "../../axiosClient";
import { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useStateContext } from "../../contexts/contextProvider";

const CardList = () => {
const [cards, setCards] = useState([]);
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);

   useEffect(()=> {
        getCards();
    }, [])

    const getCards = () => {
      setLoading(true)
        axiosClient.get('/latBusiness')
          .then(({ data }) => {
            setLoading(false)
            setCards(data.data);
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
          })
    }
//console.log(cards)


  const containerRef = useRef(null);

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
        className="flex gap-6 overflow-x-auto py-2 no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          maxWidth: 'calc(280px * 3 + 32px * 2)',
        }}
      >
        {cards.map((card) => (
          <Link to={`/listing/${card.id}`} key={card.id} className="bg-white w-[280px] rounded-xl shadow-lg flex-shrink-0">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
              <p className="text-gray-700 hidden">{card.details}</p>
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

export default CardList;
