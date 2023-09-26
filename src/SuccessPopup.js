import React from "react";

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#007acc",
  color: "#fff",
  padding: "16px",
  borderRadius: "4px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: "9999",
  textAlign: "center",
};

const closeButtonStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  cursor: "pointer",
  color: "#fff",
};

export default function SuccessPopup({ onClose }) {
  return (
    <div style={popupStyle}>
      <span style={closeButtonStyle} onClick={onClose}>
        &times;
      </span>
      <p>Added Successfully!</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
