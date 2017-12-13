/*
    图书馆书籍的表格
*/
const db = require('./db.js');
Schema = db.Schema;
const userSchema = new Schema(
    {
        account: String,
        password: String,
        token: String,
    }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
module.exports = db.model('user', userSchema);
