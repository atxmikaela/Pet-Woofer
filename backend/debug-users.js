const db = require('./src/db/models');

async function checkUsers() {
  try {
    const users = await db.User.findAll();
    console.log('Current users in database:');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`);
    });
    
    // Check specifically for user ID 4
    const user4 = await db.User.findByPk(4);
    if (user4) {
      console.log('\nUser ID 4 exists:', user4.username);
    } else {
      console.log('\nUser ID 4 does NOT exist');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUsers();
