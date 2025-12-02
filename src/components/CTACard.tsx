import { ArrowRight } from "lucide-react";

interface CTACardProps {
  href: string;
  label: string;
  title: string;
  description?: string;
  linkText: string;
  isExternal?: boolean;
}

const CTACard = ({ href, label, title, description, linkText, isExternal = false }: CTACardProps) => {
  const Component = isExternal ? "a" : "a";
  const additionalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      href={href}
      className="group block p-8 md:p-10 bg-card border-2 border-border rounded-2xl hover:-translate-y-2 hover:border-cta-orange hover:shadow-[0_12px_40px_rgba(247,147,26,0.15)] transition-all relative overflow-hidden"
      {...additionalProps}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-red to-cta-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      <div className="flex flex-col gap-2 md:gap-3">
        <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-cta-orange">
          {label}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-tight mb-1 md:mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-[15px] md:text-[17px] lg:text-[18px] text-muted-foreground leading-relaxed mb-3 md:mb-4">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-[13px] md:text-sm font-semibold text-foreground group-hover:text-cta-orange transition-colors">
          {linkText}
          <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Component>
  );
};

export default CTACard;
