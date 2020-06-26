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
  TablePagination,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { GoGovReduxState } from '../../reducers/types'
import useAppMargins from '../AppMargins/appMargins'
import { UrlTypePublic } from '../../reducers/search/types'
import searchActions from '../../actions/search'
import PaginationActionComponent from '../widgets/PaginationActionComponent'

const useStyles = makeStyles((theme) =>
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
    toolbar: {
      paddingLeft: (props: SearchPageStyleProps) => props.appMargins,
      paddingRight: (props: SearchPageStyleProps) => props.appMargins,
    },
    spacer: {
      flex: 0,
    },
    caption: {
      fontWeight: 400,
      marginRight: '4px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    select: {
      border: 'solid 1px #d8d8d8',
      zIndex: 2,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    selectIcon: {
      zIndex: 2,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    pagination: {
      marginTop: '52px',
      marginBottom: '46px',
    },
  }),
)

type SearchPageProps = {}

type SearchPageStyleProps = {
  appMargins: number
}

const SearchPage: FunctionComponent<SearchPageProps> = ({}) => {
  const appMargins = useAppMargins()
  const classes = useStyles({ appMargins })
  const dispatch = useDispatch()
  const resultsCount = useSelector(
    (state: GoGovReduxState) => state.search.resultsCount,
  )
  const queryForResult = useSelector(
    (state: GoGovReduxState) => state.search.queryForResult,
  )
  const searchResults = useSelector(
    (state: GoGovReduxState) => state.search.results,
  )
  const { rowsPerPage, currentPage } = useSelector(
    (state: GoGovReduxState) => state.search.tableConfig,
  )

  const pageCount = Math.ceil(resultsCount / rowsPerPage)

  const changePageHandler = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    pageNumber: number,
  ) => {
    dispatch(searchActions.setSearchPageNumber(pageNumber))
    dispatch(searchActions.getSearchResults())
  }

  const changeRowsPerPageHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(searchActions.setSearchPageNumber(0))
    dispatch(
      searchActions.setSearchRowsPerPage(parseInt(event.target.value, 10)),
    )
    dispatch(searchActions.getSearchResults())
  }

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
            <GoSearchInput autoSearch showAdornments />
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
            <TablePagination
              className={classes.pagination}
              ActionsComponent={({ onChangePage, page }) => (
                <PaginationActionComponent
                  pageCount={pageCount}
                  onChangePage={onChangePage}
                  page={page}
                />
              )}
              labelRowsPerPage="Links per page"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={resultsCount}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={changePageHandler}
              onChangeRowsPerPage={changeRowsPerPageHandler}
              classes={{
                spacer: classes.spacer,
                toolbar: classes.toolbar,
                caption: classes.caption,
                select: classes.select,
                selectIcon: classes.selectIcon,
              }}
            />
          </Table>
        </>
      )}
    </BaseLayout>
  )
}

export default SearchPage
