
import React from 'react';
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cardStyleOptions } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CardStyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CardStyleSelector: React.FC<CardStyleSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-3">Card Style</Label>
      <ScrollArea className="h-[400px] pr-4">
        <RadioGroup 
          value={value} 
          onValueChange={onChange} 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {cardStyleOptions.map((option) => (
            <div key={option.id} className="relative">
              <RadioGroupItem 
                value={option.id} 
                id={`card-${option.id}`} 
                className="sr-only"
              />
              <Label 
                htmlFor={`card-${option.id}`}
                className={`
                  block w-full cursor-pointer transition-all
                  ${value === option.id ? 'ring-2 ring-primary' : 'hover:opacity-80'}
                `}
              >
                <div className={`w-full h-24 rounded-lg flex items-center justify-center ${option.id !== 'default' ? getCardStylePreview(option.id) : 'border'}`}>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-xs font-medium">{option.name}</span>
                  </div>
                </div>
                
                {value === option.id && (
                  <div className="absolute top-2 right-2 rounded-full bg-primary w-5 h-5 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

// Helper function to generate card style previews
function getCardStylePreview(style: string) {
  switch(style) {
    case 'modern':
      return "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-md";
    case 'minimal':
      return "border border-dashed border-muted-foreground/30 bg-background/50 shadow-sm";
    case 'gradient':
      return "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-none";
    case 'flat':
      return "bg-blue-50 border-l-4 border-blue-400";
    case 'shadow':
      return "bg-white shadow-lg border border-gray-100";
    case 'rounded':
      return "bg-green-50 rounded-xl shadow border border-green-100";
    case 'neon':
      return "bg-black/80 border-2 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,255,255,0.5)]";
    case 'glass':
      return "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg";
    case 'outline':
      return "bg-transparent border-2 border-gray-300 shadow-inner";
    case 'soft':
      return "bg-blue-50/40 border border-blue-100 shadow-sm";
    case 'vibrant':
      return "bg-gradient-to-r from-orange-100 to-yellow-100 border-l-4 border-orange-400";
    case 'elegant':
      return "bg-slate-900 text-white border-l-4 border-amber-400 shadow-md";
    case 'playful':
      return "bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border border-pink-200 shadow-md";
    case 'minimal-dark':
      return "bg-gray-900 text-white border border-gray-800";
    case 'sunset':
      return "bg-gradient-to-r from-orange-200 to-red-200 border border-orange-300";
    case 'nature':
      return "bg-green-50 border-t-4 border-green-500 shadow-md";
    case 'ocean':
      return "bg-gradient-to-r from-blue-100 to-cyan-100 border-b-4 border-blue-400";
    case 'tech':
      return "bg-gray-100 border-l-2 border-gray-400 shadow";
    case 'retro':
      return "bg-amber-50 border-2 border-purple-300 shadow-md";
    case 'geometric':
      return "bg-gradient-to-br from-teal-50 to-cyan-50 border-r-4 border-teal-400";
    case 'futuristic':
      return "bg-gradient-to-r from-gray-100 to-gray-200 border-t-2 border-b-2 border-gray-300 shadow-lg";
    case 'vintage':
      return "bg-amber-50/70 border border-amber-200 shadow-inner";
    case 'cosmic':
      return "bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200 shadow-lg";
    default:
      return "border";
  }
}

export default CardStyleSelector;
