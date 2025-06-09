
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  icon?: React.ReactNode;
  badges?: string[];
  headerClassName?: string;
  footerClassName?: string;
}

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  EnhancedCardProps
>(({ className, icon, badges, headerClassName, footerClassName, children, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg border-border/80",
      className
    )}
    {...props}
  >
    {children}
  </Card>
));
EnhancedCard.displayName = "EnhancedCard";

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardHeader> & { icon?: React.ReactNode; className?: string }
>(({ className, icon, children, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("flex flex-row justify-between items-start gap-3 border-b bg-muted/30", className)}
    {...props}
  >
    <div className="flex items-center gap-3">
      {icon && (
        <div className="flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <div>{children}</div>
    </div>
  </CardHeader>
));
EnhancedCardHeader.displayName = "EnhancedCardHeader";

const EnhancedCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof CardTitle>
>(({ className, ...props }, ref) => (
  <CardTitle
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
EnhancedCardTitle.displayName = "EnhancedCardTitle";

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof CardDescription>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1", className)}
    {...props}
  />
));
EnhancedCardDescription.displayName = "EnhancedCardDescription";

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardContent>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("p-6", className)} {...props} />
));
EnhancedCardContent.displayName = "EnhancedCardContent";

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardFooter> & { badges?: string[]; className?: string }
>(({ className, badges, children, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("flex flex-wrap gap-2 p-6 pt-0 mt-4 border-t border-border/50", className)}
    {...props}
  >
    {badges && badges.length > 0 && (
      <div className="flex flex-wrap gap-2 mr-auto">
        {badges.map((badge, index) => (
          <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {badge}
          </Badge>
        ))}
      </div>
    )}
    <div className="flex gap-2 ml-auto">{children}</div>
  </CardFooter>
));
EnhancedCardFooter.displayName = "EnhancedCardFooter";

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardFooter,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent
};
