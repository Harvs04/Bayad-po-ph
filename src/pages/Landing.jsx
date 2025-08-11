import { useState } from "react";
import Navbar from "./../components/Navbar";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-full content">
      <Navbar />
      <header className="w-2/3 py-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <div className="flex flex-col text-center text-5xl md:text-7xl font-bold">
            <span className="text-[#4D4D4D]">Manage your fares</span>
            <span className="text-[#4CAF4F]">Anytime, Anywhere</span>
          </div>
          <img
            src="./src/assets/jeep-tricy.png"
            alt="landing illustration"
            className="w-full md:w-7/12"
          />
        </div>
      </header>
      <section className="px-10 py-8 bg-[#4CAF4F] w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-white text-3xl md:text-4xl font-semibold">
          Where are you headed, ka-byahe?
        </h1>
        <form action="" className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
          <div class="w-full">
            <label
              for="pickup-point"
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your pickup point
            </label>
            <input
              type="text"
              id="pickup-point"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div class="w-full">
            <label
              for="drop-off-point"
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your drop-off point
            </label>
            <input
              type="text"
              id="drop-off-point"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <button type="button" class="text-[#4CAF4F] bg-white hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer">How much is my fare?</button>
        </form>
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center bg-[#fbfdfb] w-full py-4 px-2 gap-4 md:gap-10">
        <h2 className='text-3xl md:text-4xl font-semibold text-[#4d4d4d]'>Pay your fares in exact amount</h2>
        <img src="./src/assets/coins.png" alt="coins_asset" className="w-1/2 md:w-[250px]" />
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center bg-[#f8f8f8] w-full py-4 px-2 gap-4 md:gap-10">
        <h2 className='text-3xl md:text-4xl font-semibold text-[#4d4d4d]'>Provides live location</h2>
        <img src="./src/assets/phone_map.png" alt="map_asset" className="w-1/2 md:w-[250px]" />
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center bg-[#fbfdfb] w-full py-4 px-2 gap-4 md:gap-10">
        <h2 className='text-3xl md:text-4xl font-semibold text-[#4d4d4d]'>Lets you know your right fare price</h2>
        <img src="./src/assets/driver.png" alt="driver_asset" className="w-1/2 md:w-[250px]" />
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center bg-[#f8f8f8] w-full py-4 px-2 gap-4 md:gap-10">
        <h2 className='text-3xl md:text-4xl font-semibold text-[#4d4d4d]'>Follows the LTFRB fare matrix</h2>
        <div className="py-8">
          <img src="./src/assets/LTFRB_Seal.png" alt="ltfrb_logo_asset" className="w-1/2 md:w-[250px]" />
        </div>
      </section>
      <footer>
        Contact Us!
      </footer>
    </div>
  );
}

export default Landing;
