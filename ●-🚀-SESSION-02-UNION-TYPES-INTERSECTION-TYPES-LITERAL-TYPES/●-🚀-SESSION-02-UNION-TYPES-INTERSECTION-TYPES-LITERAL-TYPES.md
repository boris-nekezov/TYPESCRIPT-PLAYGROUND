# 🚀 Сесия 2 — Union, Intersection, Literal Types

> Документация: **TypeScript v5.9.3** (заредена от Context7 MCP)
> Дата: 2026-04-15

---

## 📚 ЧАСТ 1 — Теория

### 1. Union types (`|`) — "ИЛИ"

Стойността може да е един **от** няколко типа.

```ts
type ID = string | number;
type Status = 'idle' | 'loading' | 'success' | 'error'; // literal union
```

### 2. Intersection types (`&`) — "И"

Стойността трябва да е **всички** типове едновременно. Merge-ва properties.

```ts
type WithId = { id: string };
type WithName = { name: string };
type User = WithId & WithName; // { id: string; name: string }
```

### 3. Literal types — точна стойност, не общ тип

```ts
type Direction = 'up' | 'down' | 'left' | 'right';
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
```

### ⚠️ Gotcha-та (от TS 5.9.3 source)

- `'a' & 'b'` = `never` (конфликт)
- `string & 'a'` = `'a'` (по-тесният печели)
- `(string | number) & ('a' | 10)` = `'a' | 10`
- `as const` "заключва" стойността като literal: `let s = 'hello' as const` → типът е `'hello'`, не `string`

> **Практическо правило:** literal unions вместо string константи, `&` когато комбинираш props/shape, `|` когато може да е едното ИЛИ другото.

---

## 🎯 ЧАСТ 2 — Задача за Playground

Имаш система за e-commerce поръчки.

1. Създай `type OrderStatus` като literal union с точно 4 стойности: `'pending'`, `'paid'`, `'shipped'`, `'delivered'`.
2. Създай `type PaymentMethod = 'card' | 'paypal' | 'crypto'`.
3. Създай два отделни type-а:
   - `type BaseOrder` с полета `id: string`, `total: number`, `status: OrderStatus`
   - `type OrderMeta` с полета `createdAt: Date`, `paymentMethod: PaymentMethod`
4. Комбинирай ги чрез **intersection** → `type Order = ...`.
5. Създай функция `updateStatus(order: Order, newStatus: OrderStatus): Order` — сигнатура + имплементация която връща нов object с новия status (не мутирай).
6. Опитай да викнеш `updateStatus(someOrder, 'cancelled')` — TS трябва да даде грешка. Копирай съобщението.

### Бонус

- Създай `type DiscountedOrder = Order & { discount: number }` и напиши функция `applyDiscount(order: Order, discount: number): DiscountedOrder`.
- Експериментирай: какво се случва ако направиш `type Broken = OrderStatus & PaymentMethod`? Защо? (Hint: `never`)

---

## ✍️ ЧАСТ 3 — Моето решение (първи опит)

```ts
type OrderStatus = 'pending' | 'paid' | 'snipped' | 'delivered';

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

const updateStatus = (order: Order, newStatus: OrderStatus): Order => {
  throw new Error('Order was canceled!');
};

const someOrder = {
  id: '1',
  total: 1,
  status: 'snipped',
  createdAt: '2026-04-15',
  paymentMethod: 'card',
};

updateStatus(someOrder, 'canceled');

// Bonus
type DiscountedOrder = Order & { discount: number };

const applyDiscount = (order: Order, discount: number): DiscountedOrder => {
  throw new Error('Some error');
};

type Broken = OrderStatus & PaymentMethod;
```

### Моят въпрос към Claude:

> "За `never` не мога да се сетя, обясни."

---

## 💡 ЧАСТ 4 — Обяснение на `never`

### Какво е `never`?

`never` = тип който **няма нито една възможна стойност**. Празно множество.

### Мислене чрез множества

Представи си типовете като множества от стойности:

```ts
type A = 'pending' | 'paid' | 'shipped' | 'delivered'; // множество от 4 стойности
type B = 'card' | 'paypal' | 'crypto';                  // множество от 3 стойности
```

- **Union** (`|`) = **обединение** на множества → всички елементи от двете
- **Intersection** (`&`) = **пресичане** → само елементи които са в **двете**

Когато пресечеш `A & B` — питаш "коя стойност е едновременно в A **И** в B?". Нито една! `'pending'` не е в B, `'card'` не е в A. Пресичането е празно → `never`.

### Примери

```ts
type X1 = 'a' & 'b';                  // never — нищо не е и 'a' и 'b' едновременно
type X2 = string & number;             // never — стойност не може да е и string и number
type X3 = string & 'hello';            // 'hello' — всички 'hello' са string, пресичането е 'hello'
type X4 = (string | number) & string;  // string — махат се нещата които не са string
```

**Правило:** `A & B` = `never` когато няма стойност която удовлетворява и двете.

### Къде го виждаш в реална работа

1. **Exhaustive check в `switch`** (това ще го видиш в Сесия 9 — discriminated unions):

```ts
const assertNever = (value: never): never => {
  throw new Error(`Unhandled: ${value}`);
};
```

Ако добавиш нов status и забравиш `case` за него, TS ще крещи че нещо не е `never`.

2. **Функция която никога не връща** — `throw` винаги или infinite loop:

```ts
const fail = (message: string): never => {
  throw new Error(message);
};
```

3. **Невъзможни комбинации** — точно като `OrderStatus & PaymentMethod`.

---

## 🐛 ЧАСТ 5 — Преглед на моето решение — 3 неща за поправка

### 🐛 1. Typo — `'snipped'` вместо `'shipped'`

```ts
type OrderStatus = 'pending' | 'paid' | 'snipped' | 'delivered';
//                                     ^^^^^^^^^ трябва да е 'shipped'
```

Това е точно случаят който TS трябва да те пази от — но тъй като самият тип има грешката, целият код вече е "заразен".

### 🐛 2. `updateStatus` трябва да връща нов object, не да `throw`-ва

Задача 5 искаше **имплементация** която връща нов Order с новия status (immutable update):

```ts
const updateStatus = (order: Order, newStatus: OrderStatus): Order => ({
  ...order,
  status: newStatus,
});
```

`throw new Error` е good за задача 5 от Сесия 1 (само сигнатура), но тук искахме истинска логика.

### 🐛 3. `someOrder` не е typed — TS не хваща грешките

```ts
const someOrder = {  // ❌ типът се inferва като generic object
  createdAt: '2026-04-15', // string, а трябва Date!
  ...
};
```

Добави експлицитна анотация и TS веднага ще хване и двата проблема:

```ts
const someOrder: Order = {
  id: '1',
  total: 1,
  status: 'shipped',           // ако напишеш 'snipped' → грешка
  createdAt: new Date('2026-04-15'), // string → Date грешка
  paymentMethod: 'card',
};
```

### Грешката от задача 6 (която трябваше да копираш)

Когато `someOrder` е `Order` и викнеш:

```ts
updateStatus(someOrder, 'canceled');
```

TS казва:
```
Argument of type '"canceled"' is not assignable to parameter of type 'OrderStatus'.
```

Това е силата на literal unions — невалидни стойности са **compile-time** грешка, не runtime bug.

---

## 🔥 ЧАСТ 6 — Бонус дискусия: Константи вместо чисти стрингове

### Моят въпрос:

> "Още нещо което мисля че трябва да добавиш понеже имаше typo `type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered'` — виждал съм как един колега ги правеше в enum като константи, все едно, и ги слагаше вместо чисти стрингове за да избегне typo. Какво мислиш?"

### Отговор — отличен въпрос, важна тема

Имаш **3 подхода**. Всеки с pros/cons и кое се ползва в модерни кодбейзове.

### Подход 1: Чисти literal unions (това което имах първоначално)

```ts
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

const order = { status: 'shipped' as OrderStatus };
updateStatus(order, 'delivered');
```

✅ **Pros:** Нула runtime cost, прост, TS хваща typo-та на мястото на използване (ако типът е правилно анотиран).

❌ **Cons:** Пишеш стринга на **много места** — ако смениш `'shipped'` на `'in-transit'`, трябва да направиш find/replace. Typo-та в **самата дефиниция** (като моя `'snipped'`) не се хващат от нищо.

### Подход 2: TypeScript `enum` (това което колегата ползва)

```ts
enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

updateStatus(order, OrderStatus.Shipped); // autocomplete ✅
```

✅ **Pros:** Autocomplete, single source of truth, рефакторинг с IDE rename.

❌ **Cons — и те са сериозни:**

1. **Runtime cost** — `enum` компилира до JS обект, увеличава bundle size.
2. **Не са tree-shakeable** добре (освен `const enum`, но той има свои проблеми).
3. **Nominal typing issues** — numeric `enum`-и приемат произволни числа за assignment.
4. **TypeScript team препоръчва да НЕ се ползват в нов код.** Node.js с `--experimental-strip-types` и `tsc --erasableSyntaxOnly` **чупят** enum-ите (те не са само типове).
5. В React/Vite проекти — чужди на екосистемата, рядко се виждат.

👉 **Защо колегата ги ползва:** идва от C#/Java background или стар TS код. Не е грешно, просто вече не е модерният стандарт.

### Подход 3: `as const` object pattern (⭐ модерният стандарт)

```ts
const OrderStatus = {
  Pending: 'pending',
  Paid: 'paid',
  Shipped: 'shipped',
  Delivered: 'delivered',
} as const;

type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
// → 'pending' | 'paid' | 'shipped' | 'delivered'

updateStatus(order, OrderStatus.Shipped); // autocomplete ✅, typo-proof ✅
updateStatus(order, 'shipped');           // също работи — типът е същият literal union
```

### Защо това е най-доброто

| Feature | Literal union | `enum` | `as const` object |
|---|---|---|---|
| Autocomplete при ползване | ❌ (но IDE често предлага) | ✅ | ✅ |
| Single source of truth | ❌ | ✅ | ✅ |
| Zero runtime cost | ✅ | ❌ | ⚠️ (малък object) |
| Tree-shakeable | ✅ | ❌ | ✅ |
| Работи с `erasableSyntaxOnly` | ✅ | ❌ | ✅ |
| Typo-proof при писане | ❌ | ✅ | ✅ |
| Съвместим с JSON/API responses | ✅ | ⚠️ | ✅ |
| TS team препоръка | ✅ | ❌ | ✅ |

### Как работи магията

```ts
as const // "заключва" стойностите като literal types, не string
typeof OrderStatus // { readonly Pending: 'pending', readonly Paid: 'paid', ... }
keyof typeof OrderStatus // 'Pending' | 'Paid' | 'Shipped' | 'Delivered'
(typeof OrderStatus)[keyof typeof OrderStatus] // 'pending' | 'paid' | 'shipped' | 'delivered'
```

Така получаваш **и** обект за runtime (с autocomplete), **и** type-а като union от литералите — автоматично синхронизирани.

### Препоръка за моя код

```ts
export const ORDER_STATUS = {
  Pending: 'pending',
  Paid: 'paid',
  Shipped: 'shipped',
  Delivered: 'delivered',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PAYMENT_METHOD = {
  Card: 'card',
  Paypal: 'paypal',
  Crypto: 'crypto',
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

// Използване — typo-proof:
updateStatus(someOrder, ORDER_STATUS.Shipped);
// Ако напишеш ORDER_STATUS.Snipped → TS грешка веднага.
```

### Кога да ползваш кое

- **API response типове (статусите идват като stringове от backend)** → чист literal union. Бекендът праща `'shipped'`, не `OrderStatus.Shipped`.
- **Константи които ползваш в UI/логика** → `as const` object, за да имаш autocomplete.
- **Библиотеки/публичен API** → literal union (по-прост, без runtime).
- **`enum`** → само ако си принуден от legacy код или библиотека.

### Какво да кажа на колегата

Не е грешно това което прави, но `as const` е по-модерно, по-малко bundle, и TS team официално препоръчва да се избягват `enum`-и в нов код. (Matt Pocock и Theo са писали много по темата.)

---

## ✅ ЧАСТ 7 — Финален чист код

```ts
const ORDER_STATUS = {
  Pending: 'pending',
  Paid: 'paid',
  Shipped: 'shipped',
  Delivered: 'delivered',
} as const;

type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

const PAYMENT_METHOD = {
  Card: 'card',
  Paypal: 'paypal',
  Crypto: 'crypto',
} as const;

type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

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

const updateStatus = (order: Order, newStatus: OrderStatus): Order => ({
  ...order,
  status: newStatus,
});

const someOrder: Order = {
  id: '1',
  total: 1,
  status: ORDER_STATUS.Shipped,
  createdAt: new Date('2026-04-15'),
  paymentMethod: PAYMENT_METHOD.Card,
};

// Bonus
type DiscountedOrder = Order & { discount: number };

const applyDiscount = (order: Order, discount: number): DiscountedOrder => ({
  ...order,
  discount,
});

type Broken = OrderStatus & PaymentMethod;
// never — нищо не е едновременно status И payment method
```

---

## 📝 ЧАСТ 8 — Ключови изводи

1. **Union** (`|`) = обединение — стойността е един от типовете.
2. **Intersection** (`&`) = пресичане — стойността удовлетворява всички типове.
3. **Literal types** дават compile-time проверки срещу невалидни стрингове/числа.
4. **`never`** = празно множество; се появява при невъзможни intersection-и и exhaustive checks.
5. За константи в нов код → **`as const` object pattern**, не `enum`.
6. Винаги анотирай обекти с техния type за да получиш предимствата на TS.
7. Immutable updates — връщай нов object със spread (`...order, status: newStatus`), не мутирай.

---

## 🗣️ ЧАСТ 9 — Резюме на нашата комуникация

### Моите въпроси и разсъждения през сесията:

1. **Старт:** "Анализира ли `CLAUDE.md`?" — исках да потвърдя че Claude е прочел всички мои инструкции и план преди да започне.

2. **Преход:** "сесия едно я минах вече дай със сесия 2" — минал съм Сесия 1 в друг чат, готов за Сесия 2.

3. **Решение:** Предадох първия си опит с 3 проблема (typo `snipped`, `throw` вместо immutable update, `someOrder` без type анотация). Признах: **"За never не мога да се сетя обясни"** — беше ми трудно да разбера защо intersection на два несъвместими union-а дава `never`.

4. **Дълбок въпрос:** "Виждал съм как един колега ги правеше в enum като константи... за да избегне typo. Какво мислиш?" — исках да разбера дали моето решение с чисти stringове е оптимално, или има по-добър pattern.

### Какво научих:

- Типовете са **множества** — Union = обединение, Intersection = пресичане.
- `never` не е "грешка" — той е коректен резултат от празно множество.
- Моят typo `'snipped'` е идеален пример **защо** `as const` object pattern е по-добро от чист literal union — срещу typo-та в самата дефиниция.
- `enum` не е модерен избор — TS team препоръчва да се избягва.
- Винаги анотирай тествани обекти (`const someOrder: Order = ...`), иначе TS не може да ти помогне.

### Следваща сесия

**Сесия 3 — Type narrowing:** `typeof`, `instanceof`, `in` operator, truthiness narrowing, equality narrowing.
