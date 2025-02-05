import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="stars"></div>
      <div className="planet"></div>
      <div className="astronaut">
        <div className="astronaut-body"></div>
        <div className="astronaut-head"></div>
        <div className="astronaut-arm left"></div>
        <div className="astronaut-arm right"></div>
        <div className="astronaut-leg left"></div>
        <div className="astronaut-leg right"></div>
      </div>
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! You are lost in space</h2>
        <p>The page you are looking for has drifted into a black hole.</p>
        <Link to="/" className="back-to-earth">
          Return to Earth (Homepage)
        </Link>
      </div>
    </div>
  )
}

export default NotFound

