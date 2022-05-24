import { Request, Response, NextFunction } from 'express';

import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  private leaderBoardService: LeaderBoardService;

  constructor() {
    this.leaderBoardService = new LeaderBoardService();
  }

  public getLeaderboardHome = async (_req:Request, res:Response, next:NextFunction) => {
    try {
      const leaderBoard = await this.leaderBoardService.getLeaderBoardHome();
      return res.status(200).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  };
}
