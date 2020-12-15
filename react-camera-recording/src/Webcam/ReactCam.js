import React, { useState, useCallback, useRef } from 'react';

import { Box, Grid, Paper, Button } from '@material-ui/core/';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Webcam from 'react-webcam';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(1),
    },
  })
);

const ReactCam = (props) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const classes = useStyles();

  const startCapturingHandler = useCallback(() => {
    console.log('startCapturingHandler');
    setIsCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setIsCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      console.log(blob);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'react-webcam-stream-capture.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const stopCapturingHandler = useCallback(() => {
    console.log('stopCapturingHandler');
    setIsCapturing(false);
    mediaRecorderRef.current.stop();
  }, [mediaRecorderRef, webcamRef, setIsCapturing]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          {isCapturing ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={stopCapturingHandler}
            >
              Stop Capturing
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={startCapturingHandler}
            >
              Start Capturing
            </Button>
          )}
          {recordedChunks.length > 0 && (
            <Button variant="outlined" color="default" onClick={handleDownload}>
              Download
            </Button>
          )}
        </Grid>
        {/* {isCapturing && ( */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Box>
              <Webcam ref={webcamRef} />
            </Box>
          </Paper>
        </Grid>
        {/* )} */}
      </Grid>
    </Box>
  );
};

export default ReactCam;
