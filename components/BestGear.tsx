import Image from "next/image";
import Best from "../public/assets/shared/desktop/image-best-gear.jpg";
import BestMobile from "../public/assets/shared/mobile/image-best-gear.jpg";
import BestTablet from "../public/assets/shared/tablet/image-best-gear.jpg";

const BestGear = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-32 sm:gap-16 mt-48 sm:mt-24 text-center md:text-left md:items-center md:gap-32">
      <div className="flex-1">
        <h3 className="text-4xl font-bold mb-8">
          Bringing you the <span className="text-[#D87D4A]">Best</span> audio
          gear
        </h3>

        <p className="text-sm opacity-50">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className="flex-1">
      <Image
            className="h-full hidden md:flex rounded-lg"
            src={Best}
            alt="product"
          />
          <Image
            className="h-full hidden sm:flex md:hidden rounded-lg"
            src={BestTablet}
            alt="product"
          />
          <Image
            className="h-full sm:hidden rounded-lg"
            src={BestMobile}
            alt="product"
          />
      </div>
    </div>
  );
};

export default BestGear;
