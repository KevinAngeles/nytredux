// Include React
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { normalizeDate } from '../../utils';
import { fetchSavedArticles, removeSavedArticle } from '../../actions/saved';
import PropTypes from 'prop-types';

class Saved extends Component {
  constructor(props) {
		super(props);
  }
  
  componentDidMount() {
    this.props.fetchSavedArticles();
  }

  render() {
		return (
			<div id="savedSection" className="row">
				<div className="page-header">
					<h2>Saved Articles</h2>
				</div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Articles saved on the Database</h3>
          </div>
          <div className="panel-body">
            {
              this.props.savedArticles.map( article => (
                <div className="savedArticle col-md-12" key={article._id}>
                  <div className="row">
                    <div className="col-md-12">Date Saved: {normalizeDate(article.date)}</div>
                  </div>
                  <div className="row text-center">
                    <div className="col-md-8"><h3><a href={article.url}>{article.title}</a></h3></div>
                    <div className="col-md-4"><button type="button" className="btn paper paper-raise" value="1" onClick={ () => this.props.removeSavedArticle(this.props.articles,article.url) }>Remove</button></div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
		  </div>
  	);
  }
};

Saved.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
    alreadySaved: PropTypes.bool.isRequired,
    web_url: PropTypes.string.isRequired
  })),
  savedArticles: PropTypes.array.isRequired,
  fetchSavedArticles: PropTypes.func.isRequired,
  removeSavedArticle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  savedArticles: state.saved.articles,
  articles: state.search.articles
});

const mapDispatchToProps = {
  fetchSavedArticles,
  removeSavedArticle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Saved);
