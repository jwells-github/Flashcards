const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
    cardFront: {type:String, required: true, minlength: 1},
    cardBack: {type:String, default: ""}, 
    cardDeck: {type:String, require: true, minlength: 1},
    dateCreated: {type: Date, default: Date.now},
    owner: {type:Schema.Types.ObjectId, ref: 'User', required: true},

})

module.exports = mongoose.model('Flashcard', FlashcardSchema);