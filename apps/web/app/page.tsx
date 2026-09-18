import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 inline-flex rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
          Gunj AI
        </div>

        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          Your personal AI project manager.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Gunj AI helps you manage product work, software projects, notes, reminders, GitHub context,
          and daily execution in one secure workspace.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
            Launch dashboard
          </button>
          <button className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-white transition hover:border-slate-500">
            View workflows
          </button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            ['Project intelligence', 'Review repositories, bugs, tasks, and roadmap context instantly.'],
            ['Personal assistant', 'Reminders, notes, calendar, and daily planning help.'],
            ['Safe execution', 'Approvals before destructive or high-risk actions.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="mb-3 text-xl font-semibold">{title}</h2>
              <p className="text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
