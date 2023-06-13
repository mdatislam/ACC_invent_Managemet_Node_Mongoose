const User = require("../models/user")

exports.singUpService = async (userInfo) => {
    const user = await User.create(userInfo)
    //console.log(user)
    return user
}

exports.getUserService = async () => {
  const user = await User.find({});
  return user;
};

exports.findUserByEmail =async(email) => {
    const user = await User.findOne({ email: email })
    return user
}