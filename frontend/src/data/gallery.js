// ============================================================================
//  SPORTILY — GALLERY IMAGES
//  ---------------------------------------------------------------------------
//  HOW TO ADD A NEW PHOTO (no other file needs to change):
//    1. Add an object to the GALLERY array below:
//         { src: "<image url or /gallery/your-file.jpg>", title: "Caption",
//           category: "Football" }
//       - `src`  : a full https URL, OR a local file placed in
//                  /app/frontend/public/gallery/  then referenced as
//                  "/gallery/your-file.jpg"
//       - `title`: short caption shown on hover / in the lightbox
//       - `category`: one of the CATEGORIES below (used by the filter).
//         Add a new category to CATEGORIES if you need one.
//    2. Save. The Gallery page updates automatically.
//
//  ⬇⬇ ADD NEW IMAGES DIRECTLY BELOW THIS LINE ⬇⬇
// ============================================================================

export const CATEGORIES = [
  "All",
  "Football",
  "Tennis",
  "Cricket",
  "NBA",
  "Olympics",
  "Festival",
  "Travel",
];

export const GALLERY = [
  // --- Football ---
  { src: "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBmYW5zJTIwbmlnaHR8ZW58MHx8fHwxNzgzODk5NjEzfDA&ixlib=rb-4.1.0&q=85", title: "Matchnight, full house", category: "Football" },
  { src: "https://images.unsplash.com/photo-1526232636376-53d03f24f092?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHBsYXllcnMlMjBjZWxlYnJhdGluZyUyMGdvYWx8ZW58MHx8fHwxNzg1MzQ2MjU0fDA&ixlib=rb-4.1.0&q=85", title: "The celebration", category: "Football" },
  { src: "https://images.unsplash.com/photo-1752681304960-bd4e018a04bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHw0fHxmb290YmFsbCUyMHBsYXllcnMlMjBjZWxlYnJhdGluZyUyMGdvYWx8ZW58MHx8fHwxNzg1MzQ2MjU0fDA&ixlib=rb-4.1.0&q=85", title: "Team huddle", category: "Football" },

  // --- Tennis ---
  { src: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBncmFuZCUyMHNsYW0lMjBjb3VydCUyMG1hdGNofGVufDB8fHx8MTc4Mzg5OTYxM3ww&ixlib=rb-4.1.0&q=85", title: "Clay-court serve", category: "Tennis" },
  { src: "https://images.unsplash.com/photo-1545151414-8a948e1ea54f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHx0ZW5uaXMlMjBncmFuZCUyMHNsYW0lMjBjb3VydCUyMG1hdGNofGVufDB8fHx8MTc4Mzg5OTYxM3ww&ixlib=rb-4.1.0&q=85", title: "Overhead, match point", category: "Tennis" },

  // --- Cricket ---
  { src: "https://images.unsplash.com/photo-1730739463889-34c7279277a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxjcmlja2V0JTIwc3RhZGl1bSUyMG1hdGNoJTIwY3Jvd2R8ZW58MHx8fHwxNzgzODk5NjEzfDA&ixlib=rb-4.1.0&q=85", title: "IPL under lights", category: "Cricket" },

  // --- NBA ---
  { src: "https://images.unsplash.com/photo-1626003573503-2e088d82c647?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwTkJBJTIwYXJlbmElMjBnYW1lfGVufDB8fHx8MTc4Mzg5OTYxM3ww&ixlib=rb-4.1.0&q=85", title: "Arena night", category: "NBA" },
  { src: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwyfHxiYXNrZXRiYWxsJTIwc2xhbSUyMGR1bmslMjBhY3Rpb258ZW58MHx8fHwxNzg1MzQ2MjU0fDA&ixlib=rb-4.1.0&q=85", title: "The dunk", category: "NBA" },

  // --- Olympics ---
  { src: "https://images.unsplash.com/photo-1644280773490-368740ef1589?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxvbHltcGljJTIwc3RhZGl1bSUyMGF0aGxldGljc3xlbnwwfHx8fDE3ODM4OTk2MTN8MA&ixlib=rb-4.1.0&q=85", title: "Olympic arena", category: "Olympics" },

  // --- Festival ---
  { src: "https://images.unsplash.com/photo-1762503673365-2de429eeb667?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2QlMjBsaWdodHMlMjB0b21vcnJvd2xhbmR8ZW58MHx8fHwxNzgzODk5NjEzfDA&ixlib=rb-4.1.0&q=85", title: "Mainstage pyro", category: "Festival" },
  { src: "https://images.unsplash.com/photo-1762503647788-470d6ca6188c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2QlMjBsaWdodHMlMjB0b21vcnJvd2xhbmR8ZW58MHx8fHwxNzgzODk5NjEzfDA&ixlib=rb-4.1.0&q=85", title: "Tomorrowland lights", category: "Festival" },

  // --- Travel ---
  { src: "https://images.unsplash.com/photo-1620756634852-2190ad694c8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxnb2xkZW4lMjB0cm9waHklMjBjaGFtcGlvbnMlMjBjZWxlYnJhdGlvbiUyMGNvbmZldHRpfGVufDB8fHx8MTc4NTM0NjI1NHww&ixlib=rb-4.1.0&q=85", title: "Lift the cup", category: "Travel" },
  { src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGxpZmVzdHlsZXxlbnwwfHx8fDE3ODM1MDIyMjJ8MA&ixlib=rb-4.1.0&q=85", title: "The stay", category: "Travel" },
  { src: "https://images.unsplash.com/photo-1543797414-a0c3ad076f7c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMHNreSUyMGJyaWdodCUyMHRyYXZlbHxlbnwwfHx8fDE3ODM5MDEwMzR8MA&ixlib=rb-4.1.0&q=85", title: "In the air", category: "Travel" },

  // ⬇⬇ ADD YOUR NEXT PHOTO HERE — copy the line below, uncomment, and edit ⬇⬇
  // { src: "/gallery/my-new-photo.jpg", title: "Caption here", category: "Football" },
];
