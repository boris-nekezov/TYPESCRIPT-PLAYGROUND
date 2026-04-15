// type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';
// better approach with const object
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
} as const;

type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

//*********************************************************** */

// TODO DO LIKE ABOVE
type PaymentMethod = 'card' | 'paypal' | 'crypto';

type BaseOrder = {
  id: string;
  total: number;
  status: OrderStatus;
};

type OrderMeta = {
  createdAt: Date;
  paymentMethod: PaymentMethod;
};

type Order = BaseOrder & OrderMeta;

// throw new Error е good за задача 5 от Сесия 1 (само сигнатура), но тук искахме истинска логика.
// const updateStatus = (order: Order, newStatus: OrderStatus): Order => {
//   throw new Error('Order was canceled!');
// };
const updateStatus = (order: Order, newStatus: OrderStatus): Order => ({
  ...order,
  status: newStatus,
});

// const someOrder = {
//   id: '1',
//   total: 1,
//   status: 'shipped',
//   createdAt: '2026-04-15',
//   paymentMethod: 'card',
// };
const someOrder: Order = {
  id: '1',
  total: 1,
  status: 'shipped',
  createdAt: new Date('2026-04-15'),
  paymentMethod: 'card',
};

//! ТУК НАРОЧНО СЛАГАМЕ НЕСЪЩЕСВУВАЩА СТОЙНОСТ ЗА ДА ВИДИМ КАК РАБОТИ
updateStatus(someOrder, 'canceled');

// Bonus
type DiscountedOrder = Order & { discount: number };

const applyDiscount = (order: Order, discount: number): DiscountedOrder => {
  throw new Error('Some error');
};

type Broken = OrderStatus & PaymentMethod;

// Какво значи експлицитна анотация
// Какво значи
// Какво значи
// Какво значи
// Какво значи
// Какво значи
// Какво значи
// Какво значи
// Какво значи
// Какво значи
