// src/components/LoginForm.jsx
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="flex flex-col space-y-4">
      <div className="text-center pt-1">
        <h1 className="font-semibold text-md">Sign In</h1>
        <h2 className="pt-2 text-sm">Enter details to log in</h2>
      </div>
      <label className="text-[#666666] text-[13px] pb-4">
        Username
        <input type="text" className="border p-3 rounded-xl w-full" />
      </label>
      <div className="flex flex-col">
        <div className='flex items-center justify-between'>
          <label className="text-[#666666] text-[13px] flex-grow pr-2">
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-[#666666] text-[12px] flex items-center space-x-1"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          className="border rounded-xl p-3 w-full"
        />
      </div>
      <button type="submit" className="bg-green text-white px-4 py-2 rounded-full mt-2">
        Proceed
      </button>
      <a href="http://" className="text-center text-black underline text-[13px]">Forgot password</a>
    </form>
  );
};

export default LoginForm;
