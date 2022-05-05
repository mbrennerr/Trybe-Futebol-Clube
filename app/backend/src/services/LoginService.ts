import Users from '../database/models/Users';

export default class LoginService {
  private usersModel;

  constructor() {
    this.usersModel = Users;
  }

  public async findUserByEmail(email:string, _pass:string) {
    const user = await this.usersModel.findOne({ where: { email } });
    const result = {
      user: {
        id: user?.id,
        username: user?.username,
        role: user?.role,
        email: user?.email,

      },
    };
    return result;
  }
}
