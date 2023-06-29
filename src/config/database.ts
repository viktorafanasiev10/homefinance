import { Sequelize } from 'sequelize';

// replace with your own values
const database = new Sequelize('homefinance', 'postgres', 'mysecretpassword', {
  host: 'localhost',
  port: 54322,
  dialect: 'postgres',
});

export { database };
