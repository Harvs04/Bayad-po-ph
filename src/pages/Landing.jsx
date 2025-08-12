import { useState } from "react";
import Navbar from "./../components/Navbar";
import { Link } from "react-router-dom";

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
        <form
          action=""
          className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4"
        >
          <div class="w-full">
            <label
              for="pickup-point"
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your pickup point
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4CAF4F"
                class="size-6 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                type="text"
                id="pickup-point"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 pr-2.5 py-2.5"
              />
            </div>
          </div>
          <div class="w-full">
            <label
              for="drop-off-point"
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your drop-off point
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fc1e65"
                class="size-6 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                type="text"
                id="drop-off-point"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 pr-2.5 py-2.5"
              />
            </div>
          </div>
          <Link
            class="text-[#4CAF4F] bg-white hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            to={'/check-fare'}
          >
            How much is my fare?
          </Link>
        </form>
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center bg-[#fbfdfb] w-full py-6 md:py-10 px-2 gap-4 md:gap-10">
        <div className="flex flex-col gap-4 px-2 text-center">
          <h2 className="text-3xl md:text-4xl px-10 md:px-0 font-semibold text-[#4d4d4d]">
            Plan and manage your fares ahead of time
          </h2>
          <p className="text-lg text-gray-600 max-w-lg self-center">
            Easily calculate and prepare your transportation costs before your
            trip, helping you budget smarter and avoid surprises.
          </p>
        </div>
        <img
          src="./src/assets/coins.png"
          alt="coins_asset"
          className="w-1/2 md:w-[250px]"
        />
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center bg-[#f8f8f8] w-full py-6 md:py-10 px-2 gap-4 md:gap-10">
        <img
          src="./src/assets/phone_map.png"
          alt="map_asset"
          className="w-1/2 md:w-[250px]"
        />
        <div className="flex flex-col gap-4 px-2 text-center">
          <h2 className="text-3xl md:text-4xl px-10 md:px-0 font-semibold text-[#4d4d4d]">
            Track vehicles in real-time
          </h2>
          <p className="text-lg text-gray-600 max-w-lg self-center">
            View live locations of available rides so you can plan your commute
            efficiently and reduce waiting time.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center bg-[#fbfdfb] w-full py-6 md:py-10 px-2 gap-4 md:gap-10">
        <div className="flex flex-col gap-4 px-2 text-center">
          <h2 className="text-3xl md:text-4xl px-10 md:px-0 font-semibold text-[#4d4d4d]">
            Pay fares based on passenger type
          </h2>
          <p className="text-lg text-gray-600 max-w-lg self-center">
            Ensure fair pricing by paying the correct fare according to your
            passenger category, whether regular, student, senior citizen, or
            PWD.
          </p>
        </div>
        <img
          src="./src/assets/driver.png"
          alt="driver_asset"
          className="w-1/2 md:w-[250px]"
        />
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center bg-[#f8f8f8] w-full py-6 md:py-10 px-2 gap-4 md:gap-10">
        <div className="py-8">
          <img
            src="./src/assets/LTFRB_Seal.png"
            alt="ltfrb_logo_asset"
            className="w-1/2 md:w-[250px]"
          />
        </div>
        <div className="flex flex-col gap-4 px-2 text-center">
          <h2 className="text-3xl md:text-4xl px-10 md:px-0 font-semibold text-[#4d4d4d]">
            Compliant with LTFRB fare matrix
          </h2>
          <p className="text-lg text-gray-600 max-w-lg self-center">
            All fares are aligned with the official LTFRB fare matrix, ensuring
            transparency and fairness for both passengers and drivers.
          </p>
        </div>
      </section>

      <footer>Contact Us!</footer>
    </div>
  );
}

export default Landing;
