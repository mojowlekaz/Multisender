import React from "react";

export const SuccessMessage = () => {
  return (
    <div
      style={{
        background: "#4CAF50", // Green background color
        color: "white", // White text color
        padding: "15px", // Padding around the content
        borderRadius: "5px", // Rounded corners
        width: "300px", // Width of the component
        height: "100px", // Height of the component
        textAlign: "center", // Center-align text
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Transaction successful!</p>
    </div>
  );
};
