/* eslint-disable max-len */
import { PERIOD, whatIs, chain } from 'on-covid-19';

const covid19ImpactEstimator = (data) => {
  /* function to calculate the possible number of infected cases given reported cases and time */
  const calculateCases = (cases, time, multip) => cases * (2 ** (Math.trunc((time * multip) / 3)));

  /* function to calculate the infections cases given time */
  const calculateInfections = (cases, time, duration) => {
    switch (time) {
      case PERIOD.WEEKS:
        return calculateCases(cases, 7, duration);
      case PERIOD.MONTHS:
        return calculateCases(cases, 30, duration);
      case PERIOD.DAYS:
      default:
        return calculateCases(cases, 1, duration);
    }
  };
  /* Step One: Calculate the number of currently infected */
  const stepOne = (param) => {
    const currentlyInfected = param.reportedCases * 10;
    const severeCurrentlyInfected = param.reportedCases * 50;
    return {
      data: param,
      impact: {
        currentlyInfected
      },
      severeImpact: {
        currentlyInfected: severeCurrentlyInfected
      }
    };
  };
  /* Step Two: Calculate number of infections By Requested Time */
  const stepTwo = (param) => {
    const infectionsByRequestedTime = calculateInfections(param.impact.currentlyInfected, param.data.periodType, param.data.timeToElapse);
    const sInfectionsByRequestedTime = calculateInfections(param.severeImpact.currentlyInfected, param.data.periodType, param.data.timeToElapse);
    return {
      data: param.data,
      impact: {
        ...param.impact,
        infectionsByRequestedTime
      },
      severeImpact: {
        ...param.severeImpact,
        infectionsByRequestedTime: sInfectionsByRequestedTime
      }
    };
  };
  /* Step Three: Calculate number of severe cases By Requested Time */
  const stepThree = (param) => {
    const severeCasesByRequestedTime = whatIs('15%').of(param.impact.infectionsByRequestedTime);
    const sSevereCasesByRequestedTime = whatIs('15%').of(param.severeImpact.infectionsByRequestedTime);
    return {
      data: param.data,
      impact: {
        ...param.impact,
        severeCasesByRequestedTime
      },
      severeImpact: {
        ...param.severeImpact,
        severeCasesByRequestedTime: sSevereCasesByRequestedTime
      }
    };
  };
  /* Step Four: Calculate number of hospital beds By Requested Time */
  const stepFour = (param) => {
    const hospitalBedsByRequestedTime = Math.trunc(whatIs('35%').of(param.data.totalHospitalBeds) - param.impact.severeCasesByRequestedTime);
    const sHospitalBedsByRequestedTime = Math.trunc(whatIs('35%').of(param.data.totalHospitalBeds) - param.severeImpact.severeCasesByRequestedTime);
    return {
      data: param.data,
      impact: {
        ...param.impact,
        hospitalBedsByRequestedTime
      },
      severeImpact: {
        ...param.severeImpact,
        hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime
      }
    };
  };
  /* Step Five: Calculate number of cases for ICU By Requested Time */
  const stepFive = (param) => {
    const casesForICUByRequestedTime = whatIs('5%').of(param.impact.infectionsByRequestedTime);
    const sCasesForICUByRequestedTime = whatIs('5%').of(param.severeImpact.infectionsByRequestedTime);
    return {
      data: param.data,
      impact: {
        ...param.impact,
        casesForICUByRequestedTime
      },
      severeImpact: {
        ...param.severeImpact,
        casesForICUByRequestedTime: sCasesForICUByRequestedTime
      }
    };
  };
  /* Step Six: Calculate number of cases for ventilators By Requested Time */
  const stepSix = (param) => {
    const casesForVentilatorsByRequestedTime = Math.trunc(whatIs('2%').of(param.impact.infectionsByRequestedTime));
    const sCasesForVentilatorsByRequestedTime = Math.trunc(whatIs('2%').of(param.severeImpact.infectionsByRequestedTime));
    return {
      data: param.data,
      impact: {
        ...param.impact,
        casesForVentilatorsByRequestedTime
      },
      severeImpact: {
        ...param.severeImpact,
        casesForVentilatorsByRequestedTime: sCasesForVentilatorsByRequestedTime
      }
    };
  };
  /* Step Seven: Calculate amount of dollars in flight By Requested Time */
  const stepSeven = (param) => {
    const dollarsInFlight = Math.trunc((param.impact.infectionsByRequestedTime * param.data.region.avgDailyIncomePopulation * param.data.region.avgDailyIncomeInUSD) / param.data.timeToElapse);
    const sDollarsInFlight = Math.trunc((param.severeImpact.infectionsByRequestedTime * param.data.region.avgDailyIncomePopulation * param.data.region.avgDailyIncomeInUSD) / param.data.timeToElapse);
    return {
      data: param.data,
      impact: {
        ...param.impact,
        dollarsInFlight
      },
      severeImpact: {
        ...param.severeImpact,
        dollarsInFlight: sDollarsInFlight
      }
    };
  };

  const estimatorFactory = chain(stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix, stepSeven);

  return Object.freeze(estimatorFactory(data));
};

export default covid19ImpactEstimator;
