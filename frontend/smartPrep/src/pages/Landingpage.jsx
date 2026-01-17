import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { APP_FEATURES } from "../utils/data";
import {LuSparkles} from 'react-icons/lu';
import HERO_IMG  from "../assets/hero-img.png"
import Modal from "../components/Modal"
import Login from "../pages/Auth/Login"
import SignUp from "../pages/Auth/SignUp"
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const Landingpage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);

    } else {
      navigate("/dashboard");
    }
  };
  
  return (
    <>
      <div className="w-full min-h-full bg-[#FFF7F2]">
       <div className='w-[500px] h-[500px] bg-rose-200/25 blur-[65px] absolute top-0 left-0' />

        <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
          {/* Header */}
          <header className='flex justify-between items-center mb-16'>
            <div className='text-xl text-black font-bold'>
              SmartPrep : An Interview Preparation Platform
            </div>
            { user ? (<ProfileInfoCard/>) : ( <button className='bg-linear-to-r from-[#FF5A3C] to-[#FF8A5B] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer' onClick={()=>{
              setOpenAuthModal(true);
            }}>
              Login / Sign Up
              
            </button> )}
          </header>


          {/* Hero Content */}
          <div className='flex flex-col md:flex-row items-center'>
            <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
              <div className='flex items-center justify-left mb-2'>
                <div className='flex items-center gap-2 text-[13px] text-rose-700 font-semibold bg-rose-100 px-3 py-1 rounded-full border border-rose-200'>
                    <span>✨ AI Powered</span>
                </div>
              </div>
              <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
                Ace Interviews with <br />
                 <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF5A3C_0%,_#FFD0B5_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                    AI-Powered
                 </span>{" "}
                 Learning
              </h1>
              </div>

            <div className='w-full md:w-1/2'>
              <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
                  Get role specific questions, expand answers when you need them,
                  dive deeper into concepts, and organize everything your way.
                  From Preparation to mastery your ultimate interview tool-kit is here.
              </p>
              <button className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-rose-50 hover:text-black border border-rose-50 hover:border-rose-200 transition-colors cursor-pointer' onClick={handleCTA}>
                  Get Started
              </button>
            </div>
          </div>

          

        </div>

       </div>

       <div className='w-full min-h-full relative z-10'>
        <div>
          <section className='flex items-center justify-center -mt-36'>
            <img src= {HERO_IMG} alt="hero image" className='w-[80vw] rounded-lg'/>
          </section>
        </div>

            <div className='w-full min-h-full bg-[#FFF7F2] mt-10'>
              <div className='container mx-auto px-4 pt-10 pb-20'>
                <section className='mt-5'>
                    <h2 className='text-2xl font-medium text-center mb-12'>
                      Features That Make You Shine
                    </h2>
                    <div className='flex flex-col items-center gap-8'>
                      {/* First 3 cards */}
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                        {APP_FEATURES.slice(0,3).map((feature) =>(
                        <div
                          key={feature.id}
                          className="bg-[#FFFBF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-rose-100 transition border border-rose-100"
                        >
                        
                        <h3 className='text-base font-semibold mb-3'>
                          {feature.title}
                          
                        </h3>
                        <p className='text-gray-600'>
                          {feature.description}
                        </p>
                        </div>


                        ))}
                      </div>
                          {/* Remaining Two Cards */}

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                          {APP_FEATURES.slice(3).map((feature) => (
                            <div
                            key={feature.id}
                            className='bg-[#FFFBF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-rose-100 transition border border-rose-100'>

                              <h3 className='text-base font-semibold mb-3'>
                                {feature.title}
                                
                              </h3>
                              <p className='text-gray-600'>
                                  {feature.description}
                              </p>

                            </div>
                          ))}
                          
                        </div>



                    </div>
                </section>

              </div>

            </div>
            <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>
              SmartPrep © 2026  All rights reserved.

            </div>


       </div>
       <Modal 
       isOpen={openAuthModal}
       onClose={() =>{
        setOpenAuthModal(false);
        setCurrentPage("login");
       }}
       hideHeader
      >
        <div>
          {
            currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )
          }
          {
            currentPage === "signup" && (
              <SignUp setCurrentPage={setCurrentPage} />
            )
          }
          </div>
          </Modal>

      
    </>
    
    
  )
  
}

export default Landingpage
