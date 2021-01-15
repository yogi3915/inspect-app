import './style.css';

export default () => {
  return (
    <footer className="footer">
      <div className="uk-container">
        <div className="uk-flex uk-flex-between">
          <div className="left-side">
            <h5>All Right Reserved | Copyright {new Date().getFullYear()}</h5>
            <p>Developed by team INSPECT</p>
          </div>
          <div className="right-side">
            <ul className="uk-list">
              <li>Policy</li>
              <li>Terms</li>
              <li>Conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}