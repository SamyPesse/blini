const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.use('/', require('./route/homepage'));
app.use('/post/:id', require('./routes/post'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
