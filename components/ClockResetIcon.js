import React from 'react'

export default class ClockResetIcon extends React.PureComponent {
  render() {
    const dimension = 30
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 60"
        version="1.1"
        x="0px"
        y="0px"
      >
        <g strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round">
          <g>
            <path d="M46,26 C46,14.954305 37.045695,6 26,6 C14.954305,6 6,14.954305 6,26 C6,37.045695 14.954305,46 26,46 L26,46" />
            <path
              d="M33,43 C33,47.418278 36.581722,51 41,51 L41,51 C45.418278,51 49,47.418278 49,43 M49,39 C49,34.581722 45.418278,31 41,31 C36.581722,31 33,34.581722 33,39 M47.3058382,37.2233575 L49.2087597,39.9854021 L49.2087597,39.9854021 L50.2766425,36.8058382 M31.7531192,45.2161842 L32.7653483,42.0184675 L32.7653483,42.0184675 L34.7161842,44.7468808"
              transform="translate(41.014881, 41.000000) rotate(30.000000) translate(-41.014881, -41.000000) "
            />
            <path d="M26,12 L26,26" />
            <path d="M26,26 L30,32.9282032" />
          </g>
        </g>
        <style jsx>{`
          svg {
            stroke: inherit;
            height: ${dimension}px;
            width: ${dimension}px;
          }
        `}</style>
      </svg>
    )
  }
}
