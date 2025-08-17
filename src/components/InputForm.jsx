const InputForm = ({
  startLocation,
  handleChangeInput,
  handleUserCurrentLocation,
  handleDeletePoint,
  markers,
  originSuggestions,
  debouncedStartLocation,
  handleSelectSuggestion,
  endLocation,
  destinationSuggestions,
  debouncedEndLocation,
  vehicleType,
  setVehicleType,
  passengerType,
  setPassengerType,
  fetchRoute,
  handleClearAll,
}) => {
  return (
    <form className="p-6 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Route Planning</h2>
          <p className="text-sm text-gray-500">
            Calculate fare and plan your journey
          </p>
        </div>
      </div>

      {/* Pickup Point */}
      <div className="relative space-y-2">
        <label
          htmlFor="source"
          className="block text-sm font-semibold text-gray-700 w-fit"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Pickup Point
            <span className="text-red-500 text-xs font-medium">(Required)</span>
            <div className="relative group">
              <svg
                className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max max-w-xs px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                You may pin a location if this field is empty.
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        </label>

        <div className="relative flex items-center">
          <input
            id="source"
            type="text"
            value={startLocation}
            onChange={(e) => handleChangeInput(e, 0)}
            placeholder="Enter pickup location"
            className="w-full p-3 pr-20 text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all duration-200 outline-none"
          />

          <button
            type="button"
            onClick={() => handleUserCurrentLocation(0)}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-blue-100 transition-colors group"
            title="Use current location"
          >
            <svg
              fill="#2196F3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 enabled:group-hover:scale-110 transition-transform"
            >
              <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => handleDeletePoint(0)}
            disabled={markers[0] === null}
            title="Remove origin"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg enabled:hover:bg-red-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <svg
              fill="#ef4444"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 enabled:group-hover:scale-110 transition-transform"
            >
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </button>
        </div>

        {originSuggestions.length > 0 && debouncedStartLocation && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 z-50 max-h-60 overflow-y-auto shadow-lg">
            {originSuggestions.map((s) => (
              <li
                key={s.osm_id}
                onClick={() => handleSelectSuggestion(s, 0)}
                className="p-3 hover:bg-green-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
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
                  </svg>
                  {s.display_name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Drop-off Point */}
      <div className="relative space-y-2">
        <label
          htmlFor="destination"
          className="block text-sm font-semibold text-gray-700 w-fit"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            Drop-off Point
            <span className="text-red-500 text-xs font-medium">(Required)</span>
            <div className="relative group">
              <svg
                className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max max-w-xs px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                You may pin a location if the field is empty.
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        </label>

        <div className="relative flex items-center">
          <input
            id="destination"
            type="text"
            value={endLocation}
            onChange={(e) => handleChangeInput(e, 1)}
            placeholder="Enter destination"
            className="w-full p-3 pr-20 text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all duration-200 outline-none"
          />

          <button
            type="button"
            onClick={() => handleUserCurrentLocation(1)}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-blue-100 transition-colors group"
            title="Use current location"
          >
            <svg
              fill="#2196F3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 enabled:group-hover:scale-110 transition-transform"
            >
              <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => handleDeletePoint(1)}
            disabled={markers[1] === null}
            title="Remove destination"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg enabled:hover:bg-red-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <svg
              fill="#ef4444"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 enabled:group-hover:scale-110 transition-transform"
            >
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </button>
        </div>

        {destinationSuggestions.length > 0 && debouncedEndLocation && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 z-50 max-h-60 overflow-y-auto shadow-lg">
            {destinationSuggestions.map((s) => (
              <li
                key={s.osm_id}
                onClick={() => handleSelectSuggestion(s, 1)}
                className="p-3 hover:bg-red-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
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
                  </svg>
                  {s.display_name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vehicle and Passenger Type Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="vehicle_type"
            className="block text-sm font-semibold text-gray-700"
          >
            <div className="flex items-center gap-2">
              <svg
                fill="#4CAF4F"
                xmlns="http://www.w3.org/2000/svg"
                id="mdi-car"
                viewBox="0 0 24 24"
                className="w-5 h-5 flex-shrink-0"
              >
                <path d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
              </svg>
              Vehicle
              <span className="text-red-500 text-xs font-medium">
                (Required)
              </span>
            </div>
          </label>
          <select
            id="vehicle_type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full p-3 text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all duration-200 outline-none cursor-pointer"
          >
            <option value="" disabled>
              Choose vehicle type
            </option>
            <option value="traditional_jeepney">🚐 Traditional Jeepney</option>
            <option value="aircon_e_jeepney">⚡Airconditioned E-Jeepney</option>
            <option value="non_aircon_e_jeepney">
              ⚡Non-Airconditioned E-Jeepney
            </option>
            <option value="uv_express">🚐 UV Express</option>
            <option value="taxi">🚕 Taxi</option>
            <option value="ordinary_city_bus">🚌 Ordinary City Bus</option>
            <option value="aircon_city_bus">🚌 Airconditioned City Bus</option>
            <option value="ordinary_prov_bus">
              🚌 Ordinary Provincial Bus
            </option>
            <option value="aircon_prov_bus">
              🚌 Airconditioned Provincial Bus
            </option>
            <option value="deluxe_prov_bus">🚌 Deluxe Provincial Bus</option>
            <option value="super_deluxe_prov_bus">
              🚌 Super Deluxe Provincial Bus
            </option>
            <option value="luxury_prov_bus">🚌 Luxury Provincial Bus</option>
            <option value="tricycle" disabled>
              🛵 Tricycle (fares vary per TODA)
            </option>
          </select>
        </div>

        {/* Passenger Type */}
        <div className="space-y-2">
          <label
            htmlFor="passenger_type"
            className="block text-sm font-semibold text-gray-700"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="#4CAF4F"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Passenger
              <span className="text-red-500 text-xs font-medium">
                (Required)
              </span>
            </div>
          </label>
          <select
            id="passenger_type"
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
            className="w-full p-3 text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all duration-200 outline-none cursor-pointer"
          >
            <option value="" disabled>
              Choose passenger type
            </option>
            <option value="regular">👤 Regular</option>
            <option value="student">🎓 Student</option>
            <option value="pwd">♿ Person With Disability</option>
            <option value="senior_citizen">👴 Senior Citizen</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          className="w-full bg-gradient-to-r from-green-500 to-green-600 enabled:hover:from-green-600 enabled:hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform enabled:hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          disabled={
            startLocation.trim() === "" ||
            endLocation.trim() === "" ||
            passengerType === "" ||
            vehicleType === ""
          }
          onClick={fetchRoute}
        >
          <svg
            className="w-5 h-5"
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
          Calculate Fare
        </button>

        <button
          className="w-full bg-gradient-to-r from-red-500 to-red-600 enabled:hover:from-red-600 enabled:hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform enabled:hover:scale-[1.02] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          disabled={
            startLocation.trim() === "" &&
            endLocation.trim() === "" &&
            passengerType === "" &&
            vehicleType === ""
          }
          onClick={handleClearAll}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear All
        </button>
      </div>
    </form>
  );
};

export default InputForm;
