import { Link } from "react-router-dom";
import JeepneyIcon from '../assets/jeepney.svg';

const Navbar = () => {
  return (
    <nav className="bg-[#FFFFFF] fixed w-full z-20 top-0 start-0 border-b border-slate-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={JeepneyIcon}
            className="h-8 "
            alt="bayad po ph"
          />
          <span className="self-center text-xl font-bold whitespace-nowrap text-[#4CAF4F]">
            Bayad po!          
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex items-center justify-center gap-1 text-white bg-[#3AA640] hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-4 py-2 text-center "
          >
            <p>Get started</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-white">
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded-sm text-[#2a2a2a] font-medium hover:text-[#3AA640]"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded-sm text-[#2a2a2a] font-medium hover:text-[#3AA640]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded-sm text-[#2a2a2a] font-medium hover:text-[#3AA640]"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded-sm text-[#2a2a2a] font-medium hover:text-[#3AA640]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
