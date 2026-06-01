export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start max-sm:py-20 max-sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 max-sm:text-2xl">
            Welcome to AgentClinic
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-sm:text-base max-sm:leading-7">
            A clinic for evaluating and improving AI agents
          </p>
        </div>
      </main>
    </div>
  );
}
