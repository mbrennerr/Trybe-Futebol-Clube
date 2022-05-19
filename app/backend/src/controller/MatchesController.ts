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

  public postMatch = async (req:Request, res:Response, next:NextFunction) => {
    try {
      console.log('postMatch', req.body);
      const match = req.body;

      if (match.homeTeam === match.awayTeam) {
        return res.status(401).json({
          message: 'It is not possible to create a match with two equal teams',
        });
      }
      const saveMatch = await this.matchesService.saveMatch(match);
      return saveMatch.error
        ? res.status(404).json({ message: saveMatch.message })
        : res.status(201).json(saveMatch.result);
    } catch (error) {
      return next(error);
    }
  };
}
