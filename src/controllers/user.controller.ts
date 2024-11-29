import { StatusCodes } from "../enums/status-code.enum";
import Users from "../models/user.model";
import type {
  LoginReqType,
  LoginResType,
  SignupReqType,
  SignupResType,
} from "../types/auth.types";

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
    console.error("Error Signup", error);
    return res.status(StatusCodes.INTERNAL_SERVER).json({
      message: "Server Error",
      error,
    });
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
  } catch (e) {
    console.error("Error Login", e);
    return res.status(StatusCodes.INTERNAL_SERVER).json({
      error: "Server Error",
      details: e,
    });
  }
};
