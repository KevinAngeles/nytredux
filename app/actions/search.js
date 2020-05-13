import { validateSearchInputs } from "../utils";
import {
  VALIDATE_SEARCH,
  REQUEST_ARTICLES,
  RECEIVE_ARTICLES,
  RECEIVE_FAILURE,
  SET_KEYWORD,
  SET_BEGIN_DATE,
  SET_END_DATE,
  SET_BEGIN_DATE_FOCUS,
  SET_END_DATE_FOCUS,
} from "./types";

// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

export const requestArticles = () => ({
  type: REQUEST_ARTICLES,
});

export const receivedArticles = (articles) => ({
  type: RECEIVE_ARTICLES,
  articles,
});

export const receivedFailure = (error) => ({
  type: RECEIVE_FAILURE,
  error,
});

export function fetchArticles(keyWord, beginDate, endDate, savedArticles) {
  const DISPLAY_FORMAT_DATE = "YYYYMMDD";
  const formatedBeginDate = beginDate.format(DISPLAY_FORMAT_DATE);
  const formatedEndDate = endDate.format(DISPLAY_FORMAT_DATE);
  return function (dispatch) {
    dispatch(requestArticles());
    const url =
      "/api/search?q=" +
      keyWord +
      "&begin_date=" +
      formatedBeginDate +
      "&end_date=" +
      formatedEndDate;

    return axios
      .get(url)
      .then((response) => {
        let articles = response.data.reduce((filteredArticles, article) => {
          // Check if there is at least one saved article
          // with the same url that the article retrieved from the New York Times
          let alreadySaved = savedArticles.some((savedArticle) => {
            return savedArticle["url"] === article["web_url"];
          });
          // If the article is already stored in the database set button disabled
          article["alreadySaved"] = alreadySaved;
          filteredArticles.push(article);
          return filteredArticles;
        }, []);
        return dispatch(receivedArticles(articles));
      })
      .catch((error) => dispatch(receivedFailure(error)));
  };
}

export const validateSearch = (inputErrors) => ({
  type: VALIDATE_SEARCH,
  inputErrors,
});

export const validateAndFetchArticles = (
  keyWord,
  beginDate,
  endDate,
  savedArticles
) => {
  let inputErrors = validateSearchInputs(keyWord, beginDate, endDate);
  return (dispatch) => {
    dispatch(validateSearch(inputErrors));
    if (
      !inputErrors.keyWord.status &&
      !inputErrors.beginDate.status &&
      !inputErrors.endDate.status
    ) {
      dispatch(fetchArticles(keyWord, beginDate, endDate, savedArticles));
    }
  };
};

export const setKeyword = (keyWord) => ({
  type: SET_KEYWORD,
  keyWord: keyWord.target.value,
});

export const setBeginDate = (beginDate) => ({
  type: SET_BEGIN_DATE,
  beginDate,
});

export const setEndDate = (endDate) => ({
  type: SET_END_DATE,
  endDate,
});

export const setBeginDateFocus = (isBeginDateFocused) => ({
  type: SET_BEGIN_DATE_FOCUS,
  isBeginDateFocused,
});

export const setEndDateFocus = (isEndDateFocused) => ({
  type: SET_END_DATE_FOCUS,
  isEndDateFocused,
});
