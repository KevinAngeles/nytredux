import { VALIDATE_SEARCH, REQUEST_ARTICLES, RECEIVE_ARTICLES, RECEIVE_FAILURE, SET_KEYWORD, SET_BEGIN_DATE, SET_END_DATE, SET_BEGIN_DATE_FOCUS, SET_END_DATE_FOCUS } from './types';

// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from 'axios';

// nyt API
const nytAPI = '909b1c1fe6514ff79c445af593f0348a';

export const requestArticles = () => ({
  type: REQUEST_ARTICLES,
});

export const receivedArticles = articles => ({
  type: RECEIVE_ARTICLES,
  articles,
});

export const receivedFailure = error => ({
  type: RECEIVE_FAILURE,
  error
});

export const validateSearchInputs = (keyWord,beginDate,endDate) => {
  let inputErrors = {
    keyWord: {
      msg: '',
      status: false
    },
    beginDate: {
      msg: '',
      status: false
    },
    endDate: {
      msg: '',
      status: false
    }
  };
  
  // Check errors and update newTerm
  if (keyWord.trim().length == 0) {
    inputErrors.keyWord.status = true;
    inputErrors.keyWord.msg = 'Topic cannot be empty.';
  }
  if (beginDate.isAfter(endDate)) {
    inputErrors.beginDate.status = true;
    inputErrors.beginDate.msg = 'Begin Date should be older than End Date.';
    inputErrors.endDate.status = true;
    inputErrors.endDate.msg = 'Begin Date should be older than End Date.';
  }
  return inputErrors;
};

export function fetchArticles(keyWord,beginDate,endDate,savedArticles) {
  const displayFormatDate = 'YYYYMMDD';
  const formatedBeginDate = beginDate.format(displayFormatDate);
  const formatedEndDate = endDate.format(displayFormatDate);
  return function (dispatch) {
    dispatch(requestArticles());
    const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='
    + keyWord + '&begin_date=' + formatedBeginDate + '&end_date=' + formatedEndDate + '&api-key=' + nytAPI;

    return axios
      .get(url)
        .then( response => {
          let articles = response.data.response.docs.reduce( (filteredArticles,article) => {
            //Filter all the articles that don't have snippets or articles that have null or empty snippets
            const validArticle = (article.hasOwnProperty('snippet') && typeof article['snippet'] === 'string' && article['snippet'].length);
            if( validArticle ) {
              // Check if there is at least one saved article
              // with the same url that the article retrieved from the New York Times
              let alreadySaved = savedArticles.some( savedArticle => {
                return savedArticle['url'] === article['web_url'];
              });
              // If the article is already stored in the database set button disabled
              article['alreadySaved'] = alreadySaved;
              filteredArticles.push(article);
            }
            return filteredArticles;
          }, []);
          return dispatch(receivedArticles(articles));
        }).catch( error => dispatch(receivedFailure(error)) );
	}
};

export const validateSearch = (inputErrors) => ({
  type: VALIDATE_SEARCH,
  inputErrors
});

export const validateAndFetchArticles = (keyWord,beginDate,endDate,savedArticles) => {
  let inputErrors = validateSearchInputs(keyWord,beginDate,endDate);
  return dispatch => {
    dispatch(validateSearch(inputErrors));
    if (!inputErrors.keyWord.status && !inputErrors.beginDate.status && !inputErrors.endDate.status) {
      dispatch(fetchArticles(keyWord,beginDate,endDate,savedArticles));
    }
  }
};

export const setKeyword = keyWord => ({
  type: SET_KEYWORD,
  keyWord: keyWord.target.value,
});

export const setBeginDate = beginDate => ({
  type: SET_BEGIN_DATE,
  beginDate,
});

export const setEndDate = endDate => ({
  type: SET_END_DATE,
  endDate,
});

export const setBeginDateFocus = isBeginDateFocused => ({
  type: SET_BEGIN_DATE_FOCUS,
  isBeginDateFocused,
});

export const setEndDateFocus = isEndDateFocused => ({
  type: SET_END_DATE_FOCUS,
  isEndDateFocused,
});