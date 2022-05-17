import { Request, Response, NextFunction } from 'express';
import { ITeams } from '../Types';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  public teamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAllTeams = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const teams = await this.teamsService.getTeams();
      return res.status(200).json(teams);
    } catch (error) {
      return next(error);
    }
  };

  public getById = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      const teams:ITeams = await this.teamsService.getTeamsById(id);
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
