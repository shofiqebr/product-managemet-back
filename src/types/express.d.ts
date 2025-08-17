import { IUser } from "../module/user/user.interface";


declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or { _id: string; name: string; role: string }
    }
  }
}
