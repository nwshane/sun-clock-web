import React from 'react'

export default class DateIcon extends React.Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125"
        x="0px"
        y="0px"
      >
        <path d="M18,98H82A16,16,0,0,0,98,82V18A16,16,0,0,0,82,2H18A16,16,0,0,0,2,18V82A16,16,0,0,0,18,98Zm64-8H18a8,8,0,0,1-8-8V34H90V82A8,8,0,0,1,82,90ZM18,10H82a8,8,0,0,1,8,8v8H10V18A8,8,0,0,1,18,10Z" />
        <circle cx="26" cy="62" r="4" />
        <circle cx="26" cy="78" r="4" />
        <circle cx="42" cy="62" r="4" />
        <circle cx="42" cy="78" r="4" />
        <circle cx="58" cy="62" r="4" />
        <circle cx="58" cy="78" r="4" />
        <circle cx="74" cy="62" r="4" />
        <circle cx="42" cy="46" r="4" />
        <circle cx="58" cy="46" r="4" />
        <circle cx="74" cy="46" r="4" />
        <style jsx>{`
          height: 1em;
          margin-bottom: -0.12em;
          margin-right: 0.2em;
        `}</style>
      </svg>
    )
  }
}
