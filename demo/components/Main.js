import React, { Container, Fragment } from "react";
import { AppBar, Card, CardContent, CardHeader, Link, Toolbar, Typography } from "@mui/material";

function Main() {
  return (
    <Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
      // sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            IPA-JFK
          </Typography>
          <nav>
            <Link
              variant="button"
              color="GrayText.primary"
              href="https://github.com/b1f6c1c4/IPA-JFK"
              sx={{ my: 1, mx: 1.5 }}
            >
              Github Repo
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography component="h1" variant="h2" aligh="center" color="text.primary" gutterBottom>
          b1f6c1c4/IPA-JFK
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          IPA narrow transcription of English words in New York City accent
        </Typography>
        <Grid container spacing={5} alignItems="flex-end">
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'baseline',
                  mb: 2,
                }}
              >
                <form action="#" style="display: none" id="frm">
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
                </form>
                <ul id="results"></ul>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          IPA-JFK
          Copyright (C) 2020 b1f6c1c4
          This is free software, licensed under AGPL-v3.0-only.
          See the source code for copying conditions.
        </Typography>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Fragment>
  );
}

export default Main;