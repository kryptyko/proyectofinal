import './Banner.css';
import { Link } from 'react-router-dom';
const Banner = () => {
  return (
    <>
      <div className="has-text-centered">
        <Link to="/">
            <h1 className="title has-text-primary">
              SachaNEWS
            </h1>
        </Link>
          </div>
        
        
    </>
  );
};

export default Banner;