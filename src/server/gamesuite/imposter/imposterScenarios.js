export const rollScenario = () => {
  const scenarios = [
    {
      title: 'Animal Hospital',
      roles: [
        'Veterinarian',
        'Anesthesiologist',
        'Janitor',
        'Surgeon',
        'Front Desk Secretary',
        'Biologist',
        'Medical Intern',
        'Medical Engineer',
        'Pharmacologist',
        'Nurse'
      ]
    },
    {
      title: 'Bank Robbery',
      roles: [
        'The mastermind',
        'The demolitionist',
        'The getaway driver',
        'The weapon specialist',
        'The technology specialist',
        'The vault-driller',
        'The distraction',
        'The recon specialist',
        'The hostage-taker',
        'Money Bagger'
      ]
    },
    {
      title: 'CIA Headquarters',
      roles: [
        'The director',
        'War-planner',
        'Loan maker',
        'Tech support agent',
        'Intelligence gatherer',
        'Undercover agent',
        'Internal affairs officer',
        'H/R agent',
        'Analyst',
        'Mole'
      ]
    },
    {
      title: 'Diamond Mine',
      roles: [
        'The mine Administrator',
        'Geologist',
        'Elevator Engineer',
        'Surveyor',
        'Miner',
        'Miner',
        'Documentary filmer',
        'Geologist',
        'Geologist',
        'Researcher'
      ]
    },
    {
      title: 'Jungle Safari',
      roles: [
        'Expeditionist',
        'Biologist',
        'Survivalist',
        'Botanist',
        'Hunter',
        'Journalist',
        'Explorer',
        'Translator',
        'Biologist',
        'Photographer'
      ]
    },
    {
      title: 'Polar Expedition',
      roles: [
        'The head Researcher',
        'Assistant Researcher',
        'Meteorologist',
        'Surveyor',
        'Biologist',
        'Journalist',
        'Explorer',
        'Researcher',
        'Survivalist',
        'Photographer'
      ]
    },
    {
      title: 'Rich House Party',
      roles: [
        'Governor',
        'Aristocrat',
        'Snob',
        'Entrepreneur',
        'Duke',
        'Duchess',
        'The Monopoly Guy',
        'Overseer',
        'Senator',
        'Baron'
      ]
    },
    {
      title: 'Forest Hobo Camp',
      roles: [
        'Hobo King',
        'Drifter',
        'Beggar',
        'Hippie',
        'Hobo',
        'Drifter',
        'Beggar',
        'Hobo',
        'Hobo',
        'Hobo'
      ]
    },
    {
      title: 'Bandit Camp',
      roles: [
        'Interrogator',
        'Executioner',
        'Captain',
        'Demolitionist',
        'Mercenary',
        'Thief',
        'Bruiser',
        'Prisoner of War',
        'Captured Journalist',
        'Deserter'
      ]
    },
    {
      title: 'Art Museum',
      roles: [
        'Art Snob',
        'Artist',
        'Art Admirer',
        'Security Guard',
        'Curator',
        'Art Critic',
        'Art Collector',
        'Tourist',
        'Art Enthusiast',
        'Artist'
      ]
    },
    {
      title: 'Movie Set',
      roles: [
        'Director',
        'Actor',
        'Producer',
        'Makeup Artist',
        'Costume Designer',
        'Camera operator',
        'The Celebrity Cameo',
        'Boom Operator',
        'Intern',
        'Stunt Double'
      ]
    },
    {
      title: 'Psychiatric Hospital',
      roles: [
        'Doctor',
        'Nurse',
        'Nurse',
        'Schizophrenic',
        'Patient',
        'Criminal',
        'Psychiatrist',
        'Guard',
        'Guard',
        'Patient'
      ]
    },
    {
      title: 'Construction Site',
      roles: [
        'Foreman',
        'Laborer',
        'Operator',
        'Inspector',
        'Superintendent',
        'Laborer',
        'Operator',
        'Laborer',
        'Lost kid',
        'Laborer'
      ]
    },
    {
      title: 'High Security Prison',
      roles: [
        'Serial killer',
        'Guard',
        'Guard',
        'Robber',
        'Jewel thief',
        'Laborer',
        'Overseer',
        'Cook',
        'Contraband trader',
        'Hustler'
      ]
    },
    {
      title: 'College Lecture Hall',
      roles: [
        'Professor',
        'Student',
        'Student',
        'Student',
        'Delinquent',
        'Sleepy student',
        'Slacker',
        'Gamer',
        'Weeb',
        `Teacher's pet`
      ]
    },
    {
      title: 'Public Hanging',
      roles: [
        'Executioner',
        'Accused',
        'Accuser',
        'Jeering peasant',
        'Town crier',
        'Priest',
        'King',
        'Queen',
        'Jester',
        'Knight'
      ]
    },
    {
      title: 'Cannabis Dispensary',
      roles: [
        'Bud tender',
        'Old person',
        'Stoner',
        'Stoner',
        'Employee',
        'Patient',
        'ATM mechanic',
        'Marijuana enthusiast',
        'Patient',
        'Cashier'
      ]
    },
    {
      title: 'Open Heart Surgery',
      roles: [
        'Surgeon',
        'Nurse',
        'Surgeon',
        'Anesthesiologist',
        'Medical student',
        'Medical student',
        'Nurse',
        'Surgical tech',
        'Medical aid',
        'Physician assistant'
      ]
    },
    {
      title: 'Fight Club',
      roles: [
        'The boss',
        'Brawler',
        'Kickboxer',
        'Worker',
        'Bouncer',
        'Boxer',
        'Martial artist',
        'Veteran',
        'Fighter',
        'Fighter'
      ]
    },
    {
      title: 'Rock Concert',
      roles: [
        'Guitarist',
        'Drummer',
        'Bassist',
        'Singer',
        'Lighting tech',
        'Audio tech',
        'The band manager',
        'Fan',
        'Mosher',
        'Raving fan'
      ]
    },
    {
      title: 'Baptist Church',
      roles: [
        'Preacher',
        'Old lady',
        'Old man',
        'Avid Christian',
        'Acolyte',
        'Choir singer',
        'The choir director',
        'The organist',
        'Usher',
        'Bored kid'
      ]
    },
  ];
  const conditions = [
    `everyone's injured`,
    `everyone's old`,
    `everyone has an indiscernable accent`,
    `everyone's sick`,
    `it's way too hot`,
    `it's way too cold`,
    `you forgot to do something important`,
    `it smells like shit`,
    `you're nearly deaf`,
    `everyone's tripping balls`,
    `there's a persistent, annoying humming sound`,
    `there's a roach infestation`
  ];
  const scenarioRes = scenarios[Math.floor(Math.random() * scenarios.length)];
  const conditionRes = conditions[Math.floor(Math.random() * conditions.length)];
  const scenarioList = scenarios.map(s => s.title);
  return {
    scenario: scenarioRes.title,
    scenarioList,
    condition: conditionRes,
    roles: scenarioRes.roles
  };
};