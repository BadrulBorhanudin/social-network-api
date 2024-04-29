const { Schema, model } = require('mongoose');
const thoughtController = require('../controllers/thoughtController');

const UserSchema = new Schema(
 {
  username: {
   type: String,
   unique: true,
   required: true,
   trim: true,
  },

  email: {
   type: String,
   required: true,
   unique: true,
   validate: {
    validator: function(v) {
     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
    }
    
   }
  },

  friends:[
   {
    type: Schema.Types.ObjectId,
    ref: 'User'
   }
  ],
  thoughts: [
   {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
   }
  ]
 },
 {
  toJSON: {
   virtuals: true,
  },
  id: false
 }
);

UserSchema.virtual('friendCount').get(function() {
 return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
