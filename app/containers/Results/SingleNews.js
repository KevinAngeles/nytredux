import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveArticle } from '../../actions/results';

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
