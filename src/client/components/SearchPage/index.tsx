import React, { FunctionComponent } from 'react'
import GoSearchInput from '../widgets/GoSearchInput'
import BaseLayout from '../BaseLayout'
import { ApplyAppMargins } from '../AppMargins'
import { Typography, createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    headerWrapper: {
      backgroundColor: '#384a51',
      position: 'sticky',
      top: 0,
    },
  }),
)

type SearchPageProps = {}

const SearchPage: FunctionComponent<SearchPageProps> = ({}) => {
  const classes = useStyles()
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
      <ApplyAppMargins>
        <div style={{ height: '100vh', background: 'white' }}>test</div>
      </ApplyAppMargins>
    </BaseLayout>
  )
}

export default SearchPage
