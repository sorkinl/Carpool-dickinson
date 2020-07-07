import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";

const AutocompleteHERE = (props) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationId, setLocationId] = useState("");

  const onTextChanged = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    setText(value);
    setLocationId("");
    if (value.length > 4) {
      setText(value);
      axios
        .get(
          `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${value}&at=40.2029,-77.1972&apiKey=6c42FMDtfvBHA3VuII3Ww4jsoPJXmugJBChRt_qDGrE`
        )
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          var op = data.items.map((o) => ({
            label: o.address.label,
            locationId: o.id,
            position: o.position,
          }));
          setSuggestions(op);
        })
        .catch((err) => {
          console.log(err);
          setSuggestions([]);
        });
    } else {
      setText(value);
      setSuggestions([]);
    }
  };

  const suggestionSelected = (item) => {
    console.log(item.label);
    console.log("Hi");
    props.onSuggestionSelect(item);
    setText(item.label);
    setLocationId(item.locationId);
    setSuggestions([]);
  };
  return (
    <>
      {/* <div><TextField type="text" value={text} onChange={onTextChanged} variant={props.variant}/></div> <div>{renderSuggestions()}</div> */}
      <Autocomplete
        options={suggestions}
        onChange={(event, value) => suggestionSelected(value)}
        //groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.label}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={text}
            onChange={onTextChanged}
            label="With categories"
            variant="outlined"
          />
        )}
      />
    </>
  );
};

export default AutocompleteHERE;
