import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

import { RegisterDto } from './dto/register.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { RegisterResponseDto } from './dto/register.response.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    try {
      return await this.registerWithPromise(registerDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async authenticate(authenticateDto: AuthenticateDto) {
    try {
      const authenticateResult: any = await this.authenticateWithPromise(
        authenticateDto,
      );
      const registerResponseDto: RegisterResponseDto = {
        jwtToken: authenticateResult.idToken.jwtToken,
        refreshToken: authenticateResult.refreshToken.token,
      };
      return registerResponseDto;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  private async registerWithPromise(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const userPool = this.generateUserPool();

    return new Promise((resolve, reject) => {
      return userPool.signUp(email, password, null, null, (err, result) => {
        if (!result) {
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    });
  }

  private async authenticateWithPromise(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: this.generateUserPool(),
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          resolve(result);
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  }

  private generateUserPool() {
    return new CognitoUserPool({
      UserPoolId: process.env.COGNITO_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });
  }
}
