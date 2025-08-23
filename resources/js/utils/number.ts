export type SupportedCurrency = 'COP' | 'USD' | 'EUR';

export const currencyToLocale = (currency: SupportedCurrency): string => {
  switch (currency) {
    case 'COP':
      return 'es-CO';
    case 'USD':
      return 'en-US';
    case 'EUR':
      return 'es-ES';
    default:
      return 'es-CO';
  }
};

// Formats a numeric string (e.g. "12345.67") to a localized currency-like number with thousand separators.
export const formatCurrency = (value: string | number | null | undefined, currency: SupportedCurrency = 'COP'): string => {
  if (value === null || value === undefined || value === '') return '';
  const locale = currencyToLocale(currency);
  const num = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, ''));
  if (Number.isNaN(num)) return '';
  // Use max 2 fraction digits
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(num);
};

// Parses a user-typed localized number into a canonical dot-decimal string (e.g. "12.34").
export const parseCurrency = (input: string, currency: SupportedCurrency = 'COP'): string => {
  if (!input) return '';
  const locale = currencyToLocale(currency);

  // Identify locale-specific separators
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const group = parts.find(p => p.type === 'group')?.value ?? ',';
  const decimal = parts.find(p => p.type === 'decimal')?.value ?? '.';

  // Remove spaces and currency signs
  let raw = input.replace(/\s/g, '');
  // Remove group separators
  raw = raw.split(group).join('');
  // Replace locale decimal with '.'
  raw = raw.split(decimal).join('.');
  // Keep only digits and a single dot and optional leading '-'
  raw = raw.replace(/(?!^-)[^0-9.]/g, '');
  const firstDot = raw.indexOf('.');
  if (firstDot !== -1) {
    // remove any additional dots
    raw = raw.slice(0, firstDot + 1) + raw.slice(firstDot + 1).replace(/\./g, '');
  }

  return raw;
};
