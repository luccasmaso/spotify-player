# Case Study: Spotify Player


### ✏️ Functional requirements
- As a user, I want to display a playlist and its tracks (only one available)
- As a user, I want to play/pause a track
- As a user, I want to skip a track
- As a user, I want to add/remove a track to/from my Liked Songs
    - *the favorites list must be displayed on a separate page `/favorites` for example*
    - *a button with favorites count should appear on the navigation bar*
    - *you do not need to persist those preferences server-side for now, just store it locally (but persistently)*
    - *if I change page and I am playing a song, the current song should not stop and keep playing*
  
### ⚙️ Non-functional requirements
- Responsive UI;
- Cache-first rendering approach;
- React / GraphQL / Typescript / Next.js.

### 👀 Edge Cases
- [x] Keep tracks that are removed from the playlist available in the favorites page.
- [x] Preserve server's playlist tracks sorting even when new data comes in.
- [x] Handle unexpected playback errors.
- [x] Handle API network errors.
- [ ] Migrate cached data when API schema changes.
- [ ] Handle rendering optimization for a playlist that has hundreds of thousands of tracks (using infinite scroll, pagination, etc).
  
### 🏗️ Application structure
- `pages/` - Defines the application pages and routing (based on its file names).
  - `./_initializer` - Initializes dependencies (Database, Repositories, Use cases, etc).
- `lib/Data/` - Defines Repository Implementations & Data Sources. 
- `lib/Domain/` - Defines Entities, Use cases & Repository Interfaces (no dependencies with other layers).
- `lib/Presentation/` - Defines UI Views using ViewModels (which execute Use cases).
  - `./Hooks/` - Defines stateful logic to be reused between components (manages local state and use cases in the same place).

### ✅ Testing

- `npm run cy:run:e2e` to run end-to-end tests
- `npm run cy:run:component` to run component tests
  
### ☁️ Running the app

- Clone this repo
- `npm install` to install all dependencies
- `npm run dev` to start the local server

The app should now be up and running at http://localhost:3000 🚀

Reference: https://shotguntheapp.notion.site/Case-Study-Spotify-Player-7f8417391b9e43ba9f351870949a0559