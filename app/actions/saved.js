import { REQUEST_SAVED_ARTICLES, RECEIVE_SAVED_ARTICLES, RECEIVE_SAVED_ARTICLES_FAILURE, BEGIN_REMOVE_SAVED_ARTICLE, SUCCESS_REMOVE_SAVED_ARTICLE, FAILURE_REMOVE_SAVED_ARTICLE } from './types';
import { updateArticles } from './results';

// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from 'axios';

export const requestSavedArticles = () => ({
  type: REQUEST_SAVED_ARTICLES,
});

export const receivedSavedArticles = articles => ({
  type: RECEIVE_SAVED_ARTICLES,
  articles,
});

export const receivedSavedArticlesFailure = error => ({
  type: RECEIVE_SAVED_ARTICLES_FAILURE,
  error
});

export const fetchSavedArticles = () => {
  return dispatch => {
    dispatch(requestSavedArticles());
    const url = '/api/saved';

    return axios
      .get(url)
        .then( response => dispatch(receivedSavedArticles(response.data)) )
        .catch( error => dispatch(receivedSavedArticlesFailure(error)) );
	}
};

export const beginRemoveSavedArticle = () => ({
  type: BEGIN_REMOVE_SAVED_ARTICLE
});

export const successRemoveSavedArticle = url => ({
  type: SUCCESS_REMOVE_SAVED_ARTICLE,
  url
});

export const failureRemoveSavedArticle = error => ({
  type: FAILURE_REMOVE_SAVED_ARTICLE,
  error
});

export const removeSavedArticle = (articles,url) => {
  return dispatch => {
    dispatch(beginRemoveSavedArticle());
    const queryUrl = '/api/saved';
    const data = {
      params: {
        url
      }
    };
    
    return axios
      .delete(queryUrl,data)
        .then( response => {
          let updatedArticles = articles.filter( article => (article.web_url !== url) );
          
          dispatch(updateArticles(updatedArticles));
          return dispatch(successRemoveSavedArticle(url));
        }).catch( error => dispatch(failureRemoveSavedArticle(error)) );
	}
};