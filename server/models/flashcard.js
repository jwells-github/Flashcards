const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
    front_text: {type:String, required: true, minlength: 1},
    back_text: {type:String, default: ""}, 
    date_created: {type: Date, default: Date.now},
    owner: {type:Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Flashcard', FlashcardSchema);