import { handleRequest } from '../plugins/axios';
/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
  /**
   * @private
   * @type {Array<Object>}
   * @description Contains the list of matches, each represented as an object with properties like `matchDate`,
   * `stadium`, `homeTeam`, `awayTeam`, `matchPlayed`, `homeTeamScore`, and `awayTeamScore`.
   */
  _matches = [];
  /**
   * @private
   * @type {string}
   * @description Stores the access token to be sent in requests to the server.
   */
  _accessToken = '';
  /**
   * @private
   * @type {Object}
   * @description Contains definitions of API endpoints for fetching data.
   */
  _endpoints = {
    getMatches: () => ({
      method: 'get',
      url: 'v1/getAllMatches',
      headers: {
        Authorization: `Bearer ${this._accessToken}`,
      },
    }),
  };

  /**
   * @constructor
   * @param {string} accessToken - The access token to be used for authenticated requests.
   */
  constructor(accessToken) {
    this._accessToken = accessToken;
  }
  /**
   * Returns number of points of match
   * @param {Number} homeTeamScore goals scored by homeTeam
   * @param {Number} awayTeamScore goals scored by awayTeam
   * @returns {Number} number of points of match
   */
  _getPoints(homeTeamScore, awayTeamScore) {
    if (homeTeamScore > awayTeamScore) return 3;
    if (homeTeamScore === awayTeamScore) return 1;
    return 0;
  }

  /**
   * Returns result of match, for home/away team
   * @param {Object} match match results
   * @returns {Object} match result for home/away team
   */
  _getMatchResult(match) {
    return {
      home: {
        teamName: match.homeTeam,
        matchesPlayed: Number(match.matchPlayed),
        goalsFor: match.homeTeamScore || 0,
        goalsAgainst: match.awayTeamScore || 0,
        goalsDifference:
          (match.homeTeamScore || 0) - (match.awayTeamScore || 0),
        points: match.matchPlayed
          ? this._getPoints(match.homeTeamScore, match.awayTeamScore)
          : 0,
      },
      away: {
        teamName: match.awayTeam,
        matchesPlayed: Number(match.matchPlayed),
        goalsFor: match.awayTeamScore || 0,
        goalsAgainst: match.homeTeamScore || 0,
        goalsDifference:
          (match.awayTeamScore || 0) - (match.homeTeamScore || 0),
        points: match.matchPlayed
          ? this._getPoints(match.awayTeamScore, match.homeTeamScore)
          : 0,
      },
    };
  }

  /**
   * Returns unique points for tied teams
   * @param {Array<Object>} leaderboard List of teams with their points
   * @returns {Array<Number>} unique points for tied teams
   */
  _getTiedPoints(leaderboard) {
    const duplicates = [];
    const uniques = [];
    leaderboard.forEach((team) => {
      const arr = uniques.includes(team.points) ? duplicates : uniques;
      arr.push(team.points);
    });

    return [...new Set(duplicates)];
  }

  /**
   * Sorts leaderboard by points and tiebreakers
   * @param {Array<Object>} leaderboard List of teams with their points
   * @param {boolean>} applyTiebreakers determines if tiebreakers should be applied
   * @returns {Array<Object>} sorted leaderboard
   */
  _sortLeaderboard(leaderboard, applyTiebreakers) {
    const sorted = leaderboard.toSorted((a, b) => {
      // Sort by points
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      if (!applyTiebreakers) return 0;
      // Sort by goals difference
      if (a.goalsDifference !== b.goalsDifference) {
        return b.goalsDifference - a.goalsDifference;
      }

      // Sort by goals for
      if (a.goalsFor !== b.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }

      // Sort alphabetically by team name
      return a.teamName.localeCompare(b.teamName);
    });
    return sorted;
  }

  /**
   * Calculates leaderboard data from matches
   * @param {Array<Object>} matches List of matches
   * @param {Array<Object>} parentLeaderboard real leaderboard, sent when calculating tied leaderboard
   * @returns {Array<Object>} sorted leaderboard
   */
  _calculateLeaderboard(matches, parentLeaderboard) {
    const leaderboard = matches.reduce((acc, item) => {
      const homeTeam = acc.find((team) => team.teamName === item.homeTeam);
      const awayTeam = acc.find((team) => team.teamName === item.awayTeam);
      const { home, away } = this._getMatchResult(item);

      homeTeam
        ? Object.assign(homeTeam, {
            matchesPlayed: homeTeam.matchesPlayed + home.matchesPlayed,
            goalsFor: homeTeam.goalsFor + home.goalsFor,
            goalsAgainst: homeTeam.goalsAgainst + home.goalsAgainst,
            goalsDifference: homeTeam.goalsDifference + home.goalsDifference,
            points: homeTeam.points + home.points,
          })
        : acc.push(home);

      awayTeam
        ? Object.assign(awayTeam, {
            matchesPlayed: awayTeam.matchesPlayed + away.matchesPlayed,
            goalsFor: awayTeam.goalsFor + away.goalsFor,
            goalsAgainst: awayTeam.goalsAgainst + away.goalsAgainst,
            goalsDifference: awayTeam.goalsDifference + away.goalsDifference,
            points: awayTeam.points + away.points,
          })
        : acc.push(away);

      return acc;
    }, []);

    // in case of tied leaderboard set goalsFor and goalsDifference from real leaderboard for tiebreaker purposes
    if (parentLeaderboard) {
      leaderboard.forEach((team) => {
        const parentData = parentLeaderboard.find(
          (item) => item.teamName === team.teamName
        );
        const { goalsFor, goalsDifference } = parentData;
        Object.assign(team, { goalsFor, goalsDifference });
      });
    }
    const sorted = this._sortLeaderboard(leaderboard, !!parentLeaderboard);
    return { leaderboard: sorted, tiedPoints: this._getTiedPoints(sorted) };
  }

  /**
   * Returns leaderboard with applied tiebreakers
   * @param {Array<Object>} leaderboard List of teams with their points
   * @param {Array<Number>} duplicatePoints array of unique points of tied teams
   * @param {Array<Number>} matches array of unique points of tied teams
   * @returns {Array<Object>} Leaderbord sorted by tiebreakers
   */
  _getTiebreakLeaderboard(leaderboard, duplicatePoints, matches) {
    const tiebreaker = [];

    leaderboard.forEach((team) => {
      if (tiebreaker.some((item) => item.teamName === team.teamName)) return;
      if (!duplicatePoints.includes(team.points)) {
        tiebreaker.push(team);
        return;
      }
      const tiedTeams = leaderboard.filter(
        (item) => item.points === team.points
      );

      const tiedNames = tiedTeams.map((team) => team.teamName);

      const tiedMatches = matches.filter(
        (match) =>
          tiedNames.includes(match.homeTeam) &&
          tiedNames.includes(match.awayTeam)
      );

      const { leaderboard: tiedLeaderboard } = this._calculateLeaderboard(
        tiedMatches,
        leaderboard
      );

      const data = tiedLeaderboard.map((item) => {
        const original = leaderboard.find(
          (org) => org.teamName === item.teamName
        );
        return original;
      });

      tiebreaker.push(...data);
    });

    return tiebreaker;
  }

  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this._matches = [...matches.slice()];
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this._matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const { leaderboard, tiedPoints } = this._calculateLeaderboard(
      this._matches
    );

    if (!tiedPoints.length) return leaderboard;
    const tiebreakLeadeboard = this._getTiebreakLeaderboard(
      leaderboard,
      tiedPoints,
      this._matches
    );
    return tiebreakLeadeboard;
  }
  /**
   * Asynchronous function to fetch the data from the server.
   */
  async fetchData() {
    const endpoint = this._endpoints.getMatches();
    const response = await handleRequest(endpoint);
    this.setMatches(response.data?.matches || []);
  }
}

export default LeagueService;
