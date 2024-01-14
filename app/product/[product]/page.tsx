import { Data } from "@/app/page";
import BestGear from "@/components/BestGear";
import Category from "@/components/Category";
import LinkButton from "@/components/Link";
import Quantity from "@/components/Quantity";
import Image from "next/image";

const Product = async ({ params }: { params: { product: string } }) => {
  const response = await fetch("/api");
  const data: Data[] = await response.json();
  const id = params.product;
  const selectedProduct = data.find((product) => product.id.toString() === id);

  return (
    <section className="px-6 py-16 sm:px-10 md:px-20 lg:p-40">
      <div className="flex flex-col sm:flex-row sm:gap-16 gap-8 lg:gap-32 items-center mb-20 lg:mb-40">
        <picture className="flex-1 rounded-lg overflow-hidden">
          <source
            media="(max-width: 500px)"
            srcSet={`/${selectedProduct?.image.mobile.slice(2)}`}
          />
          <source
            media="(max-width: 768px)"
            srcSet={`/${selectedProduct?.image.tablet.slice(2)}`}
          />
          <Image
            className="w-auto h-auto"
            src={`/${selectedProduct?.image.desktop.slice(2)}`}
            alt={`${selectedProduct?.name}`}
            width={500}
            height={520}
          />
        </picture>
        <div className="flex-1">
          <p className="uppercase text-sm tracking-[10px] font-bold text-[#D87D4A] mb-5">
            {selectedProduct?.new ? "New product" : ""}
          </p>
          <h1 className="uppercase text-4xl font-bold tracking-widest mb-8">
            {selectedProduct?.name}
          </h1>
          <p className="text-sm opacity-50 mb-8">
            {selectedProduct?.description}
          </p>
          <h4 className="text-lg font-bold mb-12">{`$ ${selectedProduct?.price}`}</h4>
          <Quantity cart={null} button={true} productId={selectedProduct?.id} price={selectedProduct?.price}/>
        </div>
      </div> 

      <div className="flex flex-col md:flex-row gap-20 lg:gap-32 mb-20 lg:mb-40">
        <div className="flex-1">
          <h4 className="text-3xl mb-8 font-bold">Features</h4>
          <p className="text-sm opacity-50">{selectedProduct?.features}</p>
        </div>
        <div className="w-80">
          <h4 className="text-3xl font-bold mb-8 uppercase">In the box</h4>
          {selectedProduct?.includes.map((item, index) => (
            <div className="text-sm flex gap-5" key={index}>
              <h6 className="text-[#D87D4A] font-bold w-5">{`${item.quantity}x`}</h6>
              <p className="opacity-50">{item.item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:grid grid-rows-2 grid-flow-col gap-10">
        <picture>
          <source
            media="(max-width: 500px)"
            srcSet={`/${selectedProduct?.gallery.first.mobile.slice(2)}`}
          />
          <source
            media="(max-width: 768px)"
            srcSet={`/${selectedProduct?.gallery.first.tablet.slice(2)}`}
          />
          <Image
            className="w-auto h-auto rounded-lg"
            src={`/${selectedProduct?.gallery.first.desktop.slice(2)}`}
            alt={`${selectedProduct?.name}`}
            width={500}
            height={520}
          />
        </picture>
        <picture>
          <source
            media="(max-width: 500px)"
            srcSet={`/${selectedProduct?.gallery.second.mobile.slice(2)}`}
          />
          <source
            media="(max-width: 768px)"
            srcSet={`/${selectedProduct?.gallery.second.tablet.slice(2)}`}
          />
          <Image
            className="w-auto h-auto rounded-lg"
            src={`/${selectedProduct?.gallery.second.desktop.slice(2)}`}
            alt={`${selectedProduct?.name}`}
            width={500}
            height={520}
          />
        </picture>
        <picture className="row-span-2">
          <source
            media="(max-width: 500px)"
            srcSet={`/${selectedProduct?.gallery.third.mobile.slice(2)}`}
          />
          <source
            media="(max-width: 768px)"
            srcSet={`/${selectedProduct?.gallery.third.tablet.slice(2)}`}
          />
          <Image
            className="w-auto h-full rounded-lg"
            src={`/${selectedProduct?.gallery.third.desktop.slice(2)}`}
            alt={`${selectedProduct?.name}`}
            width={520}
            height={500}
          />
        </picture>
      </div>

      <div className="uppercase text-center mt-20 lg:mt-40 mb-40 lg:mb-80">
        <h3 className="text-3xl font-bold tracking-widest mb-8">
          You may also like
        </h3>
        <div className="flex flex-col sm:flex-row gap-14 md:gap-7">
          {selectedProduct?.others.map((product, index) => (
            <div key={index}>
              <picture>
                <source
                  media="(max-width: 500px)"
                  srcSet={`/${product.image.mobile.slice(2)}`}
                />
                <source
                  media="(max-width: 768px)"
                  srcSet={`/${product.image.tablet.slice(2)}`}
                />
                <Image
                  className="w-auto h-auto rounded-lg"
                  src={`/${product.image.desktop.slice(2)}`}
                  alt={`${selectedProduct?.name}`}
                  width={500}
                  height={520}
                />
              </picture>
              <h4 className="mt-10 mb-8 text-2xl font-bold tracking-wide">
                {product.name}
              </h4>
              <LinkButton
                className=""
                text="See product"
                color="o"
                href={`/product/${data.find((item) => item.slug === product.slug)?.id}`}
              />
            </div>
          ))}
        </div>
      </div>
      <Category />
      <BestGear />
    </section>
  );
};

export default Product;
