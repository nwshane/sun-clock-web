class AppMessage extends React.Component {
  render() {
    return (
      <p>
        {this.props.text}
        <style jsx>{`
          p {
            padding: 0 20px;
          }
        `}</style>
      </p>
    )
  }
}

export default AppMessage
