import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'react'
import {
  CLEAR_SEARCH_QUERY,
  ClearSearchQueryAction,
  SET_SEARCH_PAGE_NUMBER,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_ROWS_PER_PAGE,
  SET_SEARCH_SORT_ORDER,
  SearchActionType,
  SetSearchPageNumberAction,
  SetSearchQueryAction,
  SetSearchResultsAction,
  SetSearchRowsPerPageAction,
  SetSearchSortOrderAction,
} from './types'
import { GoGovReduxState } from '../../reducers/types'
import { RootActionType, SetErrorMessageAction } from '../root/types'
import { GetReduxState } from '../types'
import rootActions from '../root'
import { SearchResultsSortOrder } from '../../../shared/search'
import { UrlTypePublic } from '../../reducers/search/types'

function setSearchQuery(payload: string): SetSearchQueryAction {
  return {
    type: SET_SEARCH_QUERY,
    payload,
  }
}

function clearSearchQuery(): ClearSearchQueryAction {
  return {
    type: CLEAR_SEARCH_QUERY,
  }
}

function setSearchSortOrder(
  payload: SearchResultsSortOrder,
): SetSearchSortOrderAction {
  return {
    type: SET_SEARCH_SORT_ORDER,
    payload,
  }
}

function setSearchRowsPerPage(payload: number): SetSearchRowsPerPageAction {
  return {
    type: SET_SEARCH_ROWS_PER_PAGE,
    payload,
  }
}

function setSearchPageNumber(payload: number): SetSearchPageNumberAction {
  return {
    type: SET_SEARCH_PAGE_NUMBER,
    payload,
  }
}

function setSearchResults(payload: {
  count: number
  urls: Array<UrlTypePublic>
}): SetSearchResultsAction {
  return {
    type: SET_SEARCH_RESULTS,
    payload,
  }
}

const getSearchResults = (): ThunkAction<
  void,
  GoGovReduxState,
  void,
  SearchActionType | RootActionType
> => async (
  dispatch: Dispatch<SetErrorMessageAction>,
  getState: GetReduxState,
) => {
  const state = getState()
  dispatch(rootActions.setErrorMessage(`Not implemented yet. state: ${state}`))
}

export default {
  setSearchQuery,
  clearSearchQuery,
  getSearchResults,
  setSearchSortOrder,
  setSearchRowsPerPage,
  setSearchPageNumber,
  setSearchResults,
}
