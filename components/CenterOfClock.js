class CenterOfClock extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <style jsx>{`
          div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid black;
            background-color: white;
            padding: 2px 5px;
          }
        `}</style>
      </div>
    )
  }
}

export default CenterOfClock
