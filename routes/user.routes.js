const { Router } = require('express')
const { registerUser, addUser, getAuthUserByEmail, updateUserRoleAndPrice, deleteUser, getAllEmployee, getAllUser, approveUser } = require('../controller/user.controller')
const { Can_User_Modify, Only_Admin } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/files.middleware')
const { UserRegisterFileFields } = require('../utils/constants')
const userRoutes = Router()

// userRoutes.post('/register', upload.fields(UserRegisterFileFields), registerUser)
// userRoutes.put('/register', Only_Admin, approveUser)

// userRoutes.get('/auth/user', Can_User_Modify, getAuthUserByEmail)
// userRoutes.get('/user', Can_User_Modify, getAllEmployee)

// userRoutes.post('/user', Can_User_Modify, addUser)
// userRoutes.put('/user', Can_User_Modify, updateUserRoleAndPrice)
// userRoutes.delete('/user', Can_User_Modify, deleteUser)

// userRoutes.get('/user/all', getAllUser)



// dihan contrioller 

userRoutes.post('/register',  registerUser)
userRoutes.put('/register',  approveUser)

userRoutes.get('/user',  getAuthUserByEmail)
userRoutes.get('/user/allEmployee', getAllEmployee)

userRoutes.post('/user',  addUser)
userRoutes.put('/user',  updateUserRoleAndPrice)
userRoutes.delete('/user', deleteUser)

userRoutes.get('/user/all', getAllUser)


module.exports = {
  userRoutes
}