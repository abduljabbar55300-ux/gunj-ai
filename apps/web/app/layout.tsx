import './globals.css';

export const metadata = {
  title: 'Hub — Personal AI Assistant',
  description: 'Your personal AI workspace for chat, tasks, notes, and research.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
