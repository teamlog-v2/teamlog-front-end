import React from 'react';
import { TextField, Grid, Typography, Tooltip } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import Close from '@material-ui/icons/Close';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';

class PlaceSearchApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.address };
    this.inputRef = React.createRef();
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    // this.props.onClose();
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng); // 위도 및 경도
        console.log(address);
        const addressInfo = address.split(',');
        this.props.updateAddress(addressInfo[addressInfo.length - 1]);
        this.props.updateLocation({
          latitude: latLng.lat,
          longitude: latLng.lng,
        });
        this.props.updateIsSearching(false);
      })
      .catch((error) => console.error('Error', error));
  };

  componentDidMount = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <Grid style={{ position: 'relative' }} xs={12}>
              <Grid container xs={12} direction="row">
                <Grid xs={4}>
                  <TextField
                    size="small"
                    fullWidth
                    inputRef={this.inputRef}
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <LocationOn style={{ color: 'gray', paddingBottom: '2px' }} />
                        </InputAdornment>
                      )
                    }}
                    {...getInputProps({
                      placeholder: '어디를 방문하셨나요?',
                      className: 'location-search-input',
                    })}
                  />
                </Grid>
                <Tooltip title="닫기">
                  <Close
                    onClick={() => { this.props.updateIsSearching(false); }}
                    style={{ margin: '5px 0', color: '#DBDBDB', cursor: 'pointer' }}
                  />
                </Tooltip>
              </Grid>
              <Grid
                container
                style={{ width: '300px', position: 'absolute', zIndex: 999 }}
                direction="column"
              >
                {loading && <Typography style={{ color: 'gray' }}>장소를 찾는 중입니다 -</Typography>}
                {
                  suggestions.length >= 1 ?
                  (
                    <Card md={5} xs={12}>
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { cursor: 'pointer', color: '#C16AF5' }
                        : { cursor: 'pointer' };
                      return (
                        <Grid
                          item
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <Grid container direction="row">
                            <LocationOn />
                          <div style={{  }}>
                            <Typography gutterBottom style={{ fontSize: 15 }}>{suggestion.description}</Typography>
                          </div>
                          </Grid>
                        </Grid>
                      );
                    })}
                    </Card>
                  )
                  :
                  (
                    null
                  )
                }
              </Grid>
            </Grid>
          )}
        </PlacesAutocomplete>
      </>
    );
  }
}

export default PlaceSearchApi;
