import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            minlength: [2, "Name must be 2 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            minlength: [5, "Email must be 5 characters long"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            },              
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8 characters long"],
        },
    },
    { timestamps: true }
);

// Virtual for confirmPassword, not stored in the DB
userSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Pre-validate hook to compare password and confirmPassword
userSchema.pre('validate', function(next) {
  console.log(this.password)
  console.log(this._confirmPassword)
    if (this.password !== this._confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

userSchema.pre('save', function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // Hash the password with bcrypt before saving the user
    bcrypt.hash(this.password, 10)
      .then(hash => {
          this.password = hash;
          next();
      })
      .catch(err => next(err)); // Handle errors
});


const User = model("User", userSchema);
export default User;
