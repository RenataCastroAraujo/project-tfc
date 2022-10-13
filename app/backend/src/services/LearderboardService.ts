import LeaderBoardData from '../database/models/LeaderBoardData';
import ILearderBoard from '../interfaces/ILeaderboard';
import { IMatchHomeGoalsAwayGoals } from '../interfaces/IMatch';
import MatchRepository from '../repository/matchsRepository';
import TeamRepository from '../repository/teamsRepository';

export default class LeardBoardService {
  matches:IMatchHomeGoalsAwayGoals[] = [];

  constructor(private matchRepository : MatchRepository, private teamRepository : TeamRepository) {
    this.matchRepository = matchRepository;
  }

  async home(): Promise<ILearderBoard[]> {
    const finalClassification: ILearderBoard[] = [];
    this.matches = await this.matchRepository
      .findMatchesByProgress(false) as unknown as IMatchHomeGoalsAwayGoals[];
    const allTeams = await this.teamRepository.findAllTeams();
    allTeams.forEach((team) => {
      const classificationItemFilled = this.fillObj(team.teamName);
      finalClassification.push(classificationItemFilled);
    });
    const finalClassificationSorted = finalClassification
      .sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints
      || teamB.totalVictories - teamA.totalVictories
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
      || teamA.goalsOwn - teamB.goalsOwn);
    return finalClassificationSorted;
  }

  fillObj(teamName : string):ILearderBoard {
    const classificationItem:ILearderBoard = new LeaderBoardData();
    classificationItem.name = teamName;
    classificationItem.totalPoints = this.totalPoints(teamName);
    classificationItem.totalGames = this.totalGames(teamName);
    classificationItem.totalVictories = this.totalVictories(teamName);
    classificationItem.totalDraws = this.totalDraws(teamName);
    classificationItem.totalLosses = this.totalLoss(teamName);
    classificationItem.goalsFavor = this.totalGoalsFavor(teamName);
    classificationItem.goalsOwn = this.totalGoalsOwn(teamName);
    classificationItem.goalsBalance = this.totalGoalsFavor(teamName)
      - this.totalGoalsOwn(teamName);
    classificationItem.efficiency = this.calcEfficiency(teamName).toFixed(2);
    return classificationItem;
  }

  calcEfficiency(name: string) : number {
    const points = this.totalPoints(name);
    const games = this.totalGames(name);
    const efficiency = (points / (games * 3)) * 100;
    return efficiency;
  }

  totalPoints(name : string) : number {
    let accPoints = 0;
    const matchesForThisTeam = this.matches.filter((match) => match.teamHome?.teamName === name);
    matchesForThisTeam.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        accPoints += 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        accPoints += 1;
      }
    });
    return accPoints;
  }

  totalGoalsFavor(name : string) : number {
    const matchesForThisTeam = this.matches.filter((match) => match.teamHome?.teamName === name);
    const goalsFavor = matchesForThisTeam.reduce((acc, current) => acc + current.homeTeamGoals, 0);
    return goalsFavor;
  }

  totalGoalsOwn(name : string) : number {
    const matchesForThisTeam = this.matches.filter((match) => match.teamHome?.teamName === name);
    const goalsFavor = matchesForThisTeam.reduce((acc, current) => acc + current.awayTeamGoals, 0);
    return goalsFavor;
  }

  totalGames(name : string) : number {
    const matchesForThisTeam = this.matches.filter((match) => match.teamHome?.teamName === name);
    return matchesForThisTeam.length;
  }

  totalVictories(name : string) : number {
    const matchesForThisTeam = this.matches
      .filter((match) => match.teamHome?.teamName === name
    && match.homeTeamGoals > match.awayTeamGoals);
    return matchesForThisTeam.length;
  }

  totalDraws(name : string) : number {
    const matchesForThisTeam = this.matches
      .filter((match) => match.teamHome?.teamName === name
    && match.homeTeamGoals === match.awayTeamGoals);
    return matchesForThisTeam.length;
  }

  totalLoss(name : string) : number {
    const matchesForThisTeam = this.matches
      .filter((match) => match.teamHome?.teamName === name
    && match.homeTeamGoals < match.awayTeamGoals);
    return matchesForThisTeam.length;
  }
}
