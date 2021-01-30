const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// DESC:  REGISTER A USER
// ROUTE: /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kccvibpsuiusmwfepb3m",
      url:
        "https://cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png",
    },
  });

  sendToken(user, 200, res);
});

// DESC:  LOGIN A USER
// ROUTE: /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is entered by a user
  if (!email || !password)
    return next(new ErrorHandler("Please enter email and password", 400));

  // Find user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  // check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid email or password", 401));

  sendToken(user, 200, res);
});

// DESC:  LOGOUT A USER
// ROUTE: /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "", { expires: new Date(Date.now()), httpOnly: true });

  res
    .status(200)
    .json({ success: true, message: "user successfully logged out" });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler("User not found", 404));

  // get reset token
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  // create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  console.log(resetUrl);
  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
