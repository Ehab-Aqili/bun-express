import { StatusCodes } from "../enums/status_code.enum";
import Users from "../models/user.model";
import type {
  LoginReqType,
  LoginResType,
  SignupReqType,
  SignupResType,
} from "../types/auth.types";
import { ErrorHandler } from "../utils/error_handler";

export const Signup = async (req: SignupReqType, res: SignupResType) => {
  try {
    const hashPssowrd = await Bun.password.hash(req.body.password, {
      algorithm: "bcrypt",
    });
    const user = await Users.create({
      ...req.body,
      password: hashPssowrd,
    });

    if (user) {
      res.status(StatusCodes.CREATE).json({
        message: "Signup Successfully",
      });
    }
  } catch (error) {
    const errorRes = ErrorHandler(error)
    return res.status(errorRes.status).json(errorRes.response);
  }
};

export const Login = async (req: LoginReqType, res: LoginResType) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
    });

    const password = req.body.password;
    const isMatch = await Bun.password.verify(password, user?.password || "");
    if (isMatch) {
      res.status(StatusCodes.OK).json({
        message: "Login Successfully",
        isMatch,
      });
    }
  } catch (error) {
    const errorRes = ErrorHandler(error)
    return res.status(errorRes.status).json(errorRes.response);
  }
};
