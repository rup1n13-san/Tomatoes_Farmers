
import { Schema, model, models } from "mongoose";

const FavoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

FavoriteSchema.index({ user: 1, movie: 1 }, { unique: true });

const Favorite = models.Favorite || model("Favorite", FavoriteSchema);

export default Favorite;
