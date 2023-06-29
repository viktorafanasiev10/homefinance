import { Sequelize } from 'sequelize';

let sequelize: Sequelize;
// replace with your own values
if (process.env.DATABASE_URL) {
  // Running on Heroku, so use the DATABASE_URL environment variable
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // to avoid the self-signed certificates error
      }
    }
  });
} else {
  // Running locally so use local database settings
  sequelize = new Sequelize('homefinance', 'postgres', 'mysecretpassword', {
    host: 'localhost',
    port: 54322,
    dialect: 'postgres'
  });
}

export { sequelize };
