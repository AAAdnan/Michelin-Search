const User  = require('../persistence/users');

const createUser = async () => {

  try{
    let createdUser = await User.create('adnan.ahmed01@gmail.com', 'password123');
  
    console.log(`Created user: ${createdUser}`);
  }
  catch(error){
    console.log(error.stack)
    process.exit(1)
  } 

}

createUser()



