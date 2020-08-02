import React, {useState} from "react";
import ReactDOM from "react-dom";
import {
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import axios from "axios";
import {Autocomplete} from '@material-ui/lab'
import LocationOnIcon from "@material-ui/icons/LocationOn";
import  { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

//Questions
// + why need locationID?

const theme = createMuiTheme({
    overrides: {
        MuiAutoComplete: {
          padding: "1.3rem 0",
        }
    }
});

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "50rem",
    paddingBottom: "1.3rem",
    border: "none",
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const AutoOrigin = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    suggestions: [],
    text: "",
    locationId: "",
  });
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [locationId, setLocationId] = useState('')

  const onTextChanged = (e) => {
      console.log(e.target.value);
    const value = e.target.value;
    setText(value);
    setLocationId("");
    /* setState({ ...state, locationId: "", text: value }); */
   
    if (value.length > 4) {
      /* setState({ ...state, text: value }); */
      setText(value)
      console.log(value);// print my input value
      axios
        .get(
          `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${value}&at=40.2029,-77.1972&apiKey=6c42FMDtfvBHA3VuII3Ww4jsoPJXmugJBChRt_qDGrE`
        )
        .then((response) => response.data)
        .then((data) => {/* 
            console.log(data) */
          let op = data.items.map((o) => ({
            label: o.address.label,
              lat: o.position.lat,
              lng: o.position.lng,
            //label: o.address.label.split(",", 1),
            //index: o.address.label.indexOf(",") + 1,
            //subAddress: o.address.label.slice(index),
            locationId: o.id,
          }));
          /* setState({ ...state, suggestions: op }); */
          setSuggestions(op);
          console.log(suggestions);
        })
        .catch((err) => {
          console.log(err);
          /* setState({ ...state, suggestions: [] }); */
          setSuggestions([]);
        });
    } else {
        
      /* setState({ ...state,text: value, suggestions: [] }); */
      setText(value);
      setSuggestions([]);
    }
  };

  const renderSuggestions = () => {
      //const {suggestions} = state;
        
      if(suggestions.length === 0){
          return null
      } else {
          console.log(state)
          return (
              <ul>
                  {suggestions.map(item => {
                      return (
                          <li key={item.locationId}
                              locationid={item.locationId}
                              onClick={() => suggestionSelected(item)}
                        >
                            {item.label}
                          </li>
                      )
                  })}
              </ul>
          )
      }
  }

  const suggestionSelected = item => {
    if(item){
      /* setState({
          ...state,
          text: item.label,
          locationId: item.locationId,
          suggestions: []
      }) */
      props.onSuggestionSelect(item, "origin");
      setText(item.label);
      setLocationId(item.locationId);
      // console.log("Location ID: ", locationId);  --> locationId cannot be seen?
      // console.log("Text: ", text);  --> text can be seen
      setSuggestions([]);
    }
  }
  return (<>{/* <div><TextField type="text" value={text} onChange={onTextChanged} variant={props.variant}/></div> <div>{renderSuggestions()}</div> */}
  {/* <ThemeProvider theme={theme}> */}
    <Autocomplete
      options={suggestions}
      onChange={(event,value) => suggestionSelected(value)}
      //groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.label}
      style={{ width: 300 }}
      renderInput={(params) =>
      
          <TextField {...params}
              value={text}
              onChange={onTextChanged}
              className={classes.textField}
              name="originTitle"
              required
              placeholder="From"   
          />
        // <input {...params} 
        //       type="text" 
        //       value={text} 
        //       //id="origin-field" 
        //       onChange={onTextChanged} 
        //       required 
        //       placeholder="From"
        //       name="originTitle"
        //       //ref={textInput}
        // />
      }
    renderOption={(option) => {
        return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon}/>
              </Grid>
              <Grid item xs>
                {/*{parts.map((part, index) => (*/}
                {/*    <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>*/}
                {/*          {part.text}*/}
                {/*        </span>*/}
                {/*))}*/}
                <Typography variant="h5" color="textSecondary">
                  {option.label}
                </Typography>
              </Grid>
            </Grid>
        );
    }}
    />
  {/* </ThemeProvider> */}
  </>);
};

ReactDOM.render(<AutoOrigin />, document.getElementById("root"));
// export default withStyles(styles)(NavigationBar);
export default AutoOrigin;
