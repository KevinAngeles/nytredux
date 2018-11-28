import { REQUEST_ARTICLES, RECEIVE_ARTICLES, RECEIVE_FAILURE, SET_KEYWORD, SET_BEGIN_DATE, SET_END_DATE, SET_BEGIN_DATE_FOCUS, SET_END_DATE_FOCUS, VALIDATE_SEARCH, UPDATE_ARTICLES } from '../actions/types';
import moment from 'moment';

const initialState = {
  articles: [],
  loadingArticles: false,
  keyWord: '',
  beginDate: moment().subtract(1, 'months'),
  endDate: moment(),
  isBeginDateFocused: false,
  isEndDateFocused: false,
  error: null,
  inputErrors: {
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
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_SEARCH:    
      return { ...state, inputErrors: action.inputErrors };
    case REQUEST_ARTICLES:
      return { ...state, loadingArticles: true };
    case RECEIVE_ARTICLES:
      return { ...state, articles: action.articles, loadingArticles: false };
    case RECEIVE_FAILURE:
      return { ...state, error: action.error, loadingArticles: false  };
    case UPDATE_ARTICLES:
      return { ...state, articles: action.articles }
    case SET_KEYWORD:
      return { ...state, keyWord: action.keyWord };
    case SET_BEGIN_DATE:
      return { ...state, beginDate: action.beginDate };
    case SET_END_DATE:
      return { ...state, endDate: action.endDate };
    case SET_BEGIN_DATE_FOCUS:
      return { ...state, isBeginDateFocused: action.isBeginDateFocused };
    case SET_END_DATE_FOCUS:
      return { ...state, isEndDateFocused: action.isEndDateFocused };
    default:
      return state;
  }
};

export default reducer;
