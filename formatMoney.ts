import type {Money} from './cart';

export function formatMoney(money: Money | undefined): string {
  if (!money) {
    return '';
  }

  const value = Number(money.amount);
  if (Number.isNaN(value)) {
    return `${money.amount} ${money.currencyCode}`;
  }

  return `${money.currencyCode} ${value.toFixed(2)}`;
}

