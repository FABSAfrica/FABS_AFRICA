import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { accentBorder, accentText } from "../../data/accents";

export default function UpdateCard({ item }) {
  return (
    <Link
      to={item.path}
      className={`group flex flex-col bg-white border border-line border-t-4 ${accentBorder[item.accent]} overflow-hidden h-full transition-colors hover:bg-paper`}
    >
      <div className="aspect-[16/10] overflow-hidden bg-paper">
        <img
          src="/media/placeholder.png"
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <span className={`text-xs font-semibold ${accentText[item.accent]}`}>{item.category}</span>
        <span className="text-xs text-ink-soft mt-1">{item.date}</span>
        <h3 className="font-display text-xl font-medium text-ink mt-3 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-ink-soft mt-3 leading-relaxed flex-1">{item.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink mt-5">
          Read more
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
