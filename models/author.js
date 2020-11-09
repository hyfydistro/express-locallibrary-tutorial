var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const {DateTime} = require('luxon');

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        family_name: {type: String, required: true, maxlength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function() {
    return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function() {
    // return (this.date_of_death.getYear() = this.date_of_birth.getYear()).toString();
    // return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
    var lifetime_string = '';
    if (this.date_of_birth) {
      lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    } else {
        lifetime_string += 'Unknown';
    }

    lifetime_string += ' - ';

    if (this.date_of_death) {
      lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    } else {
        lifetime_string += 'Present';
    }

    return lifetime_string;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);