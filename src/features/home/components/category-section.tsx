import { Icon } from "@/components/ui/icon";

const CATEGORIES = [
  { label: "Cold & Flu", icon: "/icons/home/cat-cold-flu.svg" },
  { label: "Skin", icon: "/icons/home/cat-skin.svg" },
  { label: "Vitamins", icon: "/icons/home/cat-vitamins.svg" },
  { label: "Allergy", icon: "/icons/home/cat-allergy.svg" },
  { label: "Digestive Health", icon: "/icons/home/cat-digestive.svg" },
  { label: "Pain Relief", icon: "/icons/home/cat-pain.svg" },
  { label: "Allergy", icon: "/icons/home/cat-allergy.svg" },
];

export function CategorySection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h4-24 text-secondary-900">Shop By Category</h2>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {CATEGORIES.map((category, index) => (
          <button
            key={index}
            type="button"
            className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-2.5 transition-colors hover:bg-bg-app"
          >
            <Icon src={category.icon} size={20} />
            <span className="text-body-14 font-bold whitespace-nowrap text-secondary-900">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
