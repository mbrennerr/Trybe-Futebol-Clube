import { sign, verify, SignOptions } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { IToken } from '../Types';

export default class Token {
  private static JWT_SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

  private static JWT_OPTIONS:SignOptions = {
    algorithm: 'HS256',
    expiresIn: '15min',
  };

  public static generateToken(user:IToken) {
    const token = sign({ ...user }, this.JWT_SECRET, this.JWT_OPTIONS);
    console.log('jwtCreat', this.JWT_OPTIONS, this.JWT_SECRET);
    return token;
  }

  public static async verifyToken(token:string) {
    const data = verify(token, this.JWT_SECRET, this.JWT_OPTIONS);
    if (typeof data === 'string') throw new Error(data);

    return data;
  }
}
