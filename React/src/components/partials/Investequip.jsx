import { FaUpload } from 'react-icons/fa';
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

const Investequip = () => {

     const { amount } = useParams();
     const { id } = useParams();
     const { percent } = useParams();
     const form = {
        amount: atob(amount),
        listing_id: atob(id),
        percent: atob(percent),  
        photos:[],
        legal_doc:'',
        serial:'',
        optional_doc:'',
     }

    const bidCommitsEQP = () => {
    const response = this.form.post('bidCommitsEQP');
    console.log(response.data);
    if(response.data.success){
        $.alert({
          title: 'Alert!',
          content: response.data.success,
        });
        $('#ok').css('display','none');
    }
    else
    $.alert({
          title: 'Alert!',
          content: response.data.failed,
        });

    }    

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
