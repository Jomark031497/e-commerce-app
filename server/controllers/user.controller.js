const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
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

// DESC:  FORGOT PASSWORD MAILER
// ROUTE: /api/v1/password/forgot
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

// DESC:  RESET PASSWORD MAILER
// ROUTE: /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(`resetpassToken : ${resetPasswordToken}`);

  const user = await User.findOne({
    resetPasswordToken,
    //resetPasswordExpires: { $gt: Date.now() },
  });
  console.log(`user: ${user}`);
  if (!user)
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Password doesn't match", 400));

  // Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// DESC:  GET CURRENTLY LOGGED USER
// ROUTE: /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// DESC:  Update/Change Password
// ROUTE: /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched)
    return next(new ErrorHandler("Old password is incorrect.", 400));

  user.password = req.body.password;

  await user.save();

  sendToken(user, 200, res);
});

// DESC:  UPDATE USER PROFILE
// ROUTE: /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update Avatar: TODO

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// DESC:  GET ALL USERS
// ROUTE: /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// DESC:  GET SPECIFIC USERS
// ROUTE: /api/v1/admin/users/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 400));

  res.status(200).json({
    success: true,
    user,
  });
});
