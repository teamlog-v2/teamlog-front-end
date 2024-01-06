import { Close } from '@mui/icons-material';
import { Avatar, Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { convertResourceUrl } from '../utils';


const LikerList = ({ likerList, updateOpen }) => (
  <Box padding={1}>
    <Close onClick={() => { updateOpen(false); }} style={{ cursor: 'pointer' }} />
    <Container>
      <Grid container xs={12} style={{ minWidth: '20em', height: '30em' }}>
        <Grid container direction="column">
          <Grid item margin={1}>
            <Typography variant="h6" align='center'>좋아요
            </Typography>
          </Grid>
          <Divider />

          {likerList.length > 0 ? (
            <div>
              {likerList ? likerList.map((liker) => (
                <Grid item xs={12} marginY={1}>
                  <Link
                    to={`/accounts/${liker.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card elevation={2}>
                      <Box display="flex" flexDirection="row" flexGrow={1}>

                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{ margin: '0.5em' }}
                            src={convertResourceUrl(liker.profileImgPath)}
                          />
                          <Typography variant="body1" color="textPrimary">
                            {liker.name}
                          </Typography>
                        </Box>

                      </Box>
                    </Card>
                  </Link>
                </Grid>
              )) : null}
            </div>
          ) : (
            <Container>
              <Grid item>
                가장 먼저 좋아요를 눌러보세요!
              </Grid>
            </Container>
          )}
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default LikerList;
