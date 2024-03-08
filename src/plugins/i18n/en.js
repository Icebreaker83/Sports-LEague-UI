export default {
  appTitle: 'Sports League Web UI',
  footer: {
    version: 'API Version',
  },
  league: {
    self: 'League',
    schedule: {
      self: 'Schedule',
      heading: 'League Schedule',
      fields: {
        matchDate: 'Date/Time',
        stadium: 'Stadium',
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
      },
    },
    leaderboard: {
      self: 'Leaderboard',
      heading: 'League Standings',
      fields: {
        teamName: 'Team Name',
        matchesPlayed: {
          self: 'MP',
          title: 'Matches Played',
        },
        goalsFor: {
          self: 'GF',
          title: 'Goals For',
        },
        goalsAgainst: {
          self: 'GA',
          title: 'Goals Against',
        },
        goalsDifference: {
          self: 'GD',
          title: 'Goals Difference',
        },
        points: 'Points',
      },
    },
  },
};
