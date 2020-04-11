/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  /* declare function variables */
  const input = data;
  const impact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0
  };

  const severeImpact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0
  };

  /* function to calculate the possible number of infected cases given reported cases and time */
  const calculateCases = (cases, time, multip) => cases * (2 ** (Math.trunc((time * multip) / 3)));

  /* function to calculate the infections cases given time */
  const calculateInfections = (cases, time, duration) => {
    switch (time) {
      case 'weeks':
        return calculateCases(cases, 7, duration);
      case 'months':
        return calculateCases(cases, 30, duration);
      case 'days':
      default:
        return calculateCases(cases, 1, duration);
    }
  };

  /* function to calculate the infections cases given time */
  const calculatePercent = (percentage, number) => Math.trunc((percentage / 100) * number);

  /* function to calculate the remaining hospital beds after a given time */
  const remainingBeds = (beds, perctAvail, cases) => calculatePercent(perctAvail, beds) - cases;

  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;

  impact.infectionsByRequestedTime = calculateInfections(impact.currentlyInfected, input.periodType, input.timeToElapse);
  severeImpact.infectionsByRequestedTime = calculateInfections(severeImpact.currentlyInfected, input.periodType, input.timeToElapse);

  impact.severeCasesByRequestedTime = calculatePercent(15, impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = calculatePercent(15, severeImpact.infectionsByRequestedTime);

  impact.hospitalBedsByRequestedTime = remainingBeds(input.totalHospitalBeds, 35, impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = remainingBeds(input.totalHospitalBeds, 35, severeImpact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = calculatePercent(5, impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = calculatePercent(5, severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = calculatePercent(2, impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = calculatePercent(2, severeImpact.infectionsByRequestedTime);

  return {
    data: input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
