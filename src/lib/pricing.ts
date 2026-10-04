export const FREE_SHIPPING_THRESHOLD = 799;
export const SUBSCRIBE_DISCOUNT = 0.15;

export type Plan = 'once' | 'sub';

export function unitPrice(base: number, plan: Plan): number {
  return plan === 'sub' ? Math.round(base * (1 - SUBSCRIBE_DISCOUNT)) : base;
}
