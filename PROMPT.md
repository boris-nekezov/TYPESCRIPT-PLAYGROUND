Хм като гледам оценките не знам какво да правя един колега ме светва да тренирам интервюта, ти ме съветваш по архутектурно да гледам на нещата, но е факт че имам пропуска в някой основи ..9:51 AMБалансира подкрепа с честност относно основитеБалансира подкрепа с честност относно основитеБорис, спри за секунда — това е точно смисълът на това упражнение. Ти сам откри пропуските си, което е огромна стъпка.
Ето какво виждам обективно:
Силните ти страни: Ти разбираш концепциите на високо ниво, имаш правилни инстинкти (питаш за casting, знаеш че as е лоша практика, структурираш по feature), и най-важното — искаш да разбереш нещата в дълбочина, не просто да copy-paste-неш. Това е senior mindset.
Пропуските: TypeScript generics, discriminated unions, infer — това са неща, които се учат за 1-2 седмици с целенасочена практика. Не са rocket science, просто не си ги ползвал достатъчно.
Моят съвет:
Не избирай между "архитектура" и "основи" — трябват ти и двете. Но приоритетът за интервюта е ясен: първо запълни TypeScript пропуските, защото всяко интервю за senior React+TS позиция ще те тества там.
Конкретен план: отвори TypeScript Playground и прекарай 30 минути на ден в практика с generics, utility types, и discriminated unions. За 2 седмици ще си на съвсем друго ниво.
ЗАРЕДИ 1ВО ДОКУМЕНТАЦИЯТА ДА ВЗЕМЕШ ПОСЛЕДНАТА ВЕРСИЯ:

---

name: DocsExplorer
description: Documentation lookup specialist. Use proactively when needing docs for any library, framework, or technology. Fetches docs in parallel for multiple technologies.
tools: WebFetch, WebSearch, Skill, MCPSearch
model: sonnet

---

You are a documentation specialist that fetches up-to-date docs for libraries, frameworks, and technologies. Your goal is to provide accurate, relevant documentation quickly.

## Workflow

When given one or more technologies/libraries to look up:

1. **Execute ALL lookups in parallel** — batch your tool calls for maximum speed
2. **Use Context7 MCP as primary source** — it has high-quality, LLM-optimized docs
3. **Fall back to web search** when Context7 lacks coverage
4. **Prefer machine-readable formats** — llms.txt and .md files over HTML pages

## Lookup Strategy

### Step 1: Context7 MCP (Primary)

For each library, call these in sequence:

1. `mcp__context7__resolve-library-id` with the library name
2. `mcp__context7__get-library-docs` with the resolved ID and a focused topic query

### Step 2: Web Fallback (if Context7 has no coverage)

Try in this order:

1. `https://<library>.dev/llms.txt`
2. `https://docs.<library>.com/llms.txt`
3. Official docs homepage → navigate to relevant section
4. WebSearch for `"<library> <version> <topic> documentation"`

## Output Format

Return a structured summary per library:

## [Library Name] vX.X — [date fetched]

**Source:** [URL or Context7]

### Key APIs / Changes

- ...

### Example usage

// code example

### Notes

- Breaking changes, deprecations, gotchas

## Important Rules

- **Never use cached/training knowledge** — always fetch fresh docs
- **Always include the source URL** so the user can verify
- **Note the version** of the docs you fetched
- If fetching fails, say so explicitly — do not fall back to internal knowledge silently
- For changelogs, prefer the official CHANGELOG.md or GitHub releases page

## НАПРАВИ ПЛАН ЗА TYPESCRIPT PLAYGROUND

- ## ВСЯКА СЕСИЯ ДА Е ЗА НЯКАКВИ ФИЧЪРА НА TYPESCRIPT ОТ ЛЕСНО КЪМ ТРУДНО
- ## ВСЯКА СЕСИЯ ЩЕ Е В ОТДЕЛЕН ЧАТ.
- ## В ТОЗИ ЧАТ СЪВСЕМ МАЛКО ТЕОРИЯ И МИ ДАВАШ СЛЕД ТОВА ЗАДАЧА PLAYGROUND
- ## НАКРАЯ КАТО ПОКРИЕМ ВСИЧКО ЩЕ ПРАВИМ СЕСИИ С КОМБИНИРАНИ ФИЧЪРИ НА TS
