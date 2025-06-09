
import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  link?: string;
  badges?: string[];
  className?: string;
  isLast?: boolean;
}

export function TimelineItem({
  title,
  subtitle,
  date,
  icon,
  content,
  link,
  badges,
  className,
  isLast = false
}: TimelineItemProps) {
  return (
    <div className={cn("relative pl-8 pb-8", isLast ? "" : "border-l border-primary/20", className)}>
      {/* Timeline dot & icon */}
      <div className="absolute -left-[12px] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary/30 bg-background flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse-subtle"></div>
        </div>
      </div>
      
      {/* Icon if present */}
      {icon && (
        <div className="absolute -left-[12px] -mt-1 flex items-center justify-center">
          <div className="w-6 h-6">{icon}</div>
        </div>
      )}
      
      <div className="glass-card p-5 ml-4 rounded-lg hover:shadow-md transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-primary">{subtitle}</p>}
          </div>
          
          {date && (
            <Badge variant="outline" className="bg-primary/10 text-primary whitespace-nowrap self-start">
              {date}
            </Badge>
          )}
        </div>
        
        {content && <div className="mt-2 text-muted-foreground">{content}</div>}
        
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
        
        {link && (
          <div className="mt-3">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 text-sm"
            >
              View more
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("relative mt-6", className)}>{children}</div>;
}
