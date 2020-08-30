let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use('/', require('./routes/indexRouter'));


app.get('/:page', function (req, res) {
    let page = req.params.page;
    res.render(page);
});


// app.get('/sync', function(req, res) {
//     let models = require('./models');
//     models.sequelize.sync()
//     .then(()=>{
//         res.send('database sync finished');
//     });
// });


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log(`Server is running at ${app.get('port')}`);
});