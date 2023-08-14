import React from "react";


function MessagePopup({ message, onClose }) {
    return (
    
    <div className="popup__overlay">
    <div className="popup__wrap">
      <div className="overlay">
        <div className="popup__container">
          <h4>{message}</h4>
          <button onClick={onClose}>Ok, tack</button>
        </div>
      </div>
    </div>
  </div>
    )
}

export default MessagePopup;