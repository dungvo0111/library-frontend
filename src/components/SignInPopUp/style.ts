import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      width: '400px',
      height: '500px',
      position: 'relative',
    },
    dialogClose: {
      position: 'absolute',
      top: '3px',
      right: '8px'
    },
    tabRoot: {
      width: '176px'
    },
  })
)

export default useStyles
