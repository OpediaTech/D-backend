const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { UserRegisterType, RoleUserTypes } = require("../utils/constants")
const { validateEmail } = require("../utils/validators")

const UserSchema = new mongoose.Schema({
  agree: {
    type: Boolean,
    required: false
  },
  city: {
    type: String,
    trim: true,
    required: false
  },
  companyEmail: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    required: false,
    validate: {
      validator: validateEmail,
      message: props => `${props.value} is not a valid email`
    },
  },
  companyName: {
    type: String,
    trim: true,
    required: false
  },
  companyPhone: {
    type: String,
    trim: true,
    required: false
  },
  country: {
    type: String,
    trim: true,
    required: false
  },
  email: {
    type: String,
    trim: true,
    // lowercase: true,
    // unique: true,
    required: true,
    validate: {
      validator: validateEmail,
      message: props => `${props.value} is not a valid email`
    },
  },
  feinCode: {
    type: String,
    trim: true,
    required: false
  },
  feinCopy: {
    type: String,
    trim: true,
    required: false
  },
  license: {
    type: String,
    trim: true,
    required: false,
    default: 'NO LICENSE PROVIDED'
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  postalCode: {
    type: String,
    trim: true,
    required: false
  },
  resalecert: {
    type: String,
    trim: true,
    required: false
  },
  state_province_region: {
    type: String,
    trim: true,
    required: false
  },
  streetAddress: {
    type: String,
    trim: true,
    required: false
  },
  role: {
    type: String,
    trim: false,
    default: "retailer",
    validate: {
      validator: function (role) {
        return UserRegisterType.has(role)
      },
      message: props => `${props.value} is not a valid role`
    },
    required: true
  },
  approved: {
    type: Boolean,
    required: false,
    default: false
  }
}, { timestamps: true })


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(+process.env.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})




const RoleUserSchema = mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Employee is not authorized or registered.']
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  role: {
    type: String,
    trim: true,
    validate: {
      validator: function (role) {
        return RoleUserTypes.has(role)
      },
      message: props => `${props.value} is not a valid role`
    },
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: {
      validator: validateEmail,
      message: props => `${props.value} is not a valid email`
    },
  },
})

module.exports = {      
  UserModel: mongoose.model('User', UserSchema),
  RoleUserModel: mongoose.model('RoleUser', RoleUserSchema),
}