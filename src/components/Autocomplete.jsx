import React, {useState} from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";
import {Autocomplete} from '@material-ui/lab'

const AutocompleteHERE = (props) => {
    console.log(props)

  const [state, setState] = useState({
    suggestions: [],
    text: "",
    locationId: "",
  });
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [locationId, setLocationId] = useState("")

  const onTextChanged = (e) => {
      console.log(e.target.value)
    const value = e.target.value;
    setText(value);
    setLocationId("");
    /* setState({ ...state, locationId: "", text: value }); */
   
    if (value.length > 4) {
      /* setState({ ...state, text: value }); */
      setText(value)
      console.log(value)
      axios
        .get(
          `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${value}&at=40.2029,-77.1972&apiKey=6c42FMDtfvBHA3VuII3Ww4jsoPJXmugJBChRt_qDGrE`
        )
        .then((response) => response.data)
        .then((data) => {/* 
            console.log(data) */
          var op = data.items.map((o) => ({
            label: o.address.label,
            locationId: o.id,
          }));
          /* setState({ ...state, suggestions: op }); */
          setSuggestions(op);
        })
        .catch((err) => {
          console.log(err);
          /* setState({ ...state, suggestions: [] }); */
          setSuggestions([])
        });
    } else {
        
      /* setState({ ...state,text: value, suggestions: [] }); */
      setText(value)
      setSuggestions([])
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
    //gets and sets props passed from the parent component
     
      
      setText(item.label);
      setLocationId(item.locationId)
      setSuggestions([])
  }
  return (<>{/* <div><TextField type="text" value={text} onChange={onTextChanged} variant={props.variant}/></div> <div>{renderSuggestions()}</div> */}
  <Autocomplete
  options={suggestions}
  onChange={(event,value) => suggestionSelected(value)}
  //groupBy={(option) => option.firstLetter}
  getOptionLabel={(option) => option.label}
  style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} value={text} onChange={onTextChanged} label="With categories" variant="outlined" />
  }
/></>);
};

export default AutocompleteHERE;
