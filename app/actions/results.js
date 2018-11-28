import { BEGIN_SAVE_ARTICLE, SUCCESS_SAVE_ARTICLE, FAILURE_SAVE_ARTICLE, UPDATE_ARTICLES } from './types';

// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from 'axios';

export const beginSaveArticle = () => ({
  type: BEGIN_SAVE_ARTICLE
});

export const successSaveArticle = (savedArticle) => ({
  type: SUCCESS_SAVE_ARTICLE,
  savedArticle
});

export const failureSaveArticle = error => ({
  type: FAILURE_SAVE_ARTICLE,
  error
});

export const updateArticles = articles => ({
  type: UPDATE_ARTICLES,
  articles
})

export const saveArticle = (title,url,articles) => {
  return dispatch => {
    dispatch(beginSaveArticle());
    const queryUrl = '/api/saved';
    const data = {
      title: title,
      url: url
    };
    
    return axios
      .post(queryUrl,data)
        .then( response => {
          let savedArticle = response.data;
          let updatedArticles = articles.map( article => { 
            if (savedArticle['url'] === article['web_url']) {
              // If the article is already stored in the database set button disabled
              article['alreadySaved'] = true;
            }
            return article;
          });
          
          dispatch(updateArticles(updatedArticles));
          return dispatch(successSaveArticle(savedArticle));
        }).catch( error => dispatch(failureSaveArticle(error)) );
	}
};