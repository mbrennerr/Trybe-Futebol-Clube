import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAllMatches = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const matches = await this.matchesService.findAllMatches();
      const { inProgress } = req.query;
      console.log('log do query', inProgress);
      if (!inProgress) { return res.status(200).json(matches); }

      if (inProgress === 'true') {
        const isTrue = await this.matchesService.findByQuery(true);
        return res.status(200).json(isTrue);
      }
      if (inProgress === 'false') {
        const isFalse = await this.matchesService.findByQuery(false);
        return res.status(200).json(isFalse);
      } throw new Error(`${inProgress} must be ONLY true or false`);
    } catch (error) {
      return next(error);
    }
  };
}
