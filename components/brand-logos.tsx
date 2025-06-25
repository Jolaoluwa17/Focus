import {
  SiNike,
  SiAdidas,
  SiPuma,
  SiUnderarmour,
  SiReebok,
  SiNewbalance,
} from "react-icons/si";

export function BrandLogos() {
  const brands = [
    { name: "Nike", icon: SiNike },
    { name: "Adidas", icon: SiAdidas },
    { name: "Puma", icon: SiPuma },
    { name: "Under Armour", icon: SiUnderarmour },
    { name: "Reebok", icon: SiReebok },
    { name: "New Balance", icon: SiNewbalance },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-70">
          {brands.map((brand, index) => {
            const Icon = brand.icon;
            return (
              <div key={index} className="flex justify-center">
                <Icon
                  className="h-12 w-12 sm:h-14 sm:w-14 text-gray-600"
                  title={brand.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
