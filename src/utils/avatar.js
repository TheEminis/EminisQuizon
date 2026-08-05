// src/utils/avatar.js
// Generates a consistent initials + color "profile picture" for a user
// when they don't have an uploaded photo.

const AVATAR_COLORS = [
  "#4f46e5", "#8b5cf6", "#ec4899", "#f97316",
  "#10b981", "#06b6d4", "#f59e0b", "#ef4444",
];

export const getInitials = (name, email) => {
  const source = (name && name.trim()) || (email && email.trim()) || "?";
  const parts = source.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
};

export const getAvatarColor = (seed) => {
  const str = seed || "user";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};
