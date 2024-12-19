import LinkButton from '@/components/Link'

import Image from "next/image";
import Hero from "../public/assets/home/desktop/image-hero.jpg";
import HeroMobile from "../public/assets/home/mobile/image-header.jpg";
import HeroTablet from "../public/assets/home/tablet/image-header.jpg";
import ZX9 from "../public/assets/home/desktop/image-speaker-zx9.png";
import ZX7 from "../public/assets/home/desktop/image-speaker-zx7.jpg";
import ZX7Mobile from "../public/assets/home/mobile/image-speaker-zx7.jpg";
import ZX7Tablet from "../public/assets/home/tablet/image-speaker-zx7.jpg";
import YX1 from "../public/assets/home/desktop/image-earphones-yx1.jpg";
import YX1Mobile from "../public/assets/home/mobile/image-earphones-yx1.jpg";
import YX1Tablet from "../public/assets/home/tablet/image-earphones-yx1.jpg";
import CirclePattern from "../public/assets/home/desktop/pattern-circles.svg";
import Category from "@/components/Category";
import BestGear from "@/components/BestGear";

interface Image {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Includes {
  quantity: number;
  item: string;
}

interface Gallery {
  first: Image;
  second: Image;
  third: Image;
}

interface Others {
  slug: string;
  name: string;
  image: Image;
}

export interface Data {
  id: number;
  slug: string;
  name: string;
  image: Image;
  category: string;
  categoryImage: Image;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Includes[];
  gallery: Gallery;
  others: Others[];
}

const Home = async () => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/`);
  const data: Data[] = await response.json();

  return (
    <main className="relative">
      <section className="-mt-[80px] z-10 relative flex items-center">
        <div className="absolute text-white text-center md:text-left mx-14 sm:mx-44 md:mx-20 lg:mx-40 md:mt-12 md:w-1/3">
          <h5 className="uppercase text-sm opacity-45 tracking-[10px]">
            New product
          </h5>
          <h1 className="text-4xl font-bold uppercase tracking-wide my-6 lg:text-5xl">
            {data[3]?.name}
          </h1>
          <p className="text-sm opacity-75 pb-10">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
          <LinkButton
            className=''
            text="See product"
            href={`/product/${data[3].id}`}
            color="o"
          />
        </div>
        <Image
          className="hidden md:flex w-full h-auto"
          src={Hero}
          alt="product"
          width={500}
          height={300}
        />
        <Image
          className="hidden sm:flex md:hidden w-full h-auto"
          src={HeroTablet}
          alt="product"
          width={500}
          height={300}
        />
        <Image
          className="w-full h-auto sm:hidden"
          src={HeroMobile}
          alt="product"
          width={500}
          height={300}
        />
      </section>

      <section className="py-28 px-6 sm:px-10 md:px-20 lg:px-40">
        <Category />

        <div className="bg-[#D87D4A] relative overflow-hidden text-white flex mt-28 h-[600px] sm:h-[720px] md:h-[560px] rounded-lg md:justify-end">
          <Image
            className="absolute -top-8 sm:-top-28 scale-150 z-0 right-1 md:-left-28 md:scale-100 md:-bottom-52 md:top-auto lg:-left-40 lg:-bottom-60"
            src={CirclePattern}
            alt="zx9"
          />
          <Image
            className="absolute top-14 left-2/4 -translate-x-2/4 h-52 w-44 sm:w-48 sm:h-60 md:w-[320px] md:h-[400px] md:top-auto md:-bottom-4 md:left-[30%]"
            src={ZX9}
            alt="zx9"
          />
          <div className="z-10 text-center md:text-left mt-80 sm:mt-96 sm:px-40 md:mt-0 md:self-center md:px-0 md:w-2/5">
            <h2 className="text-4xl uppercase mb-6 font-bold">
              {data[5]?.name}
            </h2>
            <p className="text-sm opacity-75 mb-10">Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <LinkButton
              color="b"
              className=''
              text="See product"
              href={`/product/${data[5].id}`}
            />
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden h-80">
          <div className="absolute top-24 left-20">
            <h3 className="text-3xl font-bold mb-8">{data[4]?.name}</h3>
            <LinkButton
              color=""
              className=''
              text="See product"
              href={`/product/${data[4].id}`}
            />
          </div>
          <Image
            className="h-full w-auto hidden md:flex rounded-lg"
            src={ZX7}
            alt="product"
          />
          <Image
            className="h-full w-auto hidden sm:flex md:hidden rounded-lg"
            src={ZX7Tablet}
            alt="product"
          />
          <Image
            className="h-full w-full sm:hidden rounded-lg"
            src={ZX7Mobile}
            alt="product"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-8 mt-12">
          <div className="rounded-lg overflow-hidden flex-1">
          <Image
            className="h-full hidden md:flex rounded-lg"
            src={YX1}
            alt="product"
          />
          <Image
            className="h-full hidden sm:flex md:hidden rounded-lg"
            src={YX1Tablet}
            alt="product"
          />
          <Image
            className="h-full sm:hidden rounded-lg"
            src={YX1Mobile}
            alt="product"
          />
          </div>
          <div className="bg-[#f1f1f1] rounded-lg flex-1 py-20 px-8">
            <h3 className="text-3xl font-bold mb-8">{data[0]?.name}</h3>
            <LinkButton
              color=""
              className=''
              text="See product"
              href={`/product/${data[0].id}`}
            />
          </div>
        </div>
        <BestGear />
      </section>
    </main>
  );
};

export default Home;
