/* eslint-disable @typescript-eslint/no-empty-object-type */
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import config from "../../app/config";

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User Schema
const UserSchema = new Schema<IUser, mongoose.Model<IUser, {}, IUserMethods>, IUserMethods>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.password) throw new Error("Password is required for hashing.");

  const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from response
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = mongoose.model<IUser, mongoose.Model<IUser, {}, IUserMethods>>("User", UserSchema);

export default User;
