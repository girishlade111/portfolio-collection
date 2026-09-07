---
name: design-system-freebuff-cli
description: Implementation-ready design system guidance for Freebuff CLI documentation site.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Freebuff CLI — Design System

## Context and Goals

Freebuff CLI is a free, terminal-based coding agent alternative to Claude Code, Codex, and Cursor. The documentation site must feel fast, developer-first, and trustworthy — reflecting the product itself. Every UI decision prioritizes readability, keyboard accessibility, and implementation clarity.

**Design intent:** A minimal, high-contrast, green-accented developer documentation interface that communicates reliability and zero-cost access.

---

## Design Tokens and Foundations

### Typography

| Token | Value |
|-------|-------|
| `font.family.primary` | Manrope |
| `font.family.stack` | Manrope, Inter, Inter Fallback, system-ui, arial, sans-serif |
| `font.weight.base` | 300 |
| `font.lineHeight.base` | 24px |

**Scale**

| Token | Value |
|-------|-------|
| `font.size.xs` | 12px |
| `font.size.sm` | 13px |
| `font.size.md` | 14px |
| `font.size.lg` | 16px |
| `font.size.xl` | 17px |
| `font.size.2xl` | 30px |
| `font.size.3xl` | 56px |
| `font.size.4xl` | 58px |

### Color

| Token | Value | Usage |
|-------|-------|-------|
| `color.text.primary` | `#ffffff` | Body text, headings |
| `color.text.secondary` | `#54a967` | Links, success states, accent highlights |
| `color.surface.base` | `#000000` | Page background |
| `color.border.default` | `#3f4146` | Standard borders, dividers |
| `color.border.muted` | `#2c7a40` | Subtle borders, hover indicators |

### Spacing

| Token | Value |
|-------|-------|
| `space.1` | 2px |
| `space.2` | 6px |
| `space.3` | 8px |
| `space.4` | 10px |
| `space.5` | 12px |
| `space.6` | 16px |
| `space.7` | 20px |
| `space.8` | 24px |

### Radius and Motion

| Token | Value |
|-------|-------|
| `radius.xs` | 10px |
| `motion.duration.instant` | 150ms |
| `motion.duration.fast` | 200ms |

---

## Component-Level Rules

### 1. Link (`color.text.secondary = #54a967`)

Known page density: ~18 links per page.

**Anatomy:** Inline text with `color.text.secondary` + underline on hover.

**States**

| State | Style |
|-------|-------|
| default | `color.text.secondary`, no underline, `font.weight.base=300` |
| hover | underline, `color.text.secondary` |
| focus-visible | `outline: 2px solid #54a967`, `outline-offset: 2px` |
| active | `opacity: 0.8` |
| visited | `color.text.secondary` (no change — use bold weight if needed for distinction) |
| disabled | `opacity: 0.4`, no pointer events |

**Keyboard behavior:** Enter activates. Focus must be visible via `:focus-visible`.

**Content rules:** Link text must describe the destination. Prohibit "click here" or "read more."

**Responsive:** Touch target minimum `44x44px` on viewports < 768px.

**Edge cases:**
- Wrapping links must not break mid-word; use `overflow-wrap: break-word` sparingly.
- External links must include `target="_blank"` and `rel="noopener noreferrer"`.

---

### 2. Button

Known page density: ~12 buttons per page.

**Anatomy:** Text label `font.size.md=14px`, `font.weight.base=300`, optional icon, container with `radius.xs=10px`.

**Variants**

| Variant | Default bg | Default text | Hover bg | Border |
|---------|-----------|-------------|----------|--------|
| primary | `#2c7a40` | `#ffffff` | `color.border.muted` as bg | none |
| secondary | transparent | `color.text.primary` | `color.border.default` at 20% opacity | `1px solid color.border.default` |
| ghost | transparent | `color.text.secondary` | `color.text.secondary` at 10% opacity on bg | none |

**States (all variants)**

| State | Behavior |
|-------|----------|
| default | variant-specific bg + text |
| hover | `motion.duration.instant=150ms` transition |
| focus-visible | `outline: 2px solid #54a967`, `outline-offset: 2px` |
| active | `transform: scale(0.98)`, `motion.duration.instant` |
| disabled | `opacity: 0.4`, `cursor: not-allowed`, no hover effects |
| loading | Show `aria-busy="true"`, replace icon with spinner, disable pointer events |

**Keyboard:** Enter or Space activates.

**Content:** Max 3 words. Use sentence case. Prohibit all-caps labels.

**Responsive:** Full-width on viewports < 480px. Touch target `44x44px` minimum.

**Edge cases:**
- Icon-only buttons must have `aria-label`.
- Buttons inside text blocks must not break line-height rhythm; use `display: inline-flex` with `align-items: center`.

---

### 3. Navigation

Known page density: ~3 navigation elements per page (main nav, sidebar, footer).

**Anatomy:** Horizontal or vertical list of links/buttons with active indicator color `color.text.secondary`.

**States**

| State | Style |
|-------|-------|
| default | `color.text.primary` at 70% opacity |
| hover | `color.text.primary` at 100% |
| active / current | `color.text.secondary` with a left border (sidebar) or underline (top nav) of `2px solid #54a967` |
| focus-visible | `outline: 2px solid #54a967`, `outline-offset: 2px` |

**Keyboard:** Tab navigates items. Arrow keys for nested menus (Enter to expand).

**Responsive:**
- Top nav collapses to hamburger at < 768px.
- Sidebar collapses to drawer overlay at < 1024px.

**Edge cases:**
- Long labels must truncate with `text-overflow: ellipsis` at `max-width: 200px`.
- Active item must be announced to screen readers via `aria-current="page"`.

---

### 4. List

Known page density: ~1 list structure per page.

**Anatomy:** `<ul>` or `<ol>` with `space.2=6px` between items. Nested lists indent `space.6=16px`.

**Content rules:**
- Each item must be a complete sentence or a noun phrase — never a fragment.
- Code terms within items use inline `<code>` styling.

**Responsive:** Lists must not overflow horizontally on small viewports. Use `word-break: break-word` for long inline code.

**Edge cases:**
- Empty list must not render a visible marker. Hide with `display: none` when `:empty`.
- Ordered list on multi-step instructions must restart numbering per section.

---

### 5. Code Block

**Anatomy:** Monospace rendering on `color.surface.base` with a `1px solid color.border.default` border and `radius.xs=10px`. Top bar shows language label at `font.size.xs=12px` and a copy button.

**States (copy button)**

| State | Behavior |
|-------|----------|
| default | Ghost variant, text "Copy" |
| hover | `color.border.muted` border |
| clicked | Text changes to "Copied" for 2s, `color.text.secondary` |
| focus-visible | Standard outline |

**Keyboard:** Focus moves into code block via Tab. Copy button is Tab-accessible.

**Responsive:** Horizontal scroll on overflow. Max height `400px` with internal scroll for very long blocks.

**Edge cases:** Line numbers at `font.size.xs=12px` in `color.border.default` — togglable via a setting.

---

## Accessibility Requirements

| Criteria | Pass Check |
|----------|-----------|
| All text meets 4.5:1 contrast ratio against `#000000` | Verify white text (21:1) and green `#54a967` (3.3:1 with bg — must be used at `font.size.xl` or larger, or not used as body text) |
| All interactive elements have visible `:focus-visible` outline | Inspect each focus ring — width `2px`, offset `2px`, color `#54a967` |
| Skip-to-content link is first Tab stop | Visible on focus, triggers `#main-content` |
| All images have meaningful `alt` text | Lint check |
| Interactive elements have `aria-disabled` when disabled (not just CSS opacity) | DOM inspection |
| Navigation uses `<nav>` landmark and `aria-current="page"` on active item | Screen reader test |
| Copy buttons announce "Copied" to screen readers via `aria-live="polite"` | Screen reader test |

**Note:** `#54a967` on `#000000` yields ~3.3:1 contrast. This token must only be used for:
- Accent text at `font.size.xl` (17px) or larger
- Borders and decorative elements
- Interactive elements (links, buttons) where additional hover/focus affordances exist it must never be used for body text below 17px.

---

## Content and Tone Standards

| Principle | Example ✓ | Example ✗ |
|-----------|-----------|-----------|
| Direct commands | "Install Freebuff CLI" | "You can install Freebuff CLI by running the following command" |
| Minimal punctuation | "Run `freebuff init` to start" | "Run `freebuff init` to start." (periods only at end of multi-sentence paragraphs) |
| Code-first | "Then run `freebuff deploy`" | "The next step is to deploy your project using the deploy command" |
| Scannable structure | Headings + code blocks + bullet lists | Dense paragraphs |
| Consistent terminology | "agent" always refers to the AI coding agent; "terminal" always refers to the host shell | Switching between "assistant", "AI", "bot" |

---

## Anti-Patterns and Prohibited Implementations

| Prohibited | Why | Replacement |
|------------|-----|-------------|
| Raw hex values in code | Breaks token system | Use semantic CSS custom properties |
| Hiding focus outlines | WCAG 2.2 failure | Use `:focus-visible` with visible ring |
| Low-contrast green text (< 17px) | Fails 4.5:1 AA | Use `color.text.primary` for small text |
| Custom checkbox/radio without accessible names | Screen reader inaccessible | Use native elements or proper `aria` |
| `title` attribute as sole label | Not reliable across AT | Use visible label or `aria-label` |
| Scroll-jacking or custom scrollbars | Hurts readability and AT | Browser default scrollbar |
| Animated transitions > 200ms | Feels sluggish | `motion.duration.instant` (150ms) or `fast` (200ms) |

---

## QA Checklist

- [ ] All tokens used are from the semantic set — no raw values
- [ ] Every interactive element has visible `:focus-visible` ring
- [ ] Link text describes destination — no "click here"
- [ ] Button labels ≤ 3 words, sentence case
- [ ] Navigation marks `aria-current="page"` on active item
- [ ] Code blocks have accessible copy buttons with `aria-live`
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] `#54a967` only on text ≥ 17px or decorative/interactive elements
- [ ] No animations exceed `motion.duration.fast` (200ms)
- [ ] Skip-to-content link present and functional
- [ ] Page title, meta description, and `lang` attribute set
- [ ] Responsive: sidebar collapses ≤ 1024px, top nav collapses ≤ 768px

<!-- TYPEUI_SH_MANAGED_END -->
