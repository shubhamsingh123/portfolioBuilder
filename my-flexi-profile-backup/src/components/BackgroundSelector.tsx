
import React from 'react';
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { backgroundOptions } from '@/lib/utils';

interface BackgroundSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-3">Section Background</Label>
      <RadioGroup 
        value={value} 
        onValueChange={onChange} 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {backgroundOptions.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem 
              value={option.url} 
              id={`bg-${option.id}`} 
              className="sr-only"
            />
            <Label 
              htmlFor={`bg-${option.id}`}
              className={`
                block w-full h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                ${value === option.url ? 'border-primary' : 'border-muted hover:border-primary/50'}
              `}
            >
              {option.url ? (
                <div className="w-full h-full relative">
                  <img 
                    src={option.url} 
                    alt={option.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{option.name}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">None</span>
                </div>
              )}
              {value === option.url && (
                <div className="absolute top-2 right-2 rounded-full bg-primary w-5 h-5 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BackgroundSelector;
