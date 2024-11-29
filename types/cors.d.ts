declare module "cors" {
  import { RequestHandler } from "express";
  const cors: RequestHandler;
  export = cors;
}
