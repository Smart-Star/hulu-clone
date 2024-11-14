import axios from 'axios';
import { MovieCard } from './MovieCard';
import { MovieType } from '../constants/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { movie_genre_base_url } from '../services/globalApi';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

type Props = {
  genreId: number;
};

type Status = 'Idle' | 'Loading...' | 'Completed.' | 'Error';

export const MovieList = ({ genreId }: Props) => {
  const [_, setStatus] = useState<Status>('Idle');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [movieList, setMovieList] = useState<[] | null>(null);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setStatus('Loading...');
      const res = await axios.get(
        `${movie_genre_base_url}&with_genres=${genreId}`
      );

      if (res && res.data.results) {
        setMovieList(res.data.results);
        setStatus('Completed.');
      }
    } catch (error: any) {
      console.log('An error occured.', error.toJSON().message);
      setStatus('Error');
    }
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 850;
      setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 5));
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 850;
      setCurrentSlide((prev) => (prev === 30 ? 30 : prev + 5));
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      fetchMovies();
    }

    return () => {
      isCancelled = true;
      console.log('cancelled');
    };
  }, [fetchMovies]);

  return (
    <section className="relative">
      <div
        ref={sliderRef}
        className="flex space-x-3 md:space-x-5 px-6 md:px-16 py-3 overflow-x-auto w-full scrollbar-hide scroll-smooth"
      >
        {movieList?.map((item: MovieType) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>

      <span>
        {currentSlide < 30 && (
          <BiChevronRight
            size={40}
            className="absolute hidden lg:block top-[75px] right-16 z-50 bg-primary rounded-full p-2 shadow-lg shadow-black/50 cursor-pointer"
            onClick={slideRight}
          />
        )}

        {currentSlide > 0 && (
          <BiChevronLeft
            size={40}
            className="absolute hidden lg:block top-[75px] left-28 z-50 bg-primary rounded-full p-2 shadow-lg shadow-black/50 cursor-pointer"
            onClick={slideLeft}
          />
        )}
      </span>
    </section>
  );
};
