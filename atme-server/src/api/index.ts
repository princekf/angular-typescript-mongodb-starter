import { Router as expresRouter } from 'express';
import { router as userController } from './user/user.controller';
import { USER_API } from '@atme/serverAPI';

export const APIRouter = expresRouter();
APIRouter.use(USER_API, userController);

