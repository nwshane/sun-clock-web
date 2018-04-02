export default class LoadingDots extends React.Component {
  render() {
    return (
      <span className="loading">
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <style jsx>{`
          .loading span {
            font-size: 50px;
            animation-name: blink;
            animation-duration: 1.4s;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
            line-height: 0px;
          }

          .loading span:nth-child(2) {
            animation-delay: 0.2s;
          }

          .loading span:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes blink {
            0% {
              opacity: 0.2;
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: 0.2;
            }
          }
        `}</style>
      </span>
    )
  }
}
