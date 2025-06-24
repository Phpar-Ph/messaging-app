import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../config/cloudinary.js";

export const getUsersForSidebar = async () => {
  try {
    const loggedInUserId = requestAnimationFrame.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log(err);
  }
};

export const getMessages = async () => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};

export const sendMessage = async () => {
  try {
     const {text, image} = req.body
     const {id : receiverId} = req.params
     const senderId = req.user._id

     let imageUrl
     if(image){
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
     }
    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl

    })
   await newMessage.save()



    res.status(200).json(newMessage);
  } catch (err) {
    console.log(err);
  }
};
