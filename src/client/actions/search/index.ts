import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'react'
import querystring from 'querystring'
import { History } from 'history'
import {
  CLEAR_SEARCH_QUERY,
  ClearSearchQueryAction,
  SET_IS_REDIRECT_ON_RESULT,
  SET_SEARCH_PAGE_NUMBER,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_ROWS_PER_PAGE,
  SET_SEARCH_SORT_ORDER,
  SearchActionType,
  SetIsRedirectOnResultAction,
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
import { get } from '../../util/requests'
import { SEARCH_PAGE } from '../../util/types'

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
  query: string
}): SetSearchResultsAction {
  return {
    type: SET_SEARCH_RESULTS,
    payload,
  }
}

function setIsRedirectOnResult(payload: boolean): SetIsRedirectOnResultAction {
  return {
    type: SET_IS_REDIRECT_ON_RESULT,
    payload,
  }
}

const getSearchResults = (
  history: History,
): ThunkAction<
  void,
  GoGovReduxState,
  void,
  SearchActionType | RootActionType
> => async (
  dispatch: Dispatch<
    SetErrorMessageAction | SetSearchResultsAction | SetIsRedirectOnResultAction
  >,
  getState: GetReduxState,
) => {
  const {
    search: {
      isRedirectOnResult,
      tableConfig: { currentPage, rowsPerPage, sortOrder: order },
      query,
    },
  } = getState()
  if (!query) {
    return
  }
  const offset = currentPage * rowsPerPage
  const limit = rowsPerPage
  const paramsObj = {
    query,
    order,
    limit,
    offset,
  }
  const params = querystring.stringify(paramsObj)
  const response = await get(`/api/search/urls?${params}`)
  const json = await response.json()
  if (!response.ok) {
    dispatch(
      rootActions.setErrorMessage(
        json.message || 'Error fetching search results',
      ),
    )
    return
  }

  dispatch(
    setSearchResults({
      count: json.count,
      urls: json.urls as Array<UrlTypePublic>,
      query,
    }),
  )

  if (isRedirectOnResult) {
    dispatch(setIsRedirectOnResult(false))
    history.push(SEARCH_PAGE)
  }
}

export default {
  setSearchQuery,
  clearSearchQuery,
  getSearchResults,
  setSearchSortOrder,
  setSearchRowsPerPage,
  setSearchPageNumber,
  setSearchResults,
  setIsRedirectOnResult,
}
