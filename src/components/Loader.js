import * as React from "react"

function SvgComponent(props) {
  return (
    <div className="py-5 w-full flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "auto",
          background: "0 0",
        }}
        width={54}
        height={54}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        display="block"
        {...props}
      >
        <circle
          cx={50}
          cy={50}
          fill="none"
          stroke="#ed6d5c"
          strokeWidth={7}
          r={32}
          strokeDasharray="150.79644737231007 52.26548245743669"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  )
}

export default SvgComponent
