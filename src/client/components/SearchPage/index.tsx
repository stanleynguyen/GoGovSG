import React, { FunctionComponent } from 'react'
import GoSearchInput from '../widgets/GoSearchInput'
import BaseLayout from '../BaseLayout'
import { ApplyAppMargins } from '../AppMargins'
import {
  Typography,
  createStyles,
  makeStyles,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { GoGovReduxState } from '../../reducers/types'
import useAppMargins from '../AppMargins/appMargins'
import { UrlTypePublic } from '../../reducers/search/types'

const useStyles = makeStyles(() =>
  createStyles({
    headerWrapper: {
      backgroundColor: '#384a51',
      position: 'sticky',
      top: 0,
    },
    tableRow: {
      '&:hover': {
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
      },
    },
  }),
)

type SearchPageProps = {}

const SearchPage: FunctionComponent<SearchPageProps> = ({}) => {
  const classes = useStyles()
  const appMargins = useAppMargins()
  const resultsCount = useSelector(
    (state: GoGovReduxState) => state.search.resultsCount,
  )
  const queryForResult = useSelector(
    (state: GoGovReduxState) => state.search.queryForResult,
  )
  const searchResults = useSelector(
    (state: GoGovReduxState) => state.search.results,
  )
  return (
    <BaseLayout headerBackgroundType="darkest">
      <div className={classes.headerWrapper}>
        <ApplyAppMargins>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              top: '35px',
            }}
          >
            <Typography
              variant="h2"
              style={{ color: '#f9f9f9', marginBottom: '24px' }}
            >
              GoSearch
            </Typography>
            <GoSearchInput />
          </div>
        </ApplyAppMargins>
      </div>
      {queryForResult && (
        <>
          <ApplyAppMargins>
            <Typography variant="h3" style={{ marginTop: '88px' }}>
              {`Showing ${resultsCount} links for “${queryForResult || ''}”`}
            </Typography>
          </ApplyAppMargins>
          <Table
            aria-label="search results table"
            style={{ marginTop: '24px' }}
          >
            {searchResults.map((url: UrlTypePublic) => (
              <TableRow
                className={classes.tableRow}
                onClick={() =>
                  window.location.assign(
                    `${document.location.protocol}//${document.location.host}/${url.shortUrl}`,
                  )
                }
              >
                <TableCell
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    paddingBottom: '5px',
                    paddingTop: '45px',
                    borderBottom: 'none',
                    maxWidth: `calc(100vw - ${appMargins}px * 2)`,
                    marginLeft: appMargins,
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        color: '#8CA6AD',
                      }}
                    >
                      go.gov.sg/
                    </span>
                    {url.shortUrl}
                  </Typography>
                </TableCell>
                <TableCell
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    paddingTop: '5px',
                    minHeight: '96px',
                    marginRight: 0,
                  }}
                >
                  <Typography
                    color="primary"
                    variant="body2"
                    style={{
                      color: '#384a51',
                      fontWeight: 400,
                      width: '44%',
                      marginLeft: appMargins,
                    }}
                  >
                    {url.description
                      ? url.description
                      : 'No information available.'}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: '#767676',
                      fontWeight: 400,
                      marginLeft: '224px',
                      textOverflow: 'ellipsis',
                      maxWidth: '20%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {url.contactEmail || 'No contact specified'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </>
      )}
    </BaseLayout>
  )
}

export default SearchPage
