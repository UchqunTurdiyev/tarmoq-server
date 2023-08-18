const { Schema, model } = require('mongoose');

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		default: 'No Photo',
	},
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

model('Post', postSchema);
