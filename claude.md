# Food Insecurity App – Color & Design Template

This markdown file defines a color and design template for a food insecurity application focused on empathy, trust, dignity, and clarity.

---

## Core Color Palette

Aim for warm, appetizing accents on a calm, neutral base so the app feels supportive rather than commercial.

- **Primary background**: Soft off‑white  
  - HEX: `#F8F5F0`  
  - Usage: Main background surfaces, cards

- **Primary text**: Deep charcoal  
  - HEX: `#1F2933`  
  - Usage: Headlines, body text, icons

- **Primary accent (actions)**: Warm orange  
  - HEX: `#ED6E3A`  
  - Usage: Primary buttons, key highlights (e.g., “Find food”, main CTAs)

- **Secondary accent**: Calming green  
  - HEX: `#6C9E4F`  
  - Usage: Success states, “Open now”, availability badges

- **Supportive neutral**: Warm beige  
  - HEX: `#DBCDB5`  
  - Usage: Secondary sections, cards, subtle dividers

- **Error/alert**: Deep brick red  
  - HEX: `#A4330D`  
  - Usage: Errors, critical alerts, destructive actions

> **Accessibility note:** Ensure at least a 4.5:1 contrast ratio for text on backgrounds (WCAG AA). Use a contrast checker during implementation.

---

## Color Usage & Hierarchy

Map colors to specific interface elements for consistency and clear hierarchy.

### Primary Actions

- Elements: “Get help now”, “Locate pantry”, “Find free food near me”
- Style:
  - Background: `#ED6E3A`
  - Text: `#FFFFFF`
  - Shape: Large rounded corners (e.g., 8–12 px radius)
  - State:
    - Hover/Pressed (web): Slightly darker orange
    - Disabled: Reduce opacity and use a muted tone

### Secondary Actions

- Elements: “Learn more”, filters, secondary navigation actions
- Style:
  - Background: `#F8F5F0`
  - Border: `#1F2933` (1–2 px)
  - Text: `#1F2933`
  - Shape: Rounded corners consistent with primary buttons

### Status Indicators

- “Open / Available”:
  - Pill background: `#E9F4E0` (light green tint)
  - Text: `#6C9E4F`
- “Closing soon”:
  - Outline pill with border: `#ED6E3A`
  - Text: `#ED6E3A`
- “Full / Not available”:
  - Pill background: `#F9E0DB` (light red tint)
  - Text: `#A4330D`

### Navigation Bar (Mobile)

- Background: `#FFFFFF` or `#F8F5F0`
- Icons and labels: `#1F2933`
- Selected item:
  - Icon: Same color but bold or filled
  - Indicator: Small orange dot or underline (`#ED6E3A`)

### Cards for Resources

Used for food banks, meal sites, community fridges, etc.

- Card background: `#F8F5F0` or `#DBCDB5`
- Card border: Very subtle `#DBCDB5` or no border with shadow
- Title text: `#1F2933`, medium weight
- Body text: `#1F2933`, regular weight
- Tags (pills) for metadata:
  - Free: Green outline pill (`#6C9E4F`)
  - IDs required: Neutral pill (`#DBCDB5`, text `#1F2933`)
  - Kids meals: Orange pill (`#ED6E3A`, text `#FFFFFF`)

---

## Typography & Spacing

Keep typography simple, friendly, and highly legible, especially for users under stress or with lower literacy.

### Typefaces

- Recommended style: Humanist sans‑serif
- Examples: Inter, Nunito, Source Sans, or similar open‑source fonts
- Font weights: Regular (400), Medium (500), Semi‑bold (600) for emphasis

### Sizes (Mobile Guidelines)

- H1 (page titles): 22–24 px, semi‑bold, `#1F2933`
- H2 (section titles): 18–20 px, medium, `#1F2933`
- Body text: 14–16 px, regular, `#1F2933`
- Labels, helper text: 12–14 px, regular, `#1F2933`

### Spacing

- Line height: 1.4–1.6 for body text
- Tap targets: Minimum 44 px height
- Layout:
  - Use generous padding (16–24 px) around main content
  - Maintain consistent vertical rhythm (8‑pt or 4‑pt grid)

---

## Accessibility & Inclusivity

Design for users with low vision, older adults, and people in crisis.

### Contrast & Readability

- Minimum contrast:
  - Normal text: 4.5:1
  - Large text (18 px+): 3:1
- Do not place text directly on complex images; use overlays or solid backgrounds.
- Avoid large blocks of all‑caps text.

### Color as Meaning

- Never rely on color alone to convey meaning.
- Pair color with:
  - Icons (checkmark for available, cross for unavailable)
  - Short labels (“Open”, “Full”, “Limited”)
  - Patterns (e.g., dashed borders for “temporary” or “pop‑up” events)

### States & Feedback

- Focus states (keyboard or selection):
  - 2 px outline in `#ED6E3A` around focused element
- Error states:
  - Text: `#A4330D`
  - Supporting icon: Warning or error icon
  - Message: Clear, specific, and actionable
- Success states:
  - Accent: `#6C9E4F`
  - Use subtle background tints instead of full‑screen color changes

### Language & Content

- Use clear, simple language:
  - Example: “Free food near you” instead of technical or bureaucratic terms.
- Provide short explanations:
  - “What to bring”, “Who can get food here”, “When to go”, “How to get there”
- Support multiple languages where relevant to your community.

---

## Screen‑Level Design Patterns

These patterns keep the experience calm, empowering, and action‑oriented.

### Home Screen

- Background: `#F8F5F0`
- Top area:
  - Short reassurance text: “You are not alone. Let’s find free food near you.”
- Primary call‑to‑action:
  - Large button: “Find free food near me”
  - Background: `#ED6E3A`, text `#FFFFFF`
- Secondary quick actions:
  - Beige cards (`#DBCDB5`) with charcoal text for:
    - “Delivery options”
    - “Benefits info”
    - “Community support”

### Resource List View

- Layout: Vertical list of cards
- Each card includes:
  - Name of location (H2 style)
  - Distance and time (body text)
  - Status pill (Open/Closed/Full)
  - Short descriptor (e.g., “Groceries”, “Hot meals”, “Kids friendly”)

### Resource Detail View

- Use off‑white or beige background
- Sections:
  - Basics: Name, address, map snippet
  - Schedule: Day/time in clear table or list
  - Requirements: Callouts for:
    - Green highlight: “No ID required”
    - Orange: “Limited quantities”
    - Red: “Today only”
  - Instructions: How to line up, any documentation, COVID‑related notes (if applicable)

### Education / Help Section

- Background: `#DBCDB5` or `#F8F5F0`
- Use green and orange for simple iconography:
  - “How to apply for benefits”
  - “Know your rights”
  - “Support lines and hotlines”
- Use short, scannable cards with plain language and bullet points.

---

## Component Summary Table

| Component          | Background   | Text        | Border/Accent | Notes                                        |
|--------------------|-------------|-------------|---------------|---------------------------------------------|
| Page background    | `#F8F5F0`   | N/A         | N/A           | Default app background                      |
| Primary button     | `#ED6E3A`   | `#FFFFFF`   | N/A           | Main CTAs like “Find food”                  |
| Secondary button   | `#F8F5F0`   | `#1F2933`   | `#1F2933`     | Outlined, lower‑priority actions            |
| Card background    | `#F8F5F0`   | `#1F2933`   | Optional tint | Resource cards, info panels                 |
| Status “Open” pill | `#E9F4E0`   | `#6C9E4F`   | N/A           | Availability indicators                      |
| Error message      | `#F9E0DB`   | `#A4330D`   | N/A           | Error banners or inline messages           |
| Navbar             | `#FFFFFF`   | `#1F2933`   | `#ED6E3A` sel | Bottom or top navigation                    |

---

## Implementation Notes

- Store these colors as design tokens (e.g., `color-bg-primary`, `color-text-primary`, `color-accent-primary`) in your design system.
- Create light and dark state variants only if you can maintain contrast and emotional tone.
- Run regular usability tests with your target users (especially those who have experienced food insecurity) to validate clarity, tone, and comfort.

