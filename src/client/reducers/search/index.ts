import { SearchState } from './types'
import { SearchResultsSortOrder } from '../../../shared/search'
import {
  CLEAR_SEARCH_QUERY,
  SET_SEARCH_PAGE_NUMBER,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_ROWS_PER_PAGE,
  SET_SEARCH_SORT_ORDER,
  SearchActionType,
} from '../../actions/search/types'

const initialState: SearchState = {
  query: '',
  results: [],
  resultsCount: 0,
  queryForResult: null,
  tableConfig: {
    rowsPerPage: 10,
    currentPage: 0,
    sortOrder: SearchResultsSortOrder.Relevance,
  },
}

const search: (state: SearchState, action: SearchActionType) => SearchState = (
  state = initialState,
  action,
) => {
  let nextState: Partial<SearchState> = {}
  switch (action.type) {
    case SET_SEARCH_QUERY:
      nextState = {
        query: action.payload,
      }
      break
    case CLEAR_SEARCH_QUERY:
      nextState = {
        query: '',
      }
      break
    case SET_SEARCH_SORT_ORDER:
      nextState = {
        tableConfig: {
          ...state.tableConfig,
          sortOrder: action.payload,
        },
      }
      break
    case SET_SEARCH_ROWS_PER_PAGE:
      nextState = {
        tableConfig: {
          ...state.tableConfig,
          rowsPerPage: action.payload,
        },
      }
      break
    case SET_SEARCH_PAGE_NUMBER:
      nextState = {
        tableConfig: {
          ...state.tableConfig,
          currentPage: action.payload,
        },
      }
      break
    case SET_SEARCH_RESULTS:
      // Check if the result is for an old query.
      if (action.payload.query !== state.query) {
        break
      }
      nextState = {
        resultsCount: action.payload.count,
        results: action.payload.urls,
        queryForResult: action.payload.query,
      }
      break
    default:
      break
  }
  return { ...state, ...nextState }
}

export default search
