import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGenre extends Document {
  genreId?: number;
  name: string;
}
const genreschema: Schema<IGenre> = new Schema(
	{
		genreId: { type: Number, unique: true, sparse: true },
		name: { type: String, required: true },
	},
	{
		collection: 'genres'
	}
);

const Genre: Model<IGenre> = mongoose.models.Genre || mongoose.model<IGenre>('Genre', genreschema);

export default Genre;
