import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },

    nav: {
      display: "flex",
      justifyContent: "space-between"
    },

    navLeft: {
      display: "flex",
      alignItems: "center",
    },
    navRight_unauth: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    navRight_auth: {
      display: 'flex',
      alignItems: "center",

      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    responsiveMenu_unauth: {
      display: 'block',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    responsiveMenu_auth: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
  })
)

export default useStyles
