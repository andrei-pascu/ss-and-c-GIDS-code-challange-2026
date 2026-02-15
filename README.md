# Bookmarker

A small Angular application for managing bookmarks, built using NgRx for state management and Angular Material for UI components.

The project demonstrates structured state management, separation of concerns, and testable architecture using modern Angular standalone APIs.

---

## 🚀 Tech Stack

- Angular 19 (Standalone Components)
- NgRx (Store, Effects, Entity, Selectors)
- Angular Material
- angular-in-memory-web-api (mock backend)
- Karma + Jasmine (unit testing)

---

## 🧠 Architecture Overview

This application follows a predictable unidirectional data flow:

Component → Action → Effect → API → Reducer → Selector → Component

### Key Design Choices

- **NgRx Store** for predictable state transitions  
- **NgRx Entity Adapter** for normalized state structure  
- **Effects** for handling async API interactions  
- **Selectors** for derived state (e.g. grouped bookmarks)  
- **Pure utility functions** for domain logic (e.g. date grouping)  
- Unit tests written for reducers, effects, selectors, services, and components  

While NgRx may be considered heavy for a small app, it was intentionally chosen to demonstrate scalable state management patterns and clean architectural boundaries.

---

## 🗂 State Structure

Bookmarks are stored in normalized form using NgRx Entity:

- `ids: string[]`
- `entities: { [id: string]: Bookmark }`
- `loading: boolean`
- `error: string | null`

Derived UI state (e.g. grouped by date) is handled through selectors.

---

## 🧪 Testing

Unit tests cover:

- Reducers (state transitions)
- Effects (async flows and error handling)
- Selectors (derived state logic)
- HTTP service layer
- Components (dispatch behavior and reactive flows)
- Utility functions (date grouping logic)

Run tests with:

```bash
ng test
