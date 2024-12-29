// backend/models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        default: 'user'
      },
    },
    {
      timestamps: true, 
    }
  );
  
  const User = mongoose.model("User", userSchema);
  
  export default User;
