import React from 'react'
import { Trans } from 'react-i18next'
import {
  Link,
  Typography,
  createStyles,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Section from '../Section'
import landingGraphicMain from '../../assets/landing-page-graphics/landing-main.svg'
import GoSearchInput from '../widgets/GoSearchInput'

const useStyles = makeStyles((theme) =>
  createStyles({
    pageHeightContainer: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${theme.spacing(4) + 108}px)`,
      },
      [theme.breakpoints.up('lg')]: {
        minHeight: `calc(100vh - ${theme.spacing(6) + 108}px)`,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      position: 'relative',
      top: '35px',
      alignItems: 'center',
      marginTop: '-35px',
      [theme.breakpoints.up('md')]: {
        alignItems: 'start',
        justifyContent: 'space-around',
        flexDirection: 'row',
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: theme.spacing(11),
        marginRight: theme.spacing(11),
      },
    },
    titleTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '485px',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        minWidth: '500px',
      },
      [theme.breakpoints.up('md')]: {
        alignItems: 'start',
        textAlign: 'start',
        marginTop: theme.spacing(4),
        marginBottom: 0,
      },
      '@media screen\\0': {
        display: 'inline',
      },
    },
    titleText: {
      fontWeight: '500',
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
    subtitleText: {
      maxWidth: '404px',
    },
    headerGraphic: {
      position: 'relative',
      top: '8px',
      zIndex: 1,
      [theme.breakpoints.up('lg')]: {
        marginRight: '96px',
      },
    },
    fillColor: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '1',
      backgroundColor: theme.palette.primary.dark,
      maxHeight: '30vw',
      minHeight: '150px',
      [theme.breakpoints.up('sm')]: {
        minHeight: '200px',
      },
    },
    signInTextContainer: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(10.5),
        justifyContent: 'flex-start',
      },
      [theme.breakpoints.up('lg')]: {
        alignItems: 'flex-start',
      },
    },
    signInText: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%',
      textAlign: 'center',
    },
    input: {
      height: '100%',
    },
  }),
)

const LandingGraphicSliver = () => {
  const classes = useStyles()
  const topPaddingMultipler = () => {
    const theme = useTheme()
    const isMediumWidth = useMediaQuery(theme.breakpoints.up('md'))
    if (isMediumWidth) {
      return 50 / 64
    }
    return 0.125
  }

  return (
    <div className={classes.pageHeightContainer}>
      <Section
        backgroundType="white"
        topMultiplier={topPaddingMultipler()}
        bottomMultiplier={0}
      >
        <div className={classes.container}>
          <div className={classes.titleTextContainer}>
            <Typography
              variant="h1"
              color="textPrimary"
              gutterBottom
              className={classes.titleText}
            >
              <Trans>general.appCatchphrase.styled</Trans>
            </Typography>
            <Typography
              className={classes.subtitleText}
              variant="subtitle1"
              color="textPrimary"
            >
              <Trans>general.appDescription.subtitle</Trans>
            </Typography>
          </div>
          <img
            src={landingGraphicMain}
            alt="Landing graphic"
            className={classes.headerGraphic}
          />
          <GoSearchInput />
        </div>
      </Section>
      <div className={classes.fillColor}>
        <div className={classes.signInTextContainer}>
          <Typography
            className={classes.signInText}
            variant="caption"
            color="secondary"
          >
            <Trans>general.appSignInPrompt</Trans>{' '}
            <Link href="/#/login" color="inherit" underline="always">
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default LandingGraphicSliver
