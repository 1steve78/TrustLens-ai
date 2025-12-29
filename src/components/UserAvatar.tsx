type Props = {
  name?: string | null;
  avatarUrl?: string | null;
};

export default function UserAvatar({ name, avatarUrl }: Props) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="w-9 h-9 rounded-full border border-white/10"
      />
    );
  }

  // fallback → generated avatar
  const seed = name || "user";
  const generatedAvatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;

  return (
    <img
      src={generatedAvatar}
      alt="User Avatar"
      className="w-9 h-9 rounded-full border border-white/10"
    />
  );
}
