import React from 'react';
import {
  TextField,
  Grid
} from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.props.onClose();
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => { console.log('Success', latLng); // 위도 및 경도
      this.props.updateLocation(`${address}`);
    }) 
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ overflow: 'hidden' }}>
            <TextField variant='outlined' fullWidth
              {...getInputProps({
                placeholder: '위치를 입력하세요.',
                className: 'location-search-input',
              })}
            />
            <Grid container style={{ width: '500px' }} direction='column' spacing={1}>
              {loading && <Grid item>🧐 장소를 찾는 중입니다...</Grid>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <Grid item
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <LocationOn />
                    <span>{suggestion.description}</span>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;