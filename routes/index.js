
module.exports = function(app){
    app.use('/login', require('./login'));
    app.use('/err', require('./err'));
}