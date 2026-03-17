'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Currency,
  currencies,
  detectCurrency,
  saveCurrencyPreference,
} from '@/lib/currencyUtils';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export default function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (currency: Currency) => {
    onCurrencyChange(currency);
    saveCurrencyPreference(currency);
    setIsOpen(false);
  };

  const selectedInfo = currencies[selectedCurrency];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#CBD5E1] rounded-lg hover:border-[#5B6CFF] transition-all duration-300 font-clash font-medium"
      >
        <span className="text-xl">{selectedInfo.flag}</span>
        <span className="text-[#1F2A44]">{selectedInfo.code}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#64748B] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 bg-white border-2 border-[#CBD5E1] rounded-lg shadow-xl z-50 min-w-[200px] overflow-hidden">
            {Object.values(currencies).map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleSelect(currency.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#E6EAF0] transition-colors duration-200 ${
                  selectedCurrency === currency.code
                    ? 'bg-[#A2D2FF]/20'
                    : ''
                }`}
              >
                <span className="text-xl">{currency.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-clash font-semibold text-[#1F2A44]">
                    {currency.code}
                  </div>
                  <div className="font-montserrat text-xs text-[#64748B]">{currency.name}</div>
                </div>
                {selectedCurrency === currency.code && (
                  <div className="w-2 h-2 bg-[#5B6CFF] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}