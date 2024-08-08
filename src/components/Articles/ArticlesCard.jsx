import { Link } from 'react-router-dom';

function ArticlesCard({ article }) {
    return (
        <div className={`card has-background-dark`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {article.title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    {article.content}
                </div>
                <Link to={`/articles/${article.id}`} className="button is-link">
                    Leer más
                </Link>
            </div>
        </div>
    );
}

export default ArticlesCard;