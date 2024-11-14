import { BiChevronRight } from 'react-icons/bi';
import { genere } from '../constants';
import { MovieList } from './MovieList';

export const Category = () => {
  return (
    <section className="-mt-12 relative z-[30] text-white space-y-10">
      {genere.map((item, index) => {
        index += 1;

        return (
          index <= 7 && (
            <div key={item.id}>
              <div className="flex justify-between px-6 md:px-16">
                <h2 className="font-medium">{item.name}</h2>

                <p className="uppercase flex items-center gap-x-1 text-[8px] md:text-[12px] text-gray-400 hover:text-white duration-300 cursor-pointer">
                  View All
                  <BiChevronRight className="text-[16px]" />
                </p>
              </div>

              <MovieList genreId={item.id} />
            </div>
          )
        );
      })}
    </section>
  );
};
