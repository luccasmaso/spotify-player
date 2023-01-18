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

### ⚡️ Edge Cases
- [x] Keep tracks that are removed from the playlist available in the favorites page.
- [x] Preserve server's playlist tracks sorting even when new data comes in.
- [x] Handle unexpected playback errors.
- [x] Handle API network errors.
  
### 🏗️ Application structure
- `pages/` - Defines the application pages and routing (based on its file names).
- `gql/` - Output directory for generated GraphQL schema types (configured in `codegen.ts`).
- `lib/` - Defines React function components for rendering 'Tracks', 'Player', etc.
  - `./Apollo/` - Defines the Apollo client and cache configurations.
  - `./Components/` - Defines React function components for rendering 'Tracks', 'Player', etc.
  - `./Helpers/` - Defines common helper functions.
  - `./Icons/` - Defines a wrapper for the SVG icons dependency (bundled separetly within other node_modules during build - ~1.04kb gzipped)

### ❤️ 'Liked Tracks' Storage
I decided to store 'liked tracks' locally using the Apollo [Local-only fields](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies#storing-and-modifying-local-state-in-the-cache) approach. 

The file `client-schema.graphql` defines a client-side schema and introduces the `likedTracks` query type to write and query from. The `writeQuery` function allows writing data in a shape of a GraphQL query and the `useQuery` to hook subscription for data updates (e.g. when a track is liked).

### ✅ Testing

- `npm run cy:run:e2e` to run end-to-end tests
- `npm run cy:run:component` to run component tests
  
### ☁️ Running the app

- Clone this repo
- `npm install` to install all dependencies
- `npm run codegen` to generate GraphQL schema types
- `npm run dev` to start the local server

The app should now be up and running at http://localhost:3000 🚀

Reference: https://shotguntheapp.notion.site/Case-Study-Spotify-Player-7f8417391b9e43ba9f351870949a0559