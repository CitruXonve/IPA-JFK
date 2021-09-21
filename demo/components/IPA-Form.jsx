import React from "react";
import { TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, Checkbox } from "@material-ui/core";
import { Grid, Typography, makeStyles } from "@material-ui/core";

class IPAForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      format: props.format,
      isPhonetic: props.outputPhonetic
    };
    this.updateFunc = require("../func");
    this.generateResult = (format) => {
      console.log(this.state);
      this.updateFunc.default(format && typeof(format) === 'string' ? format : this.state.format
      );
    };
  }

  handleWordChange = (event) => {
    const word = event.target.value;
    this.generateResult();
  }

  handleFormatChange = (event) => {
    const formatType = event.target.value;

    if (formatType && typeof(formatType) === 'string') {
      this.setState({
        format: formatType,
        isPhonetic: this.state.isPhonetic
      });
      // this.state.format = formatType;
      // this.forceUpdate();
      this.generateResult(formatType);
    }
    else {
      this.generateResult();
    }
  }

  handlePhoneticChange = (event) => {
    const checked = event.target.checked;
    console.log(checked);
    this.setState({
      format: this.state.format,
      isPhonetic: checked
    })
    // this.state.isPhonetic = checked;
    // this.forceUpdate();
    this.generateResult(undefined, checked);
  }

// const IPAForm = () => {
  render = () => {
    const useStyles = makeStyles((theme) => ({
      '@global': {
        ul: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      results: {
          'font-size': '12px',
          height: '4rem'
      }
    }));

    const classes = useStyles.apply;

    return (
      <React.Fragment>
        <form id="_frm" className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <TextField
                name="word"
                id="_word"
                label="Enter any word"
                variant="outlined"
                required
                fullWidth
                autoFocus
                onChange={this.handleWordChange}
              />
              <FormControl component="fieldset">
                <RadioGroup row aria-label="Format" name="format" value={this.state.format} onChange={this.handleFormatChange}>
                  <FormControlLabel id="_unicode" value="unicode" control={<Radio />} label="Unicode" />
                  <FormControlLabel id="_latex" value="latex" control={<Radio />} label="LaTeX/tipa" />
                  <FormControlLabel id="_raw" value="raw" control={<Radio />} label="JSON/Raw" />
                </RadioGroup>
              </FormControl>
              
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormLabel component="legend">Result(s)</FormLabel>
              <Typography variant="h6" color="textPrimary" component="div">
                <ul id="_results" className={classes.results}></ul>
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h5" color="textPrimary" component="p">
                Advanced
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <FormControlLabel 
                control={
                  <Checkbox name="phonetic" id="_phonetic" checked={this.state.isPhonetic} onChange={this.handlePhoneticChange} />
                }
                label="Phonetic (narrow) transcription" 
              />
            </Grid>
            <Grid item sm={12} sm={4}>
              <TextField name="ph" id="_ph" label="Reference Phonemes" variant="outlined" fullWidth/>
            </Grid>
            <Grid item sm={12} sm={4}>
              <TextField name="ae" id="_ae" label="/&aelig;/-raising Hints" variant="outlined" fullWidth/>
            </Grid>
            <Grid item sm={12} sm={4}>
              <TextField name="syllable" id="_syllable" label="Phonetic (narrow) transcription" variant="outlined" fullWidth/>
            </Grid>
          </Grid>
          
        </form>
      </React.Fragment>
    );
  }
}

export default IPAForm;