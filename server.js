const express = require('express');
const routes = require('./routes');
// TODO: import sequelize connection - DONE 
const Sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//TODO:  sync sequelize models to the database, then turn on server - DONE
Sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Express is now up and running on http://localhost:${PORT}`));
});
