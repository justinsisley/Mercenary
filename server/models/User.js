var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

// Create a basic user schema
var userSchema = mongoose.Schema({
    email               : {type: String, unique: true},
    password            : String,

    // Account status
    active              : {type: Boolean, default: false},

    // Keys for activation and password
    activationKey       : String,
    passwordResetKey    : String,

    // Authentication data from third party services
    tokens              : Array,
    facebook            : {type: String, unique: true, sparse: true},
    twitter             : {type: String, unique: true, sparse: true},
    google              : {type: String, unique: true, sparse: true},
    github              : {type: String, unique: true, sparse: true},

    profile: {
        name        : {type: String, default: ''},
        gender      : {type: String, default: ''},
        location    : {type: String, default: ''},
        website     : {type: String, default: ''},
        picture     : {type: String, default: ''}
    }
});

// Before saving a new user, hash their password
userSchema.pre('save', function(next) {
    var user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            
            user.password = hash;
            
            next();
        });
    });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
    
        cb(null, isMatch);
    });
};

// Create a model using the schema
var User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;