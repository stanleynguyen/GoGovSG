import React from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles } from '@material-ui/core'
import { ApplyAppMargins } from './AppMargins'

const useStyles = makeStyles((theme) =>
  createStyles({
    backgroundType: {
      width: '100%',
      backgroundColor: (props) =>
        props.backgroundType === 'light'
          ? theme.palette.secondary.light
          : theme.palette.secondary.dark,
      boxShadow: (props) =>
        props.shadow ? '0px 1px 1px rgba(216, 216, 216, 0.5)' : 0,
      '@media screen\\0': {
        minHeight: '1px',
      },
    },
    childrenPadding: {
      paddingTop: (props) =>
        theme.spacing(8 * props.verticalMultiplier * props.topMultiplier),
      paddingBottom: (props) =>
        theme.spacing(8 * props.verticalMultiplier * props.bottomMultiplier),
    },
  }),
)

const Section = ({
  children,
  backgroundType,
  verticalMultiplier = 1,
  topMultiplier = 1,
  bottomMultiplier = 1,
  className = '',
  shadow = false,
}) => {
  const classes = useStyles({
    backgroundType,
    verticalMultiplier,
    topMultiplier,
    bottomMultiplier,
    shadow,
  })
  return (
    <div className={`${className} ${classes.backgroundType}`}>
      <ApplyAppMargins>
        <div className={classes.childrenPadding}>{children}</div>
      </ApplyAppMargins>
    </div>
  )
}

Section.propTypes = {
  backgroundType: PropTypes.string,
  verticalMultiplier: PropTypes.number,
  topMultiplier: PropTypes.number,
  bottomMultiplier: PropTypes.number,
}

Section.defaultProps = {
  backgroundType: 'light',
  verticalMultiplier: 1,
  topMultiplier: 1,
  bottomMultiplier: 1,
}

export default Section
