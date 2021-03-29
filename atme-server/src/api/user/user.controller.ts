import { Request, Response, Router as expresRouter } from 'express';
import { HTTP_RESPONSE_CODE } from '@atme/Constants';

export const router = expresRouter();
const { HTTP_OK, HTTP_BAD_REQUEST, FORBIDDEN_USER } = HTTP_RESPONSE_CODE;

const register = async(request: Request, response: Response) => {

  response.status(HTTP_OK).json({message: 'OK'});

};


router.route('/').post(register);
