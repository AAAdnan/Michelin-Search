const User  = require('../modules/users');

const createUser = async () => {

  try{
    let createdUser = await User.create('adnan.ahmed01@gmail.com', 'password123');
  
    console.log(`Created user: ${createdUser}`);

    process.exit(0)
  }
  catch(error){
    console.log(error.stack)
    process.exit(1)
  } 

}

createUser()



