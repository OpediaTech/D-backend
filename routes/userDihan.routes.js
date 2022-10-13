const { Router } = require('express')
const { registerUser, addUser, getAuthUserByEmail, updateUserRoleAndPrice, deleteUser, getAllEmployee, getAllUser,loginUser, approveUser, getUserByEmail } = require('../controller/user.controllerDihan')
const { Can_User_Modify, Only_Admin } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/files.middleware')
const { UserRegisterFileFields } = require('../utils/constants')
const userRoutesD = Router()

// userRoutes.post('/register', upload.fields(UserRegisterFileFields), registerUser)
// userRoutes.put('/register', Only_Admin, approveUser)

// userRoutes.get('/auth/user', Can_User_Modify, getAuthUserByEmail)
// userRoutes.get('/user', Can_User_Modify, getAllEmployee)

// userRoutes.post('/user', Can_User_Modify, addUser)
// userRoutes.put('/user', Can_User_Modify, updateUserRoleAndPrice)
// userRoutes.delete('/user', Can_User_Modify, deleteUser)

// userRoutes.get('/user/all', getAllUser)



// dihan contrioller 
userRoutesD.get('/user/all', getAllUser)
userRoutesD.post('/register',  registerUser)
userRoutesD.post('/login',  loginUser)

userRoutesD.put('/register',  approveUser)

userRoutesD.get('/user/:email',  getUserByEmail)
userRoutesD.get('/user/allEmployee', getAllEmployee)

userRoutesD.post('/user',  addUser)
userRoutesD.put('/user',  updateUserRoleAndPrice)
userRoutesD.delete('/user', deleteUser)




module.exports = {
  userRoutesD
}