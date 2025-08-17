import React, { useState } from 'react';

const FareResult = ({ route, distance, vehicleType, estimatedTime, fare, startLocation, endLocation, error }) => {
  const [surcharges, setSurcharges] = useState({
    nightTime: 0,
    holiday: 0,
    peakHours: 2.5
  });

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Calculate Fare</h3>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }


  const baseFare = 15.0;
  const distanceFare = Math.max(0, (fare || 0) - baseFare);
  
  const totalSurcharges = Object.values(surcharges).reduce((sum, charge) => sum + charge, 0);
  const totalFare = (fare || 0) + totalSurcharges;

  const toggleSurcharge = (type) => {
    setSurcharges(prev => ({
      ...prev,
      [type]: prev[type] > 0 ? 0 : 
        type === 'nightTime' ? 5.0 : 
        type === 'holiday' ? 3.0 : 2.5
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
          <div>
            <h2 className="text-xl font-bold">Estimated Fare</h2>
            <p className="text-blue-100 text-sm">{vehicleType.split('_').join(' ') || 'Jeepney'}</p>
            <p className="text-blue-100 text-sm">{startLocation.split(',')[0] + " - " + endLocation.split(',')[0]}</p>
          </div>
        </div>
        
        {/* Main Fare Display */}
        <div className="text-center mt-4">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <p className="text-blue-100 text-sm mb-1">Total Fare</p>
            <p className="text-4xl font-bold text-white">₱{totalFare.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-6 space-y-4">
        {/* Route Info */}
        {(startLocation || endLocation) && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Trip Route
            </h3>
            {startLocation && (
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">From:</span> {startLocation}
              </p>
            )}
            {endLocation && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">To:</span> {endLocation}
              </p>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mb-1">Distance</p>
            <p className="text-lg font-semibold text-gray-800">{distance || 'N/A'} km</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mb-1">Time</p>
            <p className="text-lg font-semibold text-gray-800">{estimatedTime || 'N/A'} min</p>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Fare Breakdown
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base fare</span>
              <span className="font-medium">₱{baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance ({distance || 'N/A'} km)</span>
              <span className="font-medium">₱{distanceFare.toFixed(2)}</span>
            </div>
            
            {Object.entries(surcharges).map(([type, amount]) => (
              amount > 0 && (
                <div key={type} className="flex justify-between text-amber-600">
                  <span>
                    {type === 'nightTime' ? '🌙 Night surcharge' : 
                     type === 'holiday' ? '🎉 Holiday surcharge' : 
                     '🚦 Peak hours'}
                  </span>
                  <span className="font-medium">₱{amount.toFixed(2)}</span>
                </div>
              )
            ))}
            
            <hr className="my-2" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="text-blue-600">₱{totalFare.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Surcharge Toggles */}
        <div className="bg-amber-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-amber-800 mb-3">Additional Charges</h4>
          <div className="space-y-2">
            {Object.entries(surcharges).map(([type, amount]) => (
              <label key={type} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-amber-700">
                  {type === 'nightTime' ? '🌙 Night time (10PM-5AM)' : 
                   type === 'holiday' ? '🎉 Holiday/Weekend' : 
                   '🚦 Peak hours (7-9AM, 5-7PM)'}
                </span>
                <button
                  onClick={() => toggleSurcharge(type)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    amount > 0 ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    amount > 0 ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Book Now
          </button>
          <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            Save Route
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 rounded-lg p-3 mt-4">
          <p className="text-xs text-blue-600 text-center">
            ℹ️ Estimated fare may vary based on actual traffic conditions and route changes
          </p>
        </div>
      </div>
    </div>
  );
};

export default FareResult;