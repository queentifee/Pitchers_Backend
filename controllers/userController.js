const User = require('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
            // Check if the logged-in user is an admin
    //   if (req.user.role  !== 'admin')  {
    //     return res.status(403).json({ msg: 'Access denied. Admins only.'});
    //   }

    //   fetch users from database
    const users = await User.find().select('-password'); //Exclude passwprds
    res.status(200).json(users);
}catch (error) {
    res.status(500).json({ error: error.message });
}
};

// Get a user by Id
  exports.getUserById = async (req, res) => {
    try {
      // console.log('Fetched User:', user);

        const user = await User.findById(req.params.id).lean().select('-password');
       if (!user) {
        return res.status (404).json ({ error: 'User not found'});
       }
       res.json(user);
    } catch (error)  {
        res.status(500).json({ error: error.message });
    }
  };
  


//   Update User by Id
// exports.updateUser = async (req, res) => {
//   const { name, email, } = req.body;

//   try {
//     let user = await User.findById(req.params.id);

//     if(!user) {
//         return res.status (404).json({ error: 'User not found'});
//     }

//     // Update the user's information
//     user.name = name || user.name;
//     user.email = email || user.email;

//     await user.save ();

//     const userObj = user.toObject();
//     delete userObj.password;
//     delete userObj.__v;


//     res.json({ msg: 'User updated successfully', userObj });
// } catch (err) {
//   exports.updateUser = async (req, res) => {
//     const { name, email, role } = req.body;
  
//     try {
//       let user = await User.findById(req.params.id);
  
//       if(!user) {
//           return res.status (404).json({ error: 'User not found'});
//       }
  
//       // Update the user's information
//       user.name = name || user.name;
//       user.email = email || user.email;
//       user.role = role || user.role;
  
//       await user.save ();

//       const userObj = user.toObject();
//       delete userObj.password;
//       delete userObj.__v;
  
//       res.json({ msg: 'User updated successfully', userObj });
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).json({ error: err.message });
//     }
//   };  res.status(400).json({ error: err.message });
//   }
// };

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status (404).json ({ msg: 'User not found'});
        }

        // await user.remove();

        res.json({ msg: 'User removed successfully' });
      } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message });
    }
};

