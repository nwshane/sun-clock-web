import React from 'react'

export default class ClockResetIcon extends React.PureComponent {
  render() {
    const dimension = 30
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        version="1.1"
        x="0px"
        y="0px"
      >
        <g stroke="none" strokeWidth="2" fillRule="evenodd">
          <g>
            <path d="M12.3535,3 C7.9355,3 4.3535,6.582 4.3535,11 C4.3535,11.487 4.4015,11.962 4.4855,12.425 L1.7075,9.646 L0.9995,10.354 L4.9995,14.354 L5.0025,14.351 L5.3535,14.703 L5.7045,14.351 L5.7075,14.354 L9.7075,10.354 L8.9995,9.646 L5.6445,13.002 C5.4515,12.356 5.3535,11.685 5.3535,11 C5.3535,7.14 8.4935,4 12.3535,4 C16.2135,4 19.3535,7.14 19.3535,11 C19.3535,14.86 16.2135,18 12.3535,18 L12.3535,19 C16.7715,19 20.3535,15.418 20.3535,11 C20.3535,6.582 16.7715,3 12.3535,3" />
          </g>
        </g>
        <style jsx>{`
          svg {
            fill: inherit;
            height: ${dimension}px;
            width: ${dimension}px;
          }
        `}</style>
      </svg>
    )
  }
}
