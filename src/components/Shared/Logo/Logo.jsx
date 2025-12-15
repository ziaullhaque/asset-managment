const Logo = ({ size = 42, color = "#3563e9" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Triangle */}
      <polygon
        points="30,8 45,30 15,30"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Square */}
      <rect
        x="10"
        y="34"
        width="16"
        height="16"
        stroke={color}
        strokeWidth="4"
        fill="none"
        rx="2"
      />

      {/* Circle */}
      <circle
        cx="42"
        cy="42"
        r="10"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

export default Logo;
