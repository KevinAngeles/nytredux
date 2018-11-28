import { BEGIN_SAVE_ARTICLE, SUCCESS_SAVE_ARTICLE, FAILURE_SAVE_ARTICLE, REQUEST_SAVED_ARTICLES, RECEIVE_SAVED_ARTICLES, RECEIVE_SAVED_ARTICLES_FAILURE, BEGIN_REMOVE_SAVED_ARTICLE, SUCCESS_REMOVE_SAVED_ARTICLE, FAILURE_REMOVE_SAVED_ARTICLE } from '../actions/types';

const initialState = {
  articles: [],
  loadingArticles: false,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_SAVE_ARTICLE:
      return { ...state, loadingArticles: true };
    case SUCCESS_SAVE_ARTICLE:
      let newState = { ...state, loadingArticles: false };
      newState.articles = [action.savedArticle,...newState.articles];
      return newState;
    case FAILURE_SAVE_ARTICLE:
      return { ...state, error: action.error, loadingArticles: false  };
    case BEGIN_REMOVE_SAVED_ARTICLE:
      return { ...state, loadingArticles: true };
    case SUCCESS_REMOVE_SAVED_ARTICLE:
      let updatedSavedArticles = [...state.articles].filter( savedArticle => 
        (savedArticle.url !== action.url) 
      );
      return { ...state, articles: updatedSavedArticles, loadingArticles: false  };
    case FAILURE_REMOVE_SAVED_ARTICLE:
      return { ...state, error: action.error, loadingArticles: false  };
    case REQUEST_SAVED_ARTICLES:
      return { ...state, loadingArticles: true };
    case RECEIVE_SAVED_ARTICLES:
      return { ...state, articles: action.articles, loadingArticles: false };
    case RECEIVE_SAVED_ARTICLES_FAILURE:
      return { ...state, error: action.error, loadingArticles: false  };
    default:
      return state;
  }
};

export default reducer;