import List from "./List";

export default function FeedPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="flex-1 flex flex-col overflow-auto xl:px-16">
      <header className="flex flex-col gap-2 py-8 px-4 md:px-8 xl:px-0">
        <h1 className="text-neutral-900 text-xl md:text-2xl font-semibold">
          {title}
        </h1>
        <p className="text-xs md:text-sm font-normal text-neutral-500">
          {description}
        </p>
      </header>
      <List />
    </main>
  );
}
