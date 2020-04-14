import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Select, MenuItem } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Covid-19 Estimator '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Covid-19 Estimator
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="Africa"
                name="region"
                variant="outlined"
                required
                fullWidth
                inputProps={{
                  'data-region': ' '
                }}
                id="region"
                label="Region"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avgAge"
                inputProps={{
                    'data-time-to-elapse': ' '
                  }}
                label="Average Age"
                name="avgAge"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="5"
                name="avgDailyIncomeInUSD"
                variant="outlined"
                required
                fullWidth
                inputProps={{
                  'data-avg-daily-income-USD': ' '
                }}
                id="avgDailyIncomeInUSD"
                label="Avg Daily Income USD"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avgDailyIncomePopulation:"
                inputProps={{
                    'data-avg-daily-income-population:': ' '
                  }}
                label="Avg Daily Income Population:"
                name="avgDailyIncomePopulation:"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="population"
                name="population"
                variant="outlined"
                required
                fullWidth
                inputProps={{
                  'data-population': ' '
                }}
                id="population"
                label="Population"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reportedCases"
                inputProps={{
                  'data-reported-cases': ' '
                }}
                label="Reported Cases"
                name="reportedCases"
                autoComplete="reportedCases"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="timeToElapse"
                inputProps={{
                  'data-time-to-elapse': ' '
                }}
                label="Time To Elapse"
                name="timeToElapse"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                variant="outlined"
                required
                fullWidth
                id="periodType"
                inputProps={{
                  'data-period-type': ' '
                }}
                label="Period Type"
                defaultValue="days"
                name="periodType"
                >
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="weeks">Weeks</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="totalHospitalBeds"
                label="Total Hospital Beds"
                inputProps={{
                  'data-total-hospital-beds': ' '
                }}
                id="totalHospitalBeds"
                autoComplete="100"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Calculate
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}