import { FaUpload } from 'react-icons/fa';
const Investequip = () => {
    return (
        <div className='mx-auto w-[700px] h-[500px] my-6 border shadow-md p-3'>
            <div className='flex justify-between my-3 gap-[150px] py-3'>
                <h1 className='text-[13px]'>Please upload good quality photos of the assets*</h1>
                <button className='border p-3'>
                <FaUpload className=''/>
                </button>

            </div>

            <div className='flex justify-between my-3 gap-[150px] py-3'>
                <h1 className='whitespace-nowrap text-[13px]'>Please provide legal documents that act as evidence of the ownership of the Assets <br/> (Original purchase receipt/titles/certificates etc)*</h1>
                <button className='border p-3'>
                <FaUpload className=''/>
                </button>

            </div>


            <div className='flex flex-col gap-2 justify-between  py-3'>
                <h1 className='whitespace-nowrap text-[13px]'>Please provide the Asset’s make, model, and serial number*
                </h1>
               <input type='text' className='border p-3 rounded-md w-[350px] border-slate-500'/>

            </div>

            <div className='flex justify-between my-4 gap-[150px] py-3'>
                <h1 className='whitespace-nowrap text-[13px]'>Any other Asset records (Optional)
                </h1>
                <button className='border p-3'>
                <FaUpload className=''/>
                </button>

            </div>

            <div className='flex justify-center gap-6 items-center my-4'>
                <button className='btn-primary rounded-xl py-2 px-6'>OK</button>
                <button className='bg-black text-white hover:bg-gray-700 rounded-xl py-2 px-6'>Back</button>
            </div>

        </div>
    );
};

export default Investequip;
