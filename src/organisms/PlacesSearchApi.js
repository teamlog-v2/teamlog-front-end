import Close from '@mui/icons-material/Close';
import LocationOn from '@mui/icons-material/LocationOn';
import { Grid, TextField, Tooltip, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class PlaceSearchApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.postData.address ? this.props.postData.address.split('#')[0] : '' };
    this.inputRef = React.createRef();
  }

  handleChange = (address) => {
    this.setState({ address });
  }

  handleSelect = (address, t, detail) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng); // 위도 및 경도
        this.props.updatePostData({
          ...this.props.postData,
          latitude: latLng.lat,
          longitude: latLng.lng,
          address: `${detail.formattedSuggestion.mainText}#${address}`,
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
                <Grid xs={8}>
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
                style={{ width: '400px', position: 'absolute', zIndex: 999, opacity: 0.9 }}
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
                            ? { cursor: 'pointer', color: '#593875' }
                            : { cursor: 'pointer' };
                          return (
                            <Grid
                              container
                              direction="row"
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <LocationOn />
                              <Grid item xs={11}>
                                <Typography gutterBottom style={{ fontSize: 15 }}>
                                  {suggestion.description}</Typography>
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
