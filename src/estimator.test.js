import covid19ImpactEstimator from './estimator';
import data from '../models/mocks/data';

const Expecteddata = covid19ImpactEstimator(data);

test('Estimator function returns input data when called', () => {
  expect(Expecteddata.data).toBe(data);
});

test('function returns number of currently infected(impact) when called', () => {
  expect(Expecteddata.impact.currentlyInfected).toBe(6740);
});

test('function returns number of currently infected(severe impact) when called', () => {
  expect(Expecteddata.severeImpact.currentlyInfected).toBe(33700);
});

test('function returns number of infections by requested time(impact) when called', () => {
  expect(Expecteddata.impact.infectionsByRequestedTime).toBe(3533701120);
});

test('function returns number of infections by requested time(severe impact) when called', () => {
  expect(Expecteddata.severeImpact.infectionsByRequestedTime).toBe(17668505600);
});

test('function returns number of severe infections by requested time(impact) when called', () => {
  expect(Expecteddata.impact.severeCasesByRequestedTime).toBe(530055168);
});

test('function returns number of severe infections by requested time(severe impact) when called', () => {
  expect(Expecteddata.severeImpact.severeCasesByRequestedTime).toBe(2650275840);
});

test('function calculates and returns the number of avalible hospital beds(impact) when called', () => {
  expect(Expecteddata.impact.hospitalBedsByRequestedTime).toBe(-529571953);
});

test('function calculates and returns the number of avalible hospital beds(severe impact) when called', () => {
  expect(Expecteddata.severeImpact.hospitalBedsByRequestedTime).toBe(-2649792625);
});
