import config from "../../app/config";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return {
    _id: result._id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
};


// const getAllUsers = async () => {
//   return await User.find().select("-password"); // Hide password
// };

// const updateUser = async (id: string, payload: Partial<IUser>) => {
//   // If password is being updated, hash it
//   if (payload.password) {
//     payload.password = await bcrypt.hash(payload.password, 10);
//   }

//   const updatedUser = await User.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//     select: "-password",
//   });

//   if (!updatedUser) {
//     throw new Error("User not found!");
//   }

//   return updatedUser;
// };

// const deleteUser = async (id: string) => {
//   const result = await User.findByIdAndDelete(id);
//   if (!result) {
//     throw new Error("User not found!");
//   }
//   return { message: "User deleted successfully" };
// };

const login = async (payload: { email: string; password: string }) => {
  // console.log("🔍 Login attempt with:", payload);

  const user = await User.findOne({ email: payload.email }).select("+password");
  // console.log("📦 Found user in DB:", user);

  if (!user) {
    // console.error("❌ User not found for email:", payload.email);
    throw new Error("This user is not found!");
  }

  // console.log("🔑 Plain password from request:", payload.password);
  // console.log("🔒 Hashed password from DB:", user.password);

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  // console.log("✅ Password match result:", isPasswordMatched);

  if (!isPasswordMatched) {
    // console.error("❌ Password did not match for email:", payload.email);
    throw new Error("Wrong password!");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  // console.log("🛠 JWT Payload:", jwtPayload);

  const token = jwt.sign(jwtPayload, config.jwt.access_secret, { expiresIn: "15d" });
  // console.log("🎫 Generated Token:", token);

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


export const AuthService = {
  register,
  // getAllUsers,
  // updateUser,
  // deleteUser,
  login,
};
