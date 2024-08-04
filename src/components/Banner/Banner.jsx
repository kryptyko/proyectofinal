// import './Banner.css';
// import { Link } from 'react-router-dom';
// const Banner = () => {
//   return (
//     <>
//       <div className="has-text-centered">
//         <Link to="/">
//             <h1 className="title has-text-primary">
//               SachaNEWS
//             </h1>
//         </Link>
//           </div>
        
        
//     </>
//   );
// };

// export default Banner;

import './Banner.css';
import { Link } from 'react-router-dom';
import SachaNEWSSvg from '../../assets/sachanews.svg';

const Banner = () => {
  return (
    <>
      <div className="has-text-centered">
        <Link to="/">
          <div className="title has-text-primary">
            <img src={SachaNEWSSvg} alt="SachaNEWS Logo" className="logo-image" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Banner;