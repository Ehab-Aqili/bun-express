import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
      type: String,
      // required: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);
type HashPasswordType = {
  pass: string;
  comPass: string;
};
userSchema.methods.comPass = async ({ pass, comPass }: HashPasswordType) => {
  return await Bun.password.verify(pass, comPass);
};

const Users = mongoose.model("Users", userSchema, "Users");

export default Users;
