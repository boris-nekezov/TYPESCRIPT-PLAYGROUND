# TypeScript Playground — Учебен план

> Сесия 1 — `type` vs `interface`

---

## 📋 Пълен учебен план

### 🟢 ФАЗА 1 — Основи (Сесии 1–4)

| Сесия | Тема                                                     |
| ----- | -------------------------------------------------------- |
| **1** | `type` vs `interface` — кога кое, extending, merging     |
| **2** | Union types, Intersection types, Literal types           |
| **3** | Type narrowing — `typeof`, `instanceof`, `in` operator   |
| **4** | Function overloads, Optional/Default params, Rest params |

### 🟡 ФАЗА 2 — Generics (Сесии 5–8)

| Сесия | Тема                                                                 |
| ----- | -------------------------------------------------------------------- |
| **5** | Generics основи — `<T>`, constraints с `extends`                     |
| **6** | Generic functions и generic interfaces                               |
| **7** | Utility types — `Partial`, `Required`, `Pick`, `Omit`, `Record`      |
| **8** | Utility types — `ReturnType`, `Parameters`, `Awaited`, `NonNullable` |

### 🔴 ФАЗА 3 — Advanced (Сесии 9–13)

| Сесия  | Тема                                      |
| ------ | ----------------------------------------- |
| **9**  | Discriminated unions + exhaustive checks  |
| **10** | Mapped types — `{ [K in keyof T]: ... }`  |
| **11** | Conditional types — `T extends U ? X : Y` |
| **12** | `infer` keyword                           |
| **13** | Template literal types                    |

### 🔥 ФАЗА 4 — Комбинирани сесии (Сесии 14–16)

| Сесия  | Тема                                                |
| ------ | --------------------------------------------------- |
| **14** | Generics + Conditional types + `infer` заедно       |
| **15** | Discriminated unions + Mapped types + Utility types |
| **16** | Real-world задача — изгради type-safe API layer     |

---

## Сесия 1 — `type` vs `interface`

### Теория

**`interface`** — за описване на обекти и класове. Поддържа **declaration merging**.

**`type`** — по-гъвкав, поддържа unions, intersections, primitives. **Не се merge-ва**.

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
type ID = string | number; // unions — само с type!
type Admin = User & { role: 'admin' }; // intersection
```

**Практическо правило:** `interface` за публичен API/props, `type` за всичко останало.

---

### 🎯 Задача за Playground

1. `interface Post` с полета: `id`, `title`, `content`, `createdAt: Date`
2. Extend-ни `Post` с нов `interface DraftPost` — добави поле `isDraft: true`
3. Създай `type PostPreview` — само `id` и `title` от `Post` (ползвай `Pick`)
4. Създай `type PostID = string | number`
5. Направи функция `getPostById(id: PostID): Post`
6. **Бонус:** Добави ново поле към `Post` чрез declaration merging

---

### Код на Борис (първи опит)

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

// declaration merging
interface PostNewField {
  newField: string;
}

interface DraftPost extends Post {
  isDraft: true;
}

type PostPreview = {
  id: number;
  title: Pick<Post, title extends keyof Post>;
};

type PostID = string | number;

const getPostById = (id: PostID): Post => {
  throw new Error('not implemented')
};

console.log(getPostById(1))
```

---

### ❌ Грешки и обяснения

#### Грешка 1 — Declaration Merging

```ts
// ❌ Грешно — това е нов интерфейс, НЕ merging
interface PostNewField {
  newField: string;
}

// ✅ Вярно — merging = СЪЩОТО ime, декларирано два пъти
interface Post {
  newField: string;
}
```

#### Грешка 2 — Pick синтаксис

```ts
// ❌ Грешно — Pick не се ползва вътре в object type
type PostPreview = {
  id: number;
  title: Pick<Post, title extends keyof Post>;
};

// ✅ Вярно — Pick работи на ниво целия type
type PostPreview = Pick<Post, 'id' | 'title'>;
```

---

### ✅ Коректен краен код

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

// Declaration merging — същото име
interface Post {
  newField: string;
}

interface DraftPost extends Post {
  isDraft: true;
}

// Pick на целия тип
type PostPreview = Pick<Post, 'id' | 'title'>;

type PostID = string | number;

const getPostById = (id: PostID): Post => {
  throw new Error('not implemented');
};
```

---

### Резюме на грешките

|                     | Код на Борис                 | Правилно                    |
| ------------------- | ---------------------------- | --------------------------- |
| Declaration Merging | нов интерфейс `PostNewField` | `interface Post` втори път  |
| Pick                | вътре в object type          | `type X = Pick<T, 'field'>` |
| DraftPost           | ✅                           | ✅                          |
| PostID              | ✅                           | ✅                          |
| getPostById         | ✅                           | ✅                          |
