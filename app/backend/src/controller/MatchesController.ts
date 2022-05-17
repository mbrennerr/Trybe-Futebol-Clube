import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAllMatches = async (_req:Request, res:Response, next:NextFunction) => {
    try {
      const matches = await this.matchesService.findAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      return next(error);
    }
  };
}
