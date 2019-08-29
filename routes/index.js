
module.exports = function(app){
    app.use('/home', require('./home'));
    app.use('/articel', require('./articel'));
    app.use('/sign', require('./sign'));
    app.use('/err', require('./err'));
}