import React from "react";

const KofiDonateCard = () => {
  return (
    <iframe
      id="kofiframe"
      src="https://ko-fi.com/uxjulia/?hidefeed=true&widget=true&embed=true&preview=true"
      height="712"
      title="Support me on Ko-Fi"
      style={{
        overflow: "hidden",
        border: "none",
        width: "100%",
        padding: "15px",
        background: "#f9f9f9",
      }}
    ></iframe>
  );
};

export default KofiDonateCard;
