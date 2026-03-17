export type Currency = 'USD' | 'NGN' | 'EUR' | 'GBP';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // Rate relative to USD
}

// Fixed exchange rates (update quarterly)
export const currencies: Record<Currency, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    rate: 1,
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    flag: '🇳🇬',
    rate: 1650,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    rate: 0.92,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    rate: 0.79,
  },
};

// Convert USD amount to target currency
export function convertCurrency(
  amountUSD: number,
  targetCurrency: Currency
): number {
  const rate = currencies[targetCurrency].rate;
  return Math.round(amountUSD * rate);
}

// Format price with currency symbol
export function formatPrice(amount: number, currency: Currency): string {
  const currencyInfo = currencies[currency];
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${currencyInfo.symbol}${formatted}`;
}

// Format price range
export function formatPriceRange(
  min: number,
  max: number,
  currency: Currency
): string {
  const convertedMin = convertCurrency(min, currency);
  const convertedMax = convertCurrency(max, currency);
  return `${formatPrice(convertedMin, currency)} - ${formatPrice(convertedMax, currency)}`;
}

// Detect currency from user location (simplified - can enhance with IP detection)
export function detectCurrency(): Currency {
  if (typeof window === 'undefined') return 'USD';

  // Try to get from localStorage first
  const saved = localStorage.getItem('preferred-currency');
  if (saved && currencies[saved as Currency]) {
    return saved as Currency;
  }

  // Detect from timezone/locale (basic detection)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  if (timezone.includes('Lagos') || timezone.includes('Africa')) {
    return 'NGN';
  }
  
  if (timezone.includes('London') || timezone.includes('Europe/London')) {
    return 'GBP';
  }
  
  if (
    timezone.includes('Europe') &&
    !timezone.includes('London')
  ) {
    return 'EUR';
  }

  return 'USD'; // Default
}

// Save currency preference
export function saveCurrencyPreference(currency: Currency): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-currency', currency);
  }
}