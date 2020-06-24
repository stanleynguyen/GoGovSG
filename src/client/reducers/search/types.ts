import { UrlType } from '../user/types'
import { SearchResultsSortOrder } from '../../../shared/search'

export type UrlTypePublic = Omit<UrlType, 'clicks'>

export type SearchState = {
  results: Array<UrlTypePublic>
  resultsCount: number
  query: string
  tableConfig: SearchResultsTableConfig
}

type SearchResultsTableConfig = {
  sortOrder: SearchResultsSortOrder
  rowsPerPage: number
  currentPage: number
}
