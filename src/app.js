import { onCovid19 } from 'on-covid-19';
import estimator from './estimator';

const lagosNG = {
  reportedCases: 50,
  population: 22000000
};

const result = onCovid19(lagosNG, estimator)
  .estimateImpactAfter(30)
  .days();

// eslint-disable-next-line no-console
console.dir(result);
