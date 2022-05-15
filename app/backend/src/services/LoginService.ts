import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/Users';
import Token from '../Utils';

export default class LoginService {
  private token = Token.Token;

  private usersModel;

  constructor() {
    this.usersModel = Users;
  }

  public async findUserByEmail(email:string, pass:string) {
    const user = await this.usersModel.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email or password');
    }
    const hashIsEqualToPassword: boolean = await bcryptjs.compare(pass, user.password);
    if (!hashIsEqualToPassword) {
      throw new Error('Incorrect email or password');
    }
    const result = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },

    };

    const token = this.token.generateToken(result.user);
    return { user: result.user, token };
  }
}
