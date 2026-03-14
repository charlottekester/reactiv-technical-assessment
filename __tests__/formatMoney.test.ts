import {formatMoney} from '../formatMoney';

describe('formatMoney', () => {
  it('formats valid numeric amount strings', () => {
    const m = {amount: '10.5', currencyCode: 'CAD'} as any;
    expect(formatMoney(m)).toBe('CAD 10.50');
  });

  it('returns empty string for undefined', () => {
    expect(formatMoney(undefined)).toBe('');
  });

  it('falls back to raw string for non-numeric amounts', () => {
    const m = {amount: 'unknown', currencyCode: 'CAD'} as any;
    expect(formatMoney(m)).toBe('unknown CAD');
  });
});
