export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.04)_0%,transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-8 sm:px-10 sm:pt-10 lg:px-16">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.2em] text-black">
            LYNOW
          </span>
          <nav aria-label="Primary">
            <a
              href="#waitlist"
              className="text-sm font-medium text-black/60 transition-colors hover:text-black"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-16 sm:px-10 sm:pb-32 sm:pt-20 lg:px-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.25em] text-black/40 sm:mb-10">
            AI Lifestyle Planning
          </p>

          <h1 className="max-w-3xl text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-black sm:text-6xl sm:leading-[1.02] md:text-7xl lg:text-[5.25rem]">
            Today, be anyone.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/55 sm:mt-10 sm:text-xl sm:leading-relaxed md:max-w-2xl">
            AI-powered lifestyle planning that designs your perfect day around
            who you want to become.
          </p>

          <div className="mt-12 flex w-full flex-col items-center gap-4 sm:mt-14 sm:w-auto sm:flex-row sm:gap-5">
            <a
              id="waitlist"
              href="#waitlist"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition-all hover:bg-black/85 active:scale-[0.98] sm:w-auto sm:min-w-[160px]"
            >
              Join Waitlist
            </a>
            <a
              href="#learn-more"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-8 text-sm font-medium text-black transition-all hover:border-black/20 hover:bg-black/[0.02] active:scale-[0.98] sm:w-auto sm:min-w-[160px]"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
