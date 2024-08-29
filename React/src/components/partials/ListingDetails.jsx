import { useParams, useNavigate } from 'react-router-dom';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faStar, faStarHalfAlt, faExclamationCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import AuthModal from './Authmodal'; 
import { useEffect } from 'react'
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextProvider";
import { Link } from 'react-router-dom';
import Modal from './Authmodal';
import UnlockPopup from './Unlockpopup';

const ListingDetails = ({ onClose }) => {

  const{token,setUser,setAuth, auth} = useStateContext();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUnlockPopupOpen, setIsUnlockPopupOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const form = {
    listing_id: atob(atob(id)),
    range: 'gold',
    conv:false
  };

  const auth_user = true;
  const plan = 'gold';
  const subscrib_id = '123';

  const [conv, setConv] = useState('');
  const [details, setDetails] = useState('');
  const [allowToReview, setAllow] = useState('');
  const [amount_r, setAmount_r] = useState('');
  const [subscribeData, setSubscribeData] = useState('');

  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState('');
  const [equipmentAmount, setEquipmentAmount] = useState('');
  const [equipmentPercentage, setEquipmentPercentage] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [equipmentErrorMessage, setEquipmentErrorMessage] = useState('');

  //FOR SMALL POP UP
  const [showSmallFee, setShowSmallFee] = useState(false);
  const [showSubs, setShowSubs] = useState(false);

  //if (!isOpen) return null;
  const handleUnlockFee = () => {
    setShowSmallFee(true);
    setShowSubs(false);
  };
  const handleSubscribe = () => {
    if (details.subscribed) {
      setShowSubs(true);
      setShowSmallFee(false);
    } else {
      navigate(`/subscribe/${form.listing_id}`);
    }
  };
  const handleClose = () => {
    setShowSmallFee(false);
    setShowSubs(false);
    onClose();
  };

  //FOR SMALL POP UP


  const openUnlockPopup = () => setIsUnlockPopupOpen(true);
  const closeUnlockPopup = () => setIsUnlockPopupOpen(false);
  const makeSession = (listingId) => {
    console.log(`Making session for listing ${listingId}`);
  };
  const openAuthModal = () => {
  setIsAuthModalOpen(true);
};
const closeAuthModal = () => {
  setIsAuthModalOpen(false);
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

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);
  
    if (enteredAmount && amount_r > 0) {
      const amount = parseFloat(enteredAmount);
      if (amount > amount_r) {
        setAmount('');
        setPercentage(0);
        setErrorMessage('Amount exceeds the investment required!');
      } else {
        const calculatedPercentage = ((amount / amount_r) * 100).toFixed(2);
        setPercentage(calculatedPercentage);
        setErrorMessage(''); 
      }
    } else {
      setPercentage('');
      setErrorMessage(''); 
    }
  };
  

  const handleEquipmentAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setEquipmentAmount(enteredAmount);
  
    if (enteredAmount && amount_r > 0) {
      const amount = parseFloat(enteredAmount);
      if (amount > amount_r) {
        setEquipmentAmount('');
        setEquipmentPercentage(0);
        setEquipmentErrorMessage('Amount exceeds the investment required!');
      } else {
        const calculatedPercentage = ((amount / amount_r) * 100).toFixed(2);
        setEquipmentPercentage(calculatedPercentage);
        setEquipmentErrorMessage(''); // Clear the error message
      }
    } else {
      setEquipmentPercentage('');
      setEquipmentErrorMessage(''); // Clear the error message
    }
  };
  

  const [showAuthModal, setShowAuthModal] = useState(false); 

  const handleUnlockClick = () => {
    setShowAuthModal(true); 
  };
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleInvestClick = () => {
      var amount = $('#investmentAmount').val();
      var percent = document.getElementById("percent").innerHTML;

      if (amount == '' || amount == 0)
        $.alert({
          title: 'Alert!',
          content: 'Please enter a bid to invest!',
        });
      else {
        var amount = base64_encode(amount);
        var percent = base64_encode(percent) 
        var purpose = base64_encode('bids') 
  
          $.confirm({
          title: 'Are you sure?',
          content: 'Are you sure to bid?',
          buttons: {
            confirm: function () {
              window.location.href = '/checkout/' + amount + '/' + form.listing_id + '/' + percent +'/'+ purpose;
            },
            cancel: function () {
              $.alert('Canceled!');
            },
          }
        });
      }
      //navigate('/checkout'); 
  };

  const handleEquipmentInvestClick = () => {
    console.log(`Investing ${equipmentAmount} in equipment.`);
  };


//CORE METHODS
  useEffect(()=> {
    const getDetails = () => { 
        axiosClient.get('/searchResults/'+form.listing_id)
          .then(({ data }) => {

            data.data[0]['rating'] = parseFloat(data.data[0]['rating']) / parseFloat(data.data[0]['rating_count']);
            data.data[0]['rating'] = data.data[0]['rating'].toFixed(2);
            if(data.data[0]['rating_count'] == 0) data.data[0]['rating'] = 0;

            setDetails(data.data[0]);
            setConv(true);
              
           if(data.data[0].investors_fee == null)
           setConv(true);
          })
          .catch(err => {
            console.log(err); //setLoading(false)
          })
    };
      

      const getMilestones = () => { 
        axiosClient.get('/getMilestones/'+form.listing_id)
          .then(({ data }) => {
           setAllow(data.allowToReview);
           setAmount_r(data.amount_required);
            //console.log(amount_required)
          })
          .catch(err => {
            console.log(err); 
          })
    };

    const isSubscribed = () => { 
        axiosClient.get('/isSubscribed/'+form.listing_id)
          .then(({ data }) => {
            //console.log(data)
          if(data.count > 0){
            setSubscribeData(data.data);

          if(data.data.subscribed == 0)
          $('#small_fee_div').removeClass('collapse');
          }
          else {
            $('#small_fee_div').removeClass('collapse');
            $('#small_fee').addClass('modal_ok_btn');
          } 

          })
          .catch(err => {
            console.log(err); 
          })
    };

      getDetails();
      isSubscribed();
      getMilestones();

    }, [])

      const download_business = () => { 
      axiosClient({
          url: 'download_business/' + form.listing_id, //your url
          method: 'GET',
          responseType: 'blob',
        }).then((data) => {
        console.log(data);
        if((data.data.size == 3)){
          $.alert({
          title: 'Alert!',
          content: 'The business has no such document or the file not found!',
           type: 'red',
            buttons: {
            tryAgain: {
            text: 'Close',
            btnClass: 'btn-red',
            action: function(){
            }
        }}  
        });
        } //console.log(data);
        else{
          const href = URL.createObjectURL(data.data);
          const link = document.createElement('a');
          link.href = href;

          if(data.data.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
          link.setAttribute('download', 'statement.docx'); //or any other extension
          else
           link.setAttribute('download', 'statement.pdf');
            
          document.body.appendChild(link);
          link.click();
        }

      });
    }

      const download_statement = () => { 
      axiosClient({
          url: 'download_statement/' + form.listing_id, //your url
          method: 'GET',
          responseType: 'blob',
        }).then((data) => {
        console.log(data);
        if((data.data.size == 3)){
          $.alert({
          title: 'Alert!',
          content: 'The business has no such document or the file not found!',
           type: 'red',
            buttons: {
            tryAgain: {
            text: 'Close',
            btnClass: 'btn-red',
            action: function(){
            }
        }}  
        });
        } //console.log(data);
        else{
          const href = URL.createObjectURL(data.data);
          const link = document.createElement('a');
          link.href = href;

          if(data.data.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
          link.setAttribute('download', 'statement.docx'); //or any other extension
          else
           link.setAttribute('download', 'statement.pdf');
            
          document.body.appendChild(link);
          link.click();
        }

      });
    }

    const bidCommitsEQP = () => { 
        axiosClient.get('/getMilestones/'+form.listing_id)
          .then(({ data }) => {
           setAllow(data.allowToReview);
           setAmount_r(data.amount_required);
            //console.log(amount_required)
          })
          .catch(err => {
            console.log(err); 
          })
    }

    const stripeSmallFee = (business_id,amount) => { 
        var amount = btoa(amount);
        var business_id = btoa(business_id)
        var purpose = btoa('small_fee');
        $.confirm({
          title: 'Are you sure?',
          content: 'Are you sure?',
          buttons: {
            confirm: function () {
              window.location.href = '/checkout/' + amount + '/' + business_id+'/null/'+purpose;
            },
            cancel: function () {
              $.alert('Canceled!');
            },
          }
        });

sessionStorage.setItem("purpose", "One time unlock - Small fee");
    }

    const unlockBySubs = (listingId, subscribId, plan) => {
    console.log(`Unlocking listing ${listingId} with plan ${plan}`);
    axiosClient.get('/getMilestones/'+form.listing_id)
          .then(({ data }) => {
           setAllow(data.allowToReview);
           setAmount_r(data.amount_required);
            //console.log(amount_required)
          })
          .catch(err => {
            console.log(err); 
          })
  };

  //console.log(amount+'jj')

//CORE METHODS END

  const Popup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-[450px]">
          <h2 className="text-xl font-bold mb-4">Financial Statements</h2>
          <p>Here you can add the content for financial statements download or instructions.</p>
          <button
            className="mt-4 btn-primary text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center py-4 lg:py-8 mt-3">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 my-3 pt-3 w-full flex flex-col md:flex-row justify-center mx-auto gap-4 md:gap-6 lg:gap-8">
          <div className="md:w-1/3 px-6">
            <h2 className="text-[#0A0A0A]/60 text-sm sm:text-xs md:text-sm lg:text-base font-bold">More business information</h2>
            <p className="py-3 text-lg font-semibold text-black">{details.name}</p>
            <p className="py-3 text-[15px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            </p>
            <div className="flex gap-2">
            <div className="flex w-full items-center gap-10">
  {token ? (
    <a
    onClick={() => {
      // makeSession(form.listing_id);
      openUnlockPopup();
        }}
      className="bg-gray-700 w-1/2 text-center rounded-lg text-white py-2 cursor-pointer"
    >
      <FontAwesomeIcon icon={faLock} className="mr-2" />
      Unlock To Invest
    </a>
  ) : (
    <a
      onClick={() => setIsModalOpen(true)}
      className="bg-black hover:bg-green w-1/2 text-sm text-center rounded-full text-white py-[6px] cursor-pointer"
    >
      <FontAwesomeIcon icon={faLock} className="mr-2 text-sm" />
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
              <h3 className="font-bold my-3">Reviews </h3>
              <div>
                <img className="inline rounded-[50%]" src="https://via.placeholder.com/30" alt="User" width="30" />
                <p className="inline text-sm">
                  <b className="text-green-700"> Person</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col mr-0">
            <div className="relative">
              <img
                className="w-full max-h-[250px] shadow-sm rounded-lg"
                src={'../'+details.image}
                alt="Business"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-60 rounded-b-lg text-white text-center py-2">
                <p className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {details.location}
                </p>
              </div>
            </div>
            <div className="w-full py-3 flex flex-col text-right">
              <div className="text-black font-bold mb-2">
                Amount Requested: <span className="font-semibold text-green-700">${amount_r}</span>
              </div>
              <div className="flex items-center justify-end text-right mb-2">
                {renderStars(details.rating)} ( {details.rating} )
              </div>
              <div className="text-gray-500 text-sm">
                {details.rating_count} Ratings
              </div>
              <div className={`${conv && token ? "hidden" : "card mx-auto my-4 max-w-md p-6 rounded-lg shadow-lg bg-white"}`}>
              <h4 className="text-2xl font-semibold border-b-2 border-gray-200 pb-4 mb-4">
                Business Home Window
              </h4>

              {!token ? (
                <div className="flex flex-col items-center">
                  <button
                    // onClick={() => make_session(form.listing_id)}
                    data-target="#loginModal"
                    data-toggle="modal"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Unlock To Invest
                  </button>
                  <p className="mt-4 text-gray-600 text-center">
                    Unlock this business to learn more about it and invest
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {plan === 'platinum' || plan === 'gold' ? (
                    <button
                      onClick={() => unlockBySubs(form.listing_id, subscrib_id, 'platinum')}
                      className="bg-green text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                    >
                      Unlock To Invest
                    </button>
                  ) : (
                    <button
                      data-target="#investModal"
                      data-toggle="modal"
                      className="bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-700 transition duration-300"
                    >
                      Unlock To Invest
                    </button>
                  )}
                  <p className="mt-4 text-gray-600 text-center">
                    Unlock this business to learn more about it and invest
                  </p>
                </div>
              )}
            </div>

            </div>

          </div>

           {token  && conv &&  (
          <div  className='bg-gray-100 py-4 flex flex-col gap-4 items-center px-6'>
            <button
              className='whitespace-nowrap border border-black px-4 py-2 rounded-lg w-[300px]'
              onClick={download_statement}
            >
              Download Financial Statements
            </button>
            <button onClick={download_business} className='whitespace-nowrap border border-black px-4 py-2 rounded-lg w-[300px]'>Download Business Documentation</button>
            <button className='whitespace-nowrap border border-black px-4 py-2 rounded-lg w-[300px]'>
            <Link to={`/business-milestones/${btoa(btoa(details.id))}`} key={details.id}>
             View Business Milestones </Link> </button>

            <div className='w-full flex flex-col items-center mt-4'>
              <h2 className='text-lg font-semibold mb-4'>Enter A Bid To Invest</h2>
              <label htmlFor='investmentAmount' className='text-sm font-medium'>Amount:</label>
              <input
                type="number"
                id="investmentAmount"
                value={amount}
                onChange={handleAmountChange}
                className='border border-gray-300 rounded-lg p-2 mb-2 w-full'
                placeholder='$'
              />
              {amount && (
                <div className='text-sm'>
                  <p>Bid Percentage: <span id="percent" className='font-bold'>{percentage}</span>%</p>
                </div>
              )}
              <button
                onClick={handleInvestClick}
                className='btn-primary text-white border px-4 py-2 rounded-lg mt-4'
              >
                Invest Now
              </button>
              {errorMessage && <p className="error-message  text-red-600">{errorMessage}</p>}
            </div>

            {plan === 'gold' && (
              <div className='w-full flex flex-col items-center mt-4'>
                <h2 className='text-lg font-semibold mb-4'>Enter Equipment Investment</h2>
                <label htmlFor='equipmentAmount' className='text-sm font-medium'>Amount:</label>
                <input
                  type="number"
                  id="equipmentAmount"
                  value={equipmentAmount}
                  onChange={handleEquipmentAmountChange}
                  className='border border-gray-300 rounded-lg p-2 mb-2 w-full'
                  placeholder='$'
                />
                {equipmentAmount && (
                  <div className='text-sm'>
                    <p>Equipment Investment Percentage: <span className='font-bold'>{equipmentPercentage}%</span></p>
                  </div>
                )}
                <Link to="/invest">

                <button
                  onClick={handleEquipmentInvestClick}
                  className='btn-primary text- px-4 py-2 rounded-lg mt-4'
                >
                  Invest in Equipment
                </button>
                {equipmentErrorMessage && <p className="error-message text-red-600">{equipmentErrorMessage}</p>}                </Link>
              </div>
            )}
          </div>
           )}

        </div>
      </div>

      {/*Small_fee POPUP*/}

      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        { !showSubs && (
          <div className='flex gap-6 justify-center'>
            <button
              onClick={handleUnlockFee}
              className="btn-primary rounded-md py-2 px-6 text-lg font-semibold mb-4"
            >
              Unlock Fee
            </button>
            <button
              onClick={handleSubscribe}
              className="text-lg border rounded-md border-black py-2 px-6 font-semibold mb-4"
            >
              {details.subscribed ? 'Subscription' : 'Subscribe'}
            </button>
          </div>
        )}

        
          <>
            <p className="text-gray-700 mb-6">
              This business requests a small unlock fee of <b>${details.investors_fee}</b> to view their full business information.
            </p>
            <p className="text-gray-700 mb-6">Do you want to pay now?</p>
            <div className="flex justify-center space-x-4">
              {/*<Link to={`/checkout/${form.investors_fee}/${form.listing_id}/fee`}>*/}
                <button
                  onClick={() => {
                    stripeSmallFee(form.listing_id, details.investors_fee);
                    handleClose();
                  }}
                  className="btn-primary text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                >
                  Ok
                </button>
             {/* </Link>*/}
              <button
                onClick={handleClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </>
      

        {showSubs && (
          <div>
            {tokenLeft > 0 && plan && (
              <p className="text-warning mb-3 text-center">
                Your <span>{plan}</span> expires in <b>{expire}</b> days.
                <span className="text-dark small d-block">Are you sure you want to use one of your {tokenLeft} business information tokens?</span>
              </p>
            )}
            {tokenLeft === 0 && (
              <p className="text-dark mb-3 text-center">
                Please use <b>'Small fee'</b> option to unlock
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center">
              {['silver', 'silver-trial', 'gold', 'gold-trial', 'platinum', 'platinum-trial'].includes(plan) && (
                <button
                  onClick={handleUseToken}
                  className="btn-primary text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                >
                  Use token <small>({tokenLeft} left)</small>
                </button>
              )}
              <button
                onClick={handleClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
            <p className="text-danger text-center">The business is not in your range!</p>
          </div>
        )}
      </div>
    </div>

    {/*Small_fee POPUP*/}


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
      <UnlockPopup isOpen={isUnlockPopupOpen} onClose={closeUnlockPopup} />
          </>
  );
};

export default ListingDetails;
