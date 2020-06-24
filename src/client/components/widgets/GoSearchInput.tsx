import React, { FunctionComponent } from 'react'
import { createStyles, makeStyles, TextField } from '@material-ui/core'
import searchIcon from '../../assets/icons/go-search-icon.svg'

type GoSearchInputProps = {}

const useStyles = makeStyles(() =>
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
      marginLeft: '32px',
      marginRight: '20px',
    },
  }),
)
const GoSearchInput: FunctionComponent<GoSearchInputProps> = ({}) => {
  const classes = useStyles()
  return (
    <TextField
      className={classes.searchTextField}
      placeholder="Search all go.gov.sg links"
      InputProps={{
        className: classes.searchInput,
        startAdornment: (
          <img
            src={searchIcon}
            alt="search"
            className={classes.searchInputIcon}
          />
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
