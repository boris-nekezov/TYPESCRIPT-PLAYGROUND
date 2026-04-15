# TYPESCRIPT-PLAYGROUND

## СЕСИЯ №1 — TypeScript Play

Документацията е заредена — използваме **TypeScript v5.8/5.9** (последна стабилна).

---

## 📋 TypeScript Playground — Учебен план

### 🟢 ФАЗА 1 — Основи (Сесии 1–4)

| Сесия | Тема |
| ----- | ---- |
| 1 | `type` vs `interface` — кога кое, extending, merging |
| 2 | Union types, Intersection types, Literal types |
| 3 | Type narrowing — `typeof`, `instanceof`, `in` operator |
| 4 | Function overloads, Optional/Default params, Rest params |

### 🟡 ФАЗА 2 — Generics (Сесии 5–8)

| Сесия | Тема |
| ----- | ---- |
| 5 | Generics основи — `<T>`, constraints с `extends` |
| 6 | Generic functions и generic interfaces |
| 7 | Utility types — `Partial`, `Required`, `Pick`, `Omit`, `Record` |
| 8 | Utility types — `ReturnType`, `Parameters`, `Awaited`, `NonNullable` |

### 🔴 ФАЗА 3 — Advanced (Сесии 9–13)

| Сесия | Тема |
| ----- | ---- |
| 9  | Discriminated unions + exhaustive checks |
| 10 | Mapped types — `{ [K in keyof T]: ... }` |
| 11 | Conditional types — `T extends U ? X : Y` |
| 12 | `infer` keyword |
| 13 | Template literal types |

### 🔥 ФАЗА 4 — Комбинирани сесии (Сесии 14–16)

| Сесия | Тема |
| ----- | ---- |
| 14 | Generics + Conditional types + `infer` заедно |
| 15 | Discriminated unions + Mapped types + Utility types |
| 16 | Real-world задача — изгради type-safe API layer |

---

## 🚀 Сесия 1 — `type` vs `interface`

### Теория (3 минути)

- **`interface`** — за описване на обекти и класове. Поддържа **declaration merging**.
- **`type`** — по-гъвкав, поддържа **unions**, **intersections**, **primitives**. Не се merge-ва.

```ts
// interface — може да се extend-ва и merge-ва
interface User {
  id: number;
  name: string;
}
interface User {
  email: string; // ✅ merge-ва се автоматично
}

// type — по-гъвкав
type ID = string | number;              // unions — само с type!
type Admin = User & { role: 'admin' };  // intersection
```

> **Практическо правило:** `interface` за публичен API/props, `type` за всичко останало.

---

## 🎯 Задача за Playground

Отвори TypeScript Playground и направи следното.

**Задача:** Имаш система за блог. Трябва да дефинираш типовете:

1. `interface Post` с полета: `id`, `title`, `content`, `createdAt: Date`
2. Extend-ни `Post` с нов `interface DraftPost` — добави поле `isDraft: true`
3. Създай `type PostPreview` — само `id` и `title` от `Post` (без copy-paste — ползвай `Pick`)
4. Създай `type PostID = string | number`
5. Направи функция `getPostById(id: PostID): Post` — само сигнатурата, имплементацията `throw new Error('not implemented')`

**Бонус:** Опитай да добавиш ново поле към `Post` чрез declaration merging.

---

> 📌 Когато свършиш — пусни кода тук и минаваме към **Сесия 2**! 💪
>
> **ТУК ПРЕНАСЯМ — ПРОСТО НЕ ПИШИ НИЩО, ИЗЧАКАЙ ДА ТИ ДАМ ОТГОВОРИ ЗА СЕСИЯ 1.**
> В ТОЗИ ЧАТ ЩЕ БЪДЕ СЕСИЯ 1.
