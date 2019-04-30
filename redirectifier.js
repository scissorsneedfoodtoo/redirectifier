const productionChallenges = require('./production-challenges.json');
const fs = require('fs');

function learnDasherize(name) {
  return ('' + name)
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-z0-9\-\.]/gi, '')
    .replace(/\./g, '-')
    .replace(/\:/g, '');
};

function masterDasherize(name) {
  return ('' + name)
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-z0-9\-.]/gi, '')
    .replace(/:/g, '');
};

const problemChallenges = productionChallenges.reduce((acc, curr, i) => {
  // learnDasherize and masterDasherize treat the certificate and section strings the same way, so dash them when possible
  const dashedCert = masterDasherize(curr.certificate);

  curr.sections.forEach(section => {
    const dashedSection = masterDasherize(section.name);

    section.challenges.forEach(challenge => {
      const learnDashedName = learnDasherize(challenge);
      const masterDashedName = masterDasherize(challenge);

      if (learnDashedName !== masterDashedName) {

        const output = {
          challengeName: challenge,
          productionPath: `/${dashedCert}/${dashedSection}/${learnDashedName}`,
          masterPath: `/learn/${dashedCert}/${dashedSection}/${masterDashedName}`
        };

        acc.push(output);
      }
    });
  });

  return acc;
}, []);

fs.writeFile('problem-challenges.json', JSON.stringify(problemChallenges), (err) => {
  if (err) console.log(err);

  console.log("File saved");
});
