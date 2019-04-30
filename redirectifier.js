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

const problemURLs = productionChallenges.reduce((acc, curr, i) => {
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
          productionURL: `/${dashedCert}/${dashedSection}/${learnDashedName}`,
          masterURL: `/learn/${dashedCert}/${dashedSection}/${masterDashedName}`
        };

        acc.push(output);
      }
    });
  });

  return acc;
}, []);

fs.writeFile('problem-urls.json', JSON.stringify(problemURLs), (err) => {
  if (err) console.log(err);

  console.log("File saved");
});
