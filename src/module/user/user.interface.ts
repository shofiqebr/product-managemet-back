

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  password: string; // Hashed password
  role: "admin" | "user"
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;

}

