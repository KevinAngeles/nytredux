import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveArticle } from '../../actions/results';
import PropTypes from 'prop-types';

class SingleNews extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let title = this.props.article.snippet;
    let web_url = this.props.article.web_url;
    let articles = this.props.articles;
    this.props.saveArticle(title, web_url, articles);
  }

  render() {
    return (
      <li className="titleNews list-group-item row" key={this.props.key}>
        <div className="col-md-8"><a href={this.props.article.web_url}>{this.props.article.snippet}</a></div>
        <div className="col-md-4 text-center"><button type="button" className="btn paper paper-raise" value="index" disabled={this.props.article.alreadySaved} onClick={ this.handleClick }>{this.props.article.alreadySaved ? 'Already Saved':'Save'}</button></div>
      </li>
    )
  }
}

SingleNews.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
    alreadySaved: PropTypes.bool.isRequired,
    web_url: PropTypes.string.isRequired
  })),
  savedArticles: PropTypes.array.isRequired,
  saveArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  articles: state.search.articles,
  savedArticles: state.saved.articles,
})

const mapDispatchToProps = {
  saveArticle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleNews);
