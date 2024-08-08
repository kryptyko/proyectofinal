
import PropTypes from 'prop-types';
const ArticlesCard = ({ article }) => {
    return (
      <>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={article.image || 'https://via.placeholder.com/150'} alt={article.title} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{article.title}</p>
              </div>
            </div>
            <div className="content">
              {article.abstract || article.content.substring(0, 100)}...
              <a href={`/articles/${article.id}`} target="_blank" rel="noopener noreferrer" className="read-more">
              Leer más
            </a>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  ArticlesCard.propTypes = {
    article: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      abstract: PropTypes.string,
      content: PropTypes.string.isRequired,
      
    }).isRequired,
  };
  
  export default ArticlesCard;
