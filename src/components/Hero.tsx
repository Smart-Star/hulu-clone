import { useCallback, useEffect, useState } from 'react';
import { image_base_url, popular_movie_url } from '../services/globalApi';
import axios from 'axios';
import { MovieType } from '../constants/types';
import { Button } from './Button';
import { BiDotsVerticalRounded, BiPlay } from 'react-icons/bi';

type Status = 'Idle' | 'Loading...' | 'Completed.' | 'Error';

export const Hero = () => {
  const [movieList, setMovieList] = useState<MovieType | null>(null);
  const [_, setStatus] = useState<Status>('Idle');

  const fetchMovies = useCallback(async () => {
    const randNum = Math.floor(Math.random() * 21);

    try {
      setStatus('Loading...');
      const res = await axios.get(popular_movie_url);

      if (res && res.data.results) {
        setMovieList(res.data.results[randNum]);
        setStatus('Completed.');
      }
    } catch (error: any) {
      console.log('An error occured.', error.toJSON().message);
      setStatus('Error');
    }
  }, []);

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
    <section className="text-white relative">
      <div className="h-56 absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary via-transparen to-transparent" />

      <img
        src={image_base_url + movieList?.backdrop_path}
        alt="hero-img"
        className="w-full h-[90dvh] object-cover"
      />

      <div className="absolute bottom-0 mb-24 pl-6 md:pl-16">
        <p className="text-[12px] font-bold uppercase">Watch only on Hulu</p>
        <h2 className="text-[36px] lg:text-[47px] font-bold">
          {movieList?.title}
        </h2>

        <div className="flex items-center gap-x-4 mt-3">
          <Button variant="fill">
            <BiPlay className="size-[20px] mt-[2px]" />
            Play
          </Button>
          <Button variant="outline">Details</Button>

          <BiDotsVerticalRounded className="text-[25px] hover:scale-110 duration-300 cursor-pointer" />
        </div>
      </div>
    </section>
  );
};
