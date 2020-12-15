import React from 'react';

import { Box, Grid, Paper } from '@material-ui/core/';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import Header from './Header/Header';
import ReactCam from './Webcam/ReactCam';

const useStyles = makeStyles((theme) =>
  createStyles({
    mainArea: {
      flexGrow: 1,
      padding: theme.spacing(2),
      height: '80vh',
    },
    container: {
      height: '100%',
    },
    gridContainer: { height: '100%' },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%',
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Header />
      <Box className={classes.mainArea}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={3} className={classes.gridContainer}>
            <Paper className={classes.paper}></Paper>
          </Grid>

          <Grid item xs={9} className={classes.gridContainer}>
            <Paper className={classes.paper}>
              <ReactCam />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
