export default function PageTitle({ children }: React.PropsWithChildren<{}>) {
  return (
    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-300">
      {children}
    </h1>
  );
}