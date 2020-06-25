import { SearchResultsSortOrder } from '../../../shared/search'
import { UrlTypePublic } from '../../reducers/search/types'

export const SET_SEARCH_QUERY = 'SET_SEARCH_INPUT'
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_INPUT'
export const SET_SEARCH_SORT_ORDER = 'SET_SEARCH_SORT_ORDER'
export const SET_SEARCH_ROWS_PER_PAGE = 'SET_SEARCH_ROWS_PER_PAGE'
export const SET_SEARCH_PAGE_NUMBER = 'SET_SEARCH_PAGE_NUMBER'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const SET_IS_REDIRECT_ON_RESULT = 'SET_IS_REDIRECT_ON_RESULT'

export type SetSearchQueryAction = {
  type: typeof SET_SEARCH_QUERY
  payload: string
}

export type SetIsRedirectOnResultAction = {
  type: typeof SET_IS_REDIRECT_ON_RESULT
  payload: boolean
}

export type ClearSearchQueryAction = {
  type: typeof CLEAR_SEARCH_QUERY
}

export type SetSearchSortOrderAction = {
  type: typeof SET_SEARCH_SORT_ORDER
  payload: SearchResultsSortOrder
}

export type SetSearchRowsPerPageAction = {
  type: typeof SET_SEARCH_ROWS_PER_PAGE
  payload: number
}

export type SetSearchPageNumberAction = {
  type: typeof SET_SEARCH_PAGE_NUMBER
  payload: number
}

export type SetSearchResultsAction = {
  type: typeof SET_SEARCH_RESULTS
  payload: {
    urls: Array<UrlTypePublic>
    count: number
    query: string
  }
}

export type SearchActionType =
  | SetSearchQueryAction
  | ClearSearchQueryAction
  | SetSearchSortOrderAction
  | SetSearchRowsPerPageAction
  | SetSearchPageNumberAction
  | SetSearchResultsAction
  | SetIsRedirectOnResultAction
