import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMovie extends Document {
	tmdbId?: number;
	title: string;
	overview?: string;
	releaseDate?: Date;
	posterPath?: string;
	backdropPath?: string;
	genres: string[];
	director?: string;
	originalLanguage?: string;
	averageRating?: number;
	totalRatings: number;
	createdAt: Date;
	updatedAt: Date;
	videoLink: string;
}

const moviechema: Schema<IMovie> = new Schema(
	{
		tmdbId: { type: Number, unique: true, sparse: true },
		title: { type: String, required: true },
		overview: { type: String },
		releaseDate: { type: Date },
		posterPath: { type: String },
		backdropPath: { type: String },
		genres: { type: [String], default: [] },
		director: { type: String },
		originalLanguage: { type: String },
		averageRating: { type: Number, default: 0 },
		totalRatings: { type: Number, default: 0 },
		videoLink: { type: String }
	},
	{
		timestamps: true,
		collection: 'movies'
	}
);

const Movie: Model<IMovie> = mongoose.models.Movie || mongoose.model<IMovie>('Movie', moviechema);

export default Movie;
