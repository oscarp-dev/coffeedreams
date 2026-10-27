import { discountPercent, formatPrice, type Priced } from "@/lib/courses";

// Previous price, struck through; renders nothing when there is no active offer.
export function WasPrice({ item, className = "" }: { item: Priced; className?: string }) {
  if (!item.listPriceCents) return null;
  return <s className={`font-normal decoration-1 ${className}`}><span className="sr-only">Antes </span>{formatPrice(item.listPriceCents)}<span className="sr-only">, ahora</span></s>;
}

export function OfferBadge({ item, className = "" }: { item: Priced; className?: string }) {
  const percent = discountPercent(item);
  if (!percent) return null;
  return <span className={`inline-block rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-bold tracking-[.08em] text-white ${className}`}>-{percent}%</span>;
}
