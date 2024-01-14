import { Data } from "@/app/page";
import BestGear from "@/components/BestGear";
import Category from "@/components/Category";
import LinkButton from "@/components/Link";
import { Metadata } from "next";
import Image from "next/image";

export const generateMetadata = ({
  params,
}: {
  params: { category: string };
}): Metadata => {
  return {
    title: `${params.category}`,
  };
};

const Categories = async ({ params }: { params: { category: string } }) => {
  const response = await fetch("/api");
  const data: Data[] = await response.json();
  const category = params.category;

  return (
    <>
      <div className="uppercase h-28 md:h-60 bg-black text-white w-full flex justify-center items-center">
        <h1 className="text-5xl">{category}</h1>
      </div>
      <section className="px-6 sm:px-10 md:px-20 lg:px-40 pt-20 pb-32 text-center md:text-left">
        <div className="mt-10 flex flex-col gap-32 mb-60">
          {data
            ?.filter((product) => product.category === category.toLowerCase())
            .sort((a, b) => b.id - a.id)
            .map((product, index) => (
              <div
                className={`flex flex-col md:flex-row gap-8 md:gap-20 lg:gap-32 items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
                key={product.id}
              >
                <div className="flex-1">
                  <Image
                    className="hidden md:flex rounded-lg w-auto h-auto"
                    src={`/${product.image.desktop.slice(2)}`}
                    alt={`${product.name}`}
                    height={520}
                    width={500}
                  />
                  <Image
                    className="hidden sm:flex md:hidden rounded-lg w-auto h-auto"
                    src={`/${product.image.tablet.slice(2)}`}
                    alt={`${product.name}`}
                    height={350}
                    width={690}
                  />
                  <Image
                    className="sm:hidden rounded-lg w-auto h-auto"
                    src={`/${product.image.mobile.slice(2)}`}
                    alt={`${product.name}`}
                    height={520}
                    width={500}
                  />
                </div>
                <div className="flex-1">
                  {product.new && (
                    <h5 className="uppercase text-sm tracking-[10px] font-bold text-[#D87D4A]">
                      New product
                    </h5>
                  )}
                  <h1 className="text-4xl font-bold mt-4" key={product.id}>
                    {product.name}
                  </h1>
                  <p className="text-sm mt-8 opacity-50 mb-10 sm:px-6 md:px-0">
                    {product.description}
                  </p>
                  <LinkButton
                    text="See product"
                    href={`/product/${product.id}`}
                    color="o"
                    className=""
                  />
                </div>
              </div>
            ))}
        </div>
        <Category />
        <BestGear />
      </section>
    </>
  );
};

export default Categories;
