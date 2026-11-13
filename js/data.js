// Stale threshold: reports older than this many minutes are marked stale
const STALE_MINUTES = 30;

// Helper: returns a Date that is `n` minutes in the past
function minutesAgo(n) {
  return new Date(Date.now() - n * 60 * 1000).toISOString();
}

const labs = [
  {
    id: 1,
    name: "Lab B-204",
    building: "Block B",
    capacity: 40,
    occupied: 32,
    accessibleSeats: 2,
    equipment: ["GPU", "Printer"],
    updatedAt: minutesAgo(5)
  },
  {
    id: 2,
    name: "Lab B-210",
    building: "Block B",
    capacity: 30,
    occupied: 30,
    accessibleSeats: 1,
    equipment: ["Printer"],
    updatedAt: minutesAgo(12)
  },
  {
    id: 3,
    name: "Lab C-101",
    building: "Block C",
    capacity: 50,
    occupied: 18,
    accessibleSeats: 3,
    equipment: ["GPU", "Mac"],
    updatedAt: minutesAgo(45)
  },
  {
    id: 4,
    name: "Lab C-115",
    building: "Block C",
    capacity: 24,
    occupied: 10,
    accessibleSeats: 0,
    equipment: ["Mac"],
    updatedAt: minutesAgo(8)
  },
  {
    id: 5,
    name: "Lab D-302",
    building: "Block D",
    capacity: 36,
    occupied: 25,
    accessibleSeats: 2,
    equipment: ["GPU", "Printer", "Mac"],
    updatedAt: minutesAgo(20)
  },
  {
    id: 6,
    name: "Lab D-308",
    building: "Block D",
    capacity: 20,
    occupied: 4,
    accessibleSeats: 1,
    equipment: [],
    updatedAt: minutesAgo(90)
  }
];