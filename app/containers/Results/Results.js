// Include React
import React from 'react';
import { connect } from 'react-redux';
import  SingleNews  from './SingleNews';
import PropTypes from 'prop-types';

let Results = ({ articles, loading }) => {
  let results = "";

  if (loading) {
    results = (<h3 className="loading-indicator">Loading ...</h3>);
  }
  else {
    results = (
      <div id="resultSection" className="row">
        <div className="page-header">
          <h2>Results</h2>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">List of articles</h3>
          </div>
          <div className="panel-body">
            <ul id="news" className="list-group">
              {
                articles.length ? articles.map( article => (<SingleNews article={article} key={article._id}/>) )
                 : (<h3>No articles found. Please, try with a new topic or date.</h3>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return ( results );
}

Results.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
    alreadySaved: PropTypes.bool.isRequired,
    web_url: PropTypes.string.isRequired
  })),
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  articles: state.search.articles,
  loading: state.search.loadingArticles,
})

export default connect(
  mapStateToProps,
  null
)(Results)