import React, { FunctionComponent, useState } from 'react'
import {
  createStyles,
  makeStyles,
  TextField,
  IconButton,
} from '@material-ui/core'
import searchIcon from '../../../assets/icons/go-search-icon.svg'
import { useSelector, useDispatch } from 'react-redux'
import { GoGovReduxState } from '../../../reducers/types'
import searchActions from '../../../actions/search'
import { useHistory } from 'react-router-dom'
import debounce from 'lodash/debounce'
import sortIcon from './assets/search-sort-icon.svg'
import CloseIcon from '../CloseIcon'

type GoSearchInputProps = {}

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
  }),
)
const GoSearchInput: FunctionComponent<GoSearchInputProps> = ({}) => {
  // TODO: REMOVE IGNORE ONCE ISSORTPANELOPEN IS USED.
  // @ts-ignore
  const [isSortPanelOpen, setIsSortPanelOpen] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const query = useSelector((state: GoGovReduxState) => state.search.query)
  const history = useHistory()
  const getResults = debounce(
    () => dispatch(searchActions.getSearchResults(history)),
    500,
  )
  const onUpdateQuery = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(searchActions.setSearchQuery(e.target.value))
    dispatch(searchActions.setIsRedirectOnResult(true))
    getResults()
  }
  const onClearQuery = () => dispatch(searchActions.clearSearchQuery())
  return (
    <TextField
      autoFocus
      className={classes.searchTextField}
      placeholder="Search all go.gov.sg links"
      value={query}
      onChange={onUpdateQuery}
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
        ),
      }}
      // TextField takes in two separate inputProps and InputProps,
      // each having its own purpose.
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        className: classes.searchInputNested,
      }}
    />
  )
}

export default GoSearchInput
