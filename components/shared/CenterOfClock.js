class CenterOfClock extends React.Component {
  static defaultProps = { showBorder: true }
  render() {
    const { children, showBorder } = this.props
    return (
      <div>
        {children}
        <style jsx>{`
          div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: ${showBorder ? '1px solid black' : 'initial'};
            background-color: white;
            padding: 2px 5px;
          }
        `}</style>
      </div>
    )
  }
}

export default CenterOfClock
