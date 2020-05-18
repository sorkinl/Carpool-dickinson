import { makeStyles} from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      
    },
    drawer: {
      width: "22%",
      flexShrink: 0,
      
    },
    drawerPaper: {
      width: "22%",
      zIndex:1
    },
    content: {
      width: "75%"
    },
  }));
