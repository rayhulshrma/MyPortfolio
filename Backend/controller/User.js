import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, password, about } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (about) {
      user.about = about;
    }


    await user.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const addSkills = async (req, res) => {
  try {
    const { title,subtitle,picture} = req.body;

    const user = await User.findById(req.user._id);
    
    const myCloud = await cloudinary.v2.uploader.upload(picture, {
        folder: "portfolio",
      });
    user.skills.unshift({
        title,
        subtitle,
        picture: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Skills",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const addSkills = async (req, res) => {
//     try {
//       // Validate request body
//       const { title, subtitle, picture } = req.body;
//       if (!title || !subtitle || !picture) {
//         return res.status(400).json({
//           success: false,
//           message: "Title, subtitle, and picture are required.",
//         });
//       }
  
//       // Authenticate user (assuming req.user is set properly)
//       const user = await User.findById(req.user._id);
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: "User not authorized.",
//         });
//       }
      
//       // Upload picture to cloudinary
//       const myCloud = await cloudinary.v2.uploader.upload(picture, {
//         folder: "portfolio",
//       });
  
//       // Add skills to user document
//       user.skills.unshift({
//         title,
//         subtitle,
//         picture: {
//           public_id: myCloud.public_id,
//           url: myCloud.secure_url,
//         },
//       });
  
//       // Save user document
//       await user.save();
  
//       // Send success response
//       res.status(200).json({
//         success: true,
//         message: "Skill added successfully.",
//       });
//     } catch (error) {
//       // Handle errors
//       console.error("Error adding skill:", error);
//       res.status(500).json({
//         success: false,
//         message: "Internal server error.",
//       });
//     }
//   };




export const addYoutube = async (req, res) => {
  try {
    const { heading,title,subtitle,viewUrl,captures} = req.body;

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(captures, {
      folder: "portfolio",
    });
    user.youtube.unshift({
      viewUrl,
      heading,
      subtitle,
      title,
      captures: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Youtube Videos",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const { heading,title,subtitle,viewUrl,captures} = req.body;

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(captures, {
      folder: "portfolio",
    });
    user.projects.unshift({
      viewUrl,
      heading,
      subtitle,
      title,
      captures: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addGallery = async (req, res) => {
  try {
    const { title, photograph } = req.body;

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(photograph, {
      folder: "gallery",
    });

    user.gallery.unshift({
      title,
      photograph: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Gallery",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const contact = async (req, res) => {
  try {
    // Destructure form data from request body
    const { firstname, lastname, email, phonenumber, message } = req.body;

    // Create message to be sent via email
    const userMessage = `Hey, I am ${firstname} ${lastname}. My email is ${email}. My PhoneNumber is ${phonenumber}. My message is ${message}.`;

    // Send email using sendMail function
    await sendMail(userMessage);

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    // If an error occurs, respond with error message
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    user.timeline = user.timeline.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Timline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const video = user.youtube.find((video) => video._id == id);

    await cloudinary.v2.uploader.destroy(video.image.public_id);

    user.youtube = user.youtube.filter((video) => video._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Youtube",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => item._id == id);

    await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};