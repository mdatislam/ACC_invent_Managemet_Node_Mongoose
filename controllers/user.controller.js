const {
  singUpService,
  getUserService,
  findUserByEmail,
} = require("../services/user.services");
const { generateToken } = require("../utilies/token");

exports.singUp = async (req, res, next) => {
    try {
        const result = await singUpService(req.body)
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(400).send({
          message: "some thing went wrong",
          error: error.message,
        });
    }
}

exports.getUser = async (req, res, next) => {
  try {
    const result = await getUserService();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).send({
      message: "some thing went wrong",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res, next) => {
    try {
     const user = await findUserByEmail(req.user?.email)
    //const result = await getUserService();
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(400).send({
      message: "some thing went wrong",
      error: error.message,
    });
  }
};


/* 
*1. check if email & password are given
*2. load user with email
*3. if not user send res
*4. compare password
*5. if password not correct send res
*6. check user Active or not
*7. if not active send res
*8. generate Token
 */ 

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
          return  res.status(400).json({ Error:'Please provide valid Email & password'})
        }

        const user = await findUserByEmail(email);
        if (!user) {
           return res.status(403).json({
                status: "fail",
                message:"Please register for new account"
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'fail',
                Error:'password not match'
            })
        }

        if (user.status != 'active') {
            return res.status(401).json({
                status: 'fail',
                Error: 'Your account not active now'
            })
        }

        const token = generateToken(user)
        const {password:pwd, ...others}= user.toObject()

        res.status(200).json({
            status: "success", data: {
        token,others
    } });
  } catch (error) {
    res.status(400).send({
      message: "some thing went wrong",
      error: error.message,
    });
  }
};
