const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

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
		required: true,
	},
	likes: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	postedBy: {
		type: ObjectId,
		ref: 'User',
	},
});

model('Post', postSchema);
