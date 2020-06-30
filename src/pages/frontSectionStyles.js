import {makeStyles} from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({


    header: {
        height: '95vh',
        background: 'linear-gradient(to right bottom,rgba(126,213,111,0.8),rgba(40,180,131,0.8))',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        clipPath: "polygon(0 0, 100% 0, 100% 75vh, 0 100%)"
    },
    text_box: {
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    },
    heading_primary: {
        color: "#fff",
        textTransform: "uppercase",
        backfaceVisibility: "hidden",
        marginBottom: "60px"
    },
    heading_primary_main: {
        display: "block",
        fontSize: "60px",
        fontWeight: "400",
        letterSpacing: "35px",
        animation: `$moveInLeft 1s ${theme.transitions.easing.easeOut}`
    },
    "@keyframes moveInLeft": {
        "0%":{
            opacity: 0,
            transform: "translateY(-100px)"
        },
        "100%":{
            opacity: 1,
            transform: "translate(0)",
        }
    },
    btn:{
        '&:link,&:visited':{
        textTransform: "uppercase",
        textDecoration: "none",
        padding: "15px 40px",
        display: "inline-block",
        borderRadius: "100px",
        transition: "all .2s",
        position: "relative",
        },
        '&:hover': {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 20px rgba(0,0,0,.2)"
        },
        '&:active':{
            transform: "translateY(-1px)",
            boxShadow: "0 5px 10px rgba(0,0,0,.2)"
        }
    },
    btn_white: {
        backgroundColor: '#fff',
        color: '#777'
    },
    ride: {
        padding: 50,
        height: '50px',
        marginLeft: 200
    },
    findbtn: {
        margin: '20px',
        left: 470
    },
    aboutbtn: {
        margin: '20px',
        left: 470
    },
    aboutimg: {
        height: 800,
        margin: '50px'
    },
    findimg: {
        height: 800,
        margin: '50px'
    },
    paper: {
        height: 200,
        margin: '30px'
    },
 }));