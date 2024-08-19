import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './Loginform';
import RegisterForm from './Signup';
import logo2 from "../../images/logo2.png";

const Modal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center p-5 items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl p-6 relative w-[500px] md:w-[450px] sm:w-[400px] mx-4 mt-4 sm:mt-6 sm:mx-6 max-h-[90vh] overflow-auto">
        <div className='flex justify-center py-4'>
          <img src={logo2} alt="Logo" />
        </div>
        <hr className='py-2' />
        <button 
          className="absolute top-2 right-2 text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex justify-center mb-4 text-sm">
          <button 
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 ${isLogin ? 'underline text-green' : 'text-gray-700'} rounded-l-lg`}
          >
            Sign in
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 ${!isLogin ? 'underline text-green' : 'text-gray-700'} rounded-r-lg`}
          >
            Register
          </button>
        </div>
        
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
