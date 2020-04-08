const covid19ImpactEstimator = (data) => {
  const input = data;
  let impact = {}, severeImpact = {};

  const calculatePossibleInfections = (cases, time, duration) => {
    switch(time) {
      case 'days':
        cases * ( 2 ** Math.round(duration / 3) );
        break;
      case 'weeks':
        cases * ( 2 ** Math.round((duration * 7) / 3) );
        break;
      case 'months':
        cases * (2 ** Math.round((duration * 30) / 3))
    }
  }

  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;

  impact.infectionsByRequestedTime = calculatePossibleInfections(impact.currentlyInfected, input.periodType, input.timeToElapse);
  severeImpact.infectionsByRequestedTime = calculatePossibleInfections(severeImpact.currentlyInfected, input.periodType, input.timeToElapse);



  return {
    data: input,
    impact: {},
    severeImpact: {}
  }
};

export default covid19ImpactEstimator;
