import React from "react";

const ComingSoonPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-[#2A3543] rounded-2xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
          <p className="text-gray-300 mb-4">
            Our app will be available shortly.
          </p>
          <button
            onClick={onClose}
            className="bg-[#F67C37] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPopup;
