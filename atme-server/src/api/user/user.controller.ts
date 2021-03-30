import { Request, Response, Router as expresRouter } from 'express';
import { HTTP_RESPONSE_CODE } from '@atme/Constants';
import { UserModel, UserDoc } from './user.model';
import { CommonUtil } from '@ls-base/util/common.util';
import { UserS } from '@atme/entity/User';
import { userService } from './user.service';

export const router = expresRouter();
const { HTTP_OK, HTTP_BAD_REQUEST, FORBIDDEN_USER } = HTTP_RESPONSE_CODE;

const register = async(request: Request, response: Response) => {

  const UserM = UserModel.createModel();
  const userR:UserS = request.body;
  if (!userR.name || !userR.email || !CommonUtil.validateEmail(userR.email)) {

    response.status(HTTP_BAD_REQUEST).json({message: 'Invalid name or email'});
    return;

  }
  const {password} = request.body;
  if (!password) {

    response.status(HTTP_BAD_REQUEST).json({message: 'Password is required'});
    return;

  }
  const userE:UserS = await userService.findUserByEmail(userR.email);
  if (userE) {

    response.status(HTTP_BAD_REQUEST).json({message: 'Email id already exists.'});
    return;

  }
  const user: UserDoc = new UserM(userR);
  if (password) {

    const hashings = CommonUtil.createHashAndSalt(password);
    user.hash = hashings.hash;
    user.salt = hashings.salt;

  }
  await user.save();
  response.send(user).status(HTTP_OK);

};

router.route('/').post(register);
