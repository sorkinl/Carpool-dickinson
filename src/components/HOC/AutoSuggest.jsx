import React, {useState} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios'
import './AutoSuggest.scss'
const AutoInput = (props) => {
    const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [locationId, setLocationId] = useState("")

      const getSuggestions = value => {
          
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        axios
        .get(
          `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${value}&at=40.2029,-77.1972&apiKey=6c42FMDtfvBHA3VuII3Ww4jsoPJXmugJBChRt_qDGrE`
        )
        .then((response) => response.data)
        .then((data) => {/* 
            console.log(data) */
            console.log(data.items)
          var op = data.items.map((o) => ({
            label: o.address.label,
            locationId: o.id,
            position: o.position
          }));
          
          setSuggestions(op);
          
        })
        .catch((err) => {
          console.log(err);
          /* setState({ ...state, suggestions: [] }); */
          setSuggestions([])
        });
        return suggestions;
      };

      // When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
  props.onSuggestionSelected(suggestion);
  return suggestion.label;
}

const renderSuggestion = suggestion => (
    <div>
      {suggestion.label}
    </div>
  );

 const onChange = (event, { newValue }) => {
    setText(newValue);
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const shouldRenderSuggestions = (value) => {
      return value.length < 5? false: true;
  }



  const inputProps = {
    placeholder: props.placeholder,
    value: text,
    onChange: onChange
  };
    return (<>
    <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        shouldRenderSuggestions={shouldRenderSuggestions}
        
      /></>)
}

export default AutoInput; 