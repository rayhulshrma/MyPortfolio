import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },
  about: {
    type: String,
  },
  skills: [
    {
      title: String,
      subtitle: String,
      picture: {
        public_id: String,
        url: String,
      },
    }
  ],
  projects: [
    {
      heading:String,
      title: String,
      subtitle: String,
      viewUrl: String,
        captures: {
        public_id: String,
        url: String,
      },
    }
  ],

  youtube: [
    {
      heading:String,
      title: String,
      subtitle: String,
      viewUrl: String,
        captures: {
        public_id: String,
        url: String,
      },
    }
  ],

  gallery: [
    {
      title: String,
      photograph: {
        public_id: String,
        url: String,
      },
    }
  ],

});

export const User = mongoose.model("User", userSchema);
