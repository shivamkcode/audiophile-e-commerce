import Image from "next/image";
import Headphones from "../public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import Speakers from "../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import Earphones from "../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import ArrowRight from "../public/assets/shared/desktop/icon-arrow-right.svg";
import Link from "next/link";

const Category = () => {
  return (
    <div className="uppercase text-center font-bold flex flex-col sm:flex-row gap-20 sm:gap-10 sm:mt-10 items-center md:gap-7 md:mt-20">
      <Link
        href="/category/headphones"
        className="h-52 sm:h-40 md:h-52 bg-[#f1f1f1] w-full relative rounded-lg hover:text-[#D87D4A] cursor-pointer"
      >
        <Image
          className="-top-16 sm:-top-20 absolute w-52 left-2/4 -translate-x-2/4"
          src={Headphones}
          alt="headphones"
        />
        <h3 className="mt-32 sm:mt-20 md:mt-28  mb-3 text-lg text-black">
          Headphones
        </h3>
        <div className="flex gap-3 items-center  justify-center">
          <span className="text-sm opacity-50">Shop</span>
          <Image className="w-2 h-3" src={ArrowRight} alt=">" />
        </div>
      </Link>

      <Link
        href="/category/speakers"
        className="h-52 sm:h-40 md:h-52 bg-[#f1f1f1] w-full relative rounded-lg hover:text-[#D87D4A] cursor-pointer"
      >
        <Image
          className="-top-16 sm:-top-[70px] absolute w-52 left-2/4 -translate-x-2/4"
          src={Speakers}
          alt="Speakers"
        />
        <h3 className="mt-32 sm:mt-20 md:mt-28 mb-3 text-lg text-black">
          Speakers
        </h3>
        <div className="flex gap-3 items-center  cursor-pointer justify-center">
          <span className="text-sm opacity-50">Shop</span>
          <Image className="w-2 h-3" src={ArrowRight} alt=">" />
        </div>
      </Link>

      <Link
        href="/category/earphones"
        className="h-52 sm:h-40 md:h-52 bg-[#f1f1f1] w-full relative rounded-lg hover:text-[#D87D4A] cursor-pointer"
      >
        <Image
          className="-top-16 absolute w-52 left-2/4 -translate-x-2/4"
          src={Earphones}
          alt="Earphones"
        />
        <h3 className="mt-32 sm:mt-20 md:mt-28 mb-3 text-lg text-black">
          Earphones
        </h3>
        <div className="flex gap-3 items-center  cursor-pointer justify-center">
          <span className="text-sm opacity-50">Shop</span>
          <Image className="w-2 h-3" src={ArrowRight} alt=">" />
        </div>
      </Link>
    </div>
  );
};

export default Category;
