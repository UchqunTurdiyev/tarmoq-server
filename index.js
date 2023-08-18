const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const { MONGO_URI } = require('./keys');

require('./models/user');
require('./models/post');

mongoose.connect(MONGO_URI);

app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} ....`);
});
