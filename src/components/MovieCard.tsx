import { MovieType } from '../constants/types';
import { image_base_url } from '../services/globalApi';

type Props = {
  movie: MovieType;
};

export const MovieCard = ({ movie }: Props) => {
  return (
    <div className="group hover:scale-105 duration-300 text-gray-400 font-medium">
      <img
        src={image_base_url + movie.backdrop_path}
        alt="movie-img"
        className="min-w-[170px] md:min-w-[280px] object-cover rounded-xl group-hover:ring-2 ring-gray-300/90 group-hover:p-1 cursor-pointer duration-300"
      />

      <div className="-mt-1 md:-mt-0">
        <p className="uppercase inline-block text-[8px] md:text-[10px] tracking-wider hover:text-gray-300 cursor-pointer duration-300">
          Start Watching
        </p>

        <p className="uppercase text-[8px] md:text-[10px]">
          Release date: {movie.release_date}
        </p>

        <h2 className="text-[10px] md:text-base line-clam text-textPrimary group-hover:font-bold">
          {movie.title}
        </h2>
      </div>
    </div>
  );
};
