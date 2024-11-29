import express from "express";
import { Login, Signup } from "../controllers/user.controller";
import { validateData } from "../middleware/zod.middleware";
import {
  LoginValidation,
  SignupValidation,
} from "../validations/auth.validation";

const AuthRoute = express.Router();

const AuthRouteArray = [
  {
    path: "/login",
    controller: Login,
    // test multiple middleware
    middleware: [
      validateData(LoginValidation),
      (
        req?: express.Request,
        res?: express.Response,
        next?: express.NextFunction
      ) => {
        console.log("Test Mmultiple Middleware ");
        next();
      },
    ],
  },
  {
    path: "/signup",
    controller: Signup,
    middleware: [validateData(SignupValidation)],
  },
];

AuthRouteArray.map((route) => {
  AuthRoute.post(route.path, route.middleware, route.controller);
});

export default AuthRoute;
