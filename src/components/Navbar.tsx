import { useEffect, useState } from 'react';
import { logo } from '../assets';
import { menu } from '../constants';
import { BiChevronDown, BiChevronUp, BiSearch } from 'react-icons/bi';

export const Navbar = () => {
  const [isPageTop, setIsPageTop] = useState<boolean>(true);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY === 0 ? setIsPageTop(true) : setIsPageTop(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between text-textLinkColor font-medium py-3 px-6 md:px-16 ${isPageTop ? 'bg-gradient-to-b from-primary to-transparent' : 'bg-primary'}`}
    >
      <img src={logo} alt="logo" className="w-[65px] cursor-pointer" />

      <ul className="flex items-center max-lg:hidden gap-6">
        {menu.map((item) => (
          <li
            key={item.id}
            className={`cursor-pointer ${item.active && 'text-white'} hover:bg-primaryHover hover:text-white px-4 py-[6px] pb-2 rounded-md duration-300`}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <div className="flex justify-center lg:hidden relative">
        <h2
          onClick={() => setToggleMenu((prev) => !prev)}
          className="flex gap-2 cursor-pointer rounded-md duration-300 bg-primaryHover hover:bg-primaryDim text-white px-4 py-2"
        >
          Home
          {toggleMenu ? (
            <BiChevronUp className="text-[25px]" />
          ) : (
            <BiChevronDown className="text-[25px]" />
          )}
        </h2>

        {toggleMenu && (
          <ul className="absolute z-[100] top-14 w-[200px] p-2 text-center space-y-2 bg-primary border border-gray-400/50 rounded-md slide-bottom">
            {menu.map((item) => (
              <li
                key={item.id}
                onClick={() => setToggleMenu((prev) => !prev)}
                className={`cursor-pointer ${item.active && 'text-white'} hover:bg-primaryHover hover:text-white px-4 py-2 rounded-md duration-300`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4">
        <BiSearch className="text-[40px] hover:bg-[#33363c] hover:text-white rounded-md py-[6px] cursor-pointer duration-300" />

        <h2 className="text-white border-2 border-white rounded-full size-8 text-center pt-[1.5px] cursor-pointer">
          R
        </h2>
      </div>
    </nav>
  );
};
