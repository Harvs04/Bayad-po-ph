import BayadPoIcon from '../assets/jeepney_white.svg';

const FareResult = ({ fareDetails, startLocation, endLocation, setIsSubmitted, error }) => {
  const startLoc = startLocation.split(",");
  const endLoc = endLocation.split(",");

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Unable to Calculate Fare
          </h3>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <img src={BayadPoIcon} alt="logo" className='w-5 h-5' />
          </div>
          <div>
            <h2 className="text-lg font-bold">Travel Details</h2>
            <p className="text-blue-100 text-xs">
              {fareDetails.vehicleType.split("_").join(" ") || "Jeepney"}
            </p>
          </div>
        </div>

        {/* Route - Compact */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
          <div className="space-y-2">
            {startLocation && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-blue-100 font-medium truncate">
                    {startLoc}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center">
              <div className="w-8 border-t border-white/30"></div>
            </div>

            {endLocation && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-blue-100 font-medium truncate">
                    {endLoc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Fare Display - Smaller */}
        <div className="text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-blue-100 text-xs mb-1">Total Fare</p>
            <p className="text-2xl font-bold text-white">
              ₱{fareDetails.totalFare.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Trip Details - Compact */}
      <div className="p-6 space-y-3">
        {/* Quick Stats - Smaller */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mx-auto mb-1">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mb-1">Distance</p>
            <p className="text-sm font-semibold text-gray-800">
              {fareDetails.distance.toFixed(1)} km
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center mx-auto mb-1">
              <svg
                className="w-3 h-3 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mb-1">Time</p>
            <p className="text-sm font-semibold text-gray-800">
              {fareDetails.duration / 3600 < 1
                ? (fareDetails.duration / 60).toFixed(0)
                : (fareDetails.duration / 3600).toFixed(1)}{" "}
              {fareDetails.duration / 3600 < 1 ? "mins" : "hr/s"}
            </p>
          </div>
        </div>

        {/* Fare Breakdown - More Compact */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Fare Breakdown
          </h3>

          <div className="space-y-1 text-[13px]">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Base fare ({fareDetails.baseKm} km)
              </span>
              <span className="font-medium">
                ₱{fareDetails.baseFare.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Additional km (
                {fareDetails.baseKm < fareDetails.distance
                  ? (fareDetails.distance - fareDetails.baseKm).toFixed(1)
                  : "0"}{" "}
                km)
              </span>
              <span className="font-medium">
                ₱{fareDetails.distanceFare.toFixed(2)}
              </span>
            </div>
            {fareDetails.passengerType !== "Regular" && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {fareDetails.passengerType.split("_").join(" ")} Discount
                </span>
                <span className="font-medium text-red-500">
                  -₱
                  {(
                    fareDetails.totalFare / 0.8 -
                    fareDetails.totalFare
                  ).toFixed(2)}
                </span>
              </div>
            )}

            <hr className="my-1" />
            <div className="flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span className="text-blue-600">
                ₱{fareDetails.totalFare.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer - Smaller */}
        <div className="bg-blue-50 rounded-md p-2">
          <p className="text-xs text-blue-600 text-center">
            ⚠️ Estimated fare and travel time may vary based on traffic conditions!
          </p>
        </div>

        {/* Re-calculate */}
        <button className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 rounded-md py-3 px-6 w-full cursor-pointer" onClick={() => setIsSubmitted(false)}>
          <svg className='w-5 h-5 flex-shrink-0' fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" id="mdi-calculator" viewBox="0 0 24 24"><path d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V16H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11M15,18V20H17V18H15Z" /></svg>
          <p className="text-[15px] text-blue-50 font-medium text-center">
            Re-Calculate
          </p>
        </button>
      </div>
    </div>
  );
};

export default FareResult;
