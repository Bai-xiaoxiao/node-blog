
module.exports = function(app){
    app.use('/home', require('./home'));
    app.use('/articel', require('./articel'));
    app.use('/sign', require('./sign'));
    app.use('/personal', require('./personal'));
    app.use('/err', require('./err'));
}