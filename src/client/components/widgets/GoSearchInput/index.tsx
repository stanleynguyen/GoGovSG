import React, { FunctionComponent, useState } from 'react'
import {
  createStyles,
  makeStyles,
  TextField,
  IconButton,
  ClickAwayListener,
} from '@material-ui/core'
import searchIcon from '../../../assets/icons/go-search-icon.svg'
import { useSelector, useDispatch } from 'react-redux'
import { GoGovReduxState } from '../../../reducers/types'
import searchActions from '../../../actions/search'
import debounce from 'lodash/debounce'
import sortIcon from './assets/search-sort-icon.svg'
import CloseIcon from '../CloseIcon'
import { useHistory } from 'react-router-dom'
import { SEARCH_PAGE } from '../../../util/types'
import CollapsingPanel from '../CollapsingPanel'
import { SearchResultsSortOrder } from '../../../../shared/search'
import SortPanel from '../SortPanel'

type GoSearchInputProps = {
  autoSearch?: boolean
  showAdornments?: boolean
}

const useStyles = makeStyles((theme) =>
  createStyles({
    searchTextField: {
      minWidth: '100%',
      height: '70px',
    },
    searchInput: {
      height: '100%',
      background: 'white',
      boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.25)',
      borderRadius: '5px',
      border: 0,
    },
    searchInputNested: {
      fontSize: '1rem',
    },
    searchInputIcon: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(2.5),
    },
    searchOptionsButton: {
      marginRight: theme.spacing(2.5),
    },
    sortPanel: {
      width: theme.spacing(50),
      right: 0,
      left: 'auto',
    },
  }),
)

const sortOptions = [
  { key: SearchResultsSortOrder.Relevance, label: 'Most relevant' },
  { key: SearchResultsSortOrder.Popularity, label: 'Most popular' },
  { key: SearchResultsSortOrder.Recency, label: 'Most recent' },
]

const GoSearchInput: FunctionComponent<GoSearchInputProps> = ({
  autoSearch,
  showAdornments,
}) => {
  // TODO: REMOVE IGNORE ONCE ISSORTPANELOPEN IS USED.
  // @ts-ignore
  const [isSortPanelOpen, setIsSortPanelOpen] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const query = useSelector((state: GoGovReduxState) => state.search.query)
  const sortBy = useSelector(
    (state: GoGovReduxState) => state.search.tableConfig.sortOrder,
  )
  const getResults = debounce(
    () => dispatch(searchActions.getSearchResults()),
    500,
  )
  const setSortBy = (key: string) => {
    dispatch(searchActions.setSearchSortOrder(key as SearchResultsSortOrder))
    if (query) {
      getResults()
    }
  }
  const onUpdateQuery = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(searchActions.setSearchQuery(e.target.value))
    if (autoSearch) {
      getResults()
    }
  }
  const onClearQuery = () => dispatch(searchActions.clearSearchQuery())
  return (
    <ClickAwayListener onClickAway={() => setIsSortPanelOpen(false)}>
      <div>
        <TextField
          autoFocus
          className={classes.searchTextField}
          placeholder="Search all go.gov.sg links"
          value={query}
          onChange={onUpdateQuery}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              getResults()
              history.push(SEARCH_PAGE)
              ev.preventDefault()
            }
          }}
          InputProps={{
            className: classes.searchInput,
            startAdornment: (
              <img
                src={searchIcon}
                alt="search"
                className={classes.searchInputIcon}
              />
            ),
            endAdornment: (
              <>
                {showAdornments && (
                  <>
                    {query && (
                      <IconButton onClick={onClearQuery}>
                        <CloseIcon size={24} color="#BBBBBB" />
                      </IconButton>
                    )}
                    <IconButton
                      className={classes.searchOptionsButton}
                      onClick={() => setIsSortPanelOpen(true)}
                    >
                      <img src={sortIcon} alt="options" />
                    </IconButton>
                  </>
                )}
              </>
            ),
          }}
          // TextField takes in two separate inputProps and InputProps,
          // each having its own purpose.
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            className: classes.searchInputNested,
            onClick: () => setIsSortPanelOpen(false),
          }}
        />
        <CollapsingPanel isOpen={isSortPanelOpen} className={classes.sortPanel}>
          <div style={{ marginTop: '30px' }}>
            <SortPanel
              onChoose={setSortBy}
              currentlyChosen={sortBy}
              options={sortOptions}
            />
          </div>
        </CollapsingPanel>
      </div>
    </ClickAwayListener>
  )
}

export default GoSearchInput
