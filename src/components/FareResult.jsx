const FareResult = ({ fareDetails, startLocation, endLocation, error }) => {
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
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6">
        <div className="flex items-start gap-3 mb-2">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16v-4h-2l-1.5-3h4.5l2 4v3M5 17h10M15 17h4l-1-10H4l1 10"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Travel Details</h2>
                <p className="text-blue-100 text-sm">
                  {fareDetails.vehicleType.split("_").join(" ") || "Jeepney"}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                Trip Route
              </h3>
              <div className="space-y-3">
                {startLocation && (
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        From
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {startLoc}
                      </p>
                    </div>
                  </div>
                )}

                {endLocation && (
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        To
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {endLoc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Fare Display */}
        <div className="text-center mt-4">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <p className="text-blue-100 text-sm mb-1">Total Fare</p>
            <p className="text-4xl font-bold text-white">
              ₱{fareDetails.totalFare.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-6 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-4 h-4 text-blue-600"
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
            <p className="text-lg font-semibold text-gray-800">
              {fareDetails.distance.toFixed(1) || "N/A"} km
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-4 h-4 text-purple-600"
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
            <p className="text-lg font-semibold text-gray-800">
              {fareDetails.duration / 3600 < 1
                ? (fareDetails.duration / 60).toFixed(2)
                : (fareDetails.duration / 3600).toFixed(2)}{" "}
              {fareDetails.duration / 3600 < 1 ? "min" : "hrs"}{" "}
            </p>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Fare Breakdown
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Base kilometer fare ({fareDetails.baseKm} km)
              </span>
              <span className="font-medium">
                ₱{fareDetails.baseFare.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Additional Kilometer (
                {(fareDetails.baseKm < fareDetails.distance &&
                  (fareDetails.distance - fareDetails.baseKm).toFixed(1)) ||
                  "0"}{" "}
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
                  - ₱
                  {(
                    fareDetails.totalFare / 0.8 -
                    fareDetails.totalFare
                  ).toFixed(2)}
                </span>
              </div>
            )}

            <hr className="my-2" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="text-blue-600">
                ₱{fareDetails.totalFare.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 rounded-lg p-3 mt-4">
          <p className="text-xs text-blue-600 text-center">
            ℹ️ Estimated fare may vary based on actual traffic conditions and
            route changes
          </p>
        </div>
      </div>
    </div>
  );
};

export default FareResult;
