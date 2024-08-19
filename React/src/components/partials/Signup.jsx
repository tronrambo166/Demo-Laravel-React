import googlerecaptcha from "../../images/googlerecaptcha.png";
import { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form className="flex px-4 h-[400px] flex-col">
      {step === 1 && (
        <>
          <div className="title w-full h-auto mx-auto text-center">
            <h1 className='text-lg'>Registration</h1>
            <h2 className="text-md font-semibold">Step 1 of 2</h2>
          </div>
          <div className="sec1 pt-2 flex gap-4">
            <label className='text-sm text-[#666666]'>
              First Name
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                className="border p-2 my-1 rounded-[12px] w-full" 
              />
            </label>
            <label className="text-sm text-[#666666]">
              Middle Name
              <input 
                type="text" 
                name="middleName" 
                value={formData.middleName} 
                onChange={handleChange} 
                className="border p-2 my-1 rounded-[12px] w-full" 
              />
            </label>
          </div>
          <label className='text-sm text-[#666666] pt-2'>
            Last Name
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              className="border p-2 my-1 rounded-xl w-full" 
            />
          </label>
          <label className="block py-2">
            What's your gender? <span className='text-sm text-[#666666]'> (optional)</span>
            <div className="flex items-center gap-[30px] mt-1">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  checked={formData.gender === 'female'} 
                  onChange={handleChange} 
                  className="form-radio" 
                />
                <span className="ml-2 text-sm">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  checked={formData.gender === 'male'} 
                  onChange={handleChange} 
                  className="form-radio" 
                />
                <span className="ml-2 text-sm">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="non-binary" 
                  checked={formData.gender === 'non-binary'} 
                  onChange={handleChange} 
                  className="form-radio" 
                />
                <span className="ml-2 text-sm">Non-Binary</span>
              </label>
            </div>
          </label>

          <label className='text-sm py-2 text-[#666666]'>
            What's your date of birth?
            <div className="flex space-x-2">
              <input 
                type="number" 
                name="dobMonth" 
                placeholder="Month" 
                value={formData.dobMonth} 
                onChange={handleChange} 
                className="border p-2 rounded-xl w-full" 
              />
              <input 
                type="number" 
                name="dobDay" 
                placeholder="Day" 
                value={formData.dobDay} 
                onChange={handleChange} 
                className="border p-2 rounded-xl w-full" 
              />
              <input 
                type="number" 
                name="dobYear" 
                placeholder="Year" 
                value={formData.dobYear} 
                onChange={handleChange} 
                className="border p-2 rounded-xl w-full" 
              />
            </div>
          </label>

          <button 
            type="button" 
            onClick={handleNextStep} 
            className="bg-green my-4 text-white px-4 py-2 rounded-full mt-2"
          >
            Next
          </button>
          <div className="flex items-center">
            <div className="border-t border-b border-[#666666]/50 w-24 mr-4"></div>
            <p className="mx-4 text-black">or continue with</p>
            <div className="border-t border-b border-[#666666]/50 w-24 ml-4"></div>
          </div>
          <div className="flex w-full mx-auto justify-center mt-4 gap-4">
            <button className="text-blue-600 p-3 rounded-full">
              <FaFacebook size={24} />
            </button>
            <button className="text-black shadow-lg">
              <FaGoogle size={22} />
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className='py-4 flex flex-col gap-4'>
            <div className="title w-full h-auto mx-auto text-center">
              <h1 className='text-lg font-semibold'>Registration</h1>
              <h2 className="text-md font-semibold">Step 2 of 2</h2>
            </div>
            <label className='text-[#666666] text-sm py-2'>
              Email
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="border text my-1 p-2 rounded w-full" 
              />
            </label>
            <label className='text-[#666666] text-sm py-2'>
              Password
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="border p-2 my-1 rounded w-full" 
              />
            </label>
            <label className='text-[#666666] text-sm py-2'>
              Confirm Password
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className="border p-2 my-1 rounded w-full" 
              />
            </label>
            <p className='text-black text-md'>By creating an account, you agree to the Terms of use and Privacy Policy.</p>
            <div className="flex justify-between w-70 my-2 border border-black rounded-xl p-3">
              <div className="flex items-center gap-3">
                <input type="radio" className="form-radio text-green-500 checked:bg-green-500" />
                <p className="font-light">I'm not a robot</p>
              </div>
              <img src={googlerecaptcha} alt="" />
            </div>
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={handlePreviousStep} 
                className="bg-gray-300 hover:bg-gray-500 my-4 w-full text-white px-4 py-2 rounded-full mt-2"
              >
                Previous
              </button>
              <button 
                type="button" 
                className="btn-primary my-4 w-full text-white px-4 py-2 rounded-full mt-2"
              >
                Register
              </button>
            </div>
            <div className="flex items-center">
              <div className="border-t border-b border-[#666666]/50 w-24 mr-4"></div>
              <p className="mx-4 text-black">or continue with</p>
              <div className="border-t border-b border-[#666666]/50 w-24 ml-4"></div>
            </div>
            <div className="flex w-full mx-auto justify-center gap-4">
              <button className="text-blue-600 p-3 rounded-full">
                <FaFacebook size={24} />
              </button>
              <button className="text-black shadow-lg">
                <FaGoogle size={22} />
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
