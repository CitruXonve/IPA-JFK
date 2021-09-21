import React from "react";
import { Container } from "@material-ui/core";
import { AppBar, Card, CardContent, CardHeader, CssBaseline, Link, Toolbar, Typography, Grid, Box, makeStyles } from "@material-ui/core";
// import { Copyright } from '@mui/icons-material';
import IPAForm from "./IPA-Form";

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © 2020-'}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit">
        b1f6c1c4
      </Link>
      {'.'}
    </Typography>
  );
}

const Main = () => {
  const classes = useStyles.apply(this);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            IPA-JFK
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="https://github.com/b1f6c1c4/IPA-JFK" className={classes.link}>
              Github Repo
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          b1f6c1c4/IPA-JFK
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
          IPA narrow transcription of English words in New York City accent
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Card>
            <CardHeader title="Give me IPA NOW!" className={classes.cardHeader}/>
            <CardContent>
              <div className={classes.cardPricing}>
                <IPAForm format="unicode" outputPhonetic={true}/>
                
                {/* <form action="#" style="display: none" id="frm">
                  <input type="text" id="word" name="word" autofocus />
                  <input type="radio" id="unicode" name="format" value="unicode" checked /><label for="unicode">Unicode</label>
                  <input type="radio" id="latex" name="format" value="latex" /><label for="latex">LaTeX/tipa</label>
                  <input type="radio" id="raw" name="format" value="raw" /><label for="raw">JSON/Raw</label>
                  <div>
                    <summary>Advanced settings</summary>
                    <label for="ph">Reference Phonemes</label>
                    <input type="text" id="ph" name="ph" />
                    <label for="ae">/&aelig;/-raising Hints</label>
                    <input type="text" id="ae" name="ae" />
                    <label for="ae">Syllabification Hints</label>
                    <input type="text" id="syllable" name="syllable" />
                    <input type="checkbox" id="phonetic" name="phonetic" checked /><label for="phonetic">Phonetic (narrow) transcription</label>
                  </div>
                </form> */}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Container maxWidth="sm" component="footer" className={classes.footer}>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item key="footer.title">
            <Typography variant="title" color="textPrimary" gutterBottom>
              IPA-JFK
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
              This is free software, licensed under AGPL-v3.0-only.
              See the source code for copying conditions.
              You can obtain the source code from GitHub:
              https://github.com/b1f6c1c4/IPA-JFK
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Main;