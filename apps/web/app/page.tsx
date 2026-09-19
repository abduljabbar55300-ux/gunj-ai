"use client";

import { FormEvent, useMemo, useRef, useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

const starterMessages: Message[] = [
  { role: 'assistant', content: 'Good morning, Abdul. I am Hub, your personal AI assistant. How can I help you today?' },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [language, setLanguage] = useState<'English' | 'Urdu'>('English');
  const [tasks, setTasks] = useState([
    { title: 'Review project roadmap', time: 'Today · 10:00 AM', done: false },
    { title: 'Reply to client emails', time: 'Today · 2:00 PM', done: false },
    { title: 'Plan tomorrow', time: 'Today · 6:00 PM', done: false },
  ]);
  const [notes, setNotes] = useState(['Product launch ideas', 'Remember to call the team']);
  const composer = useRef<HTMLInputElement>(null);

  const completed = tasks.filter((task) => task.done).length;
  const progress = useMemo(() => Math.round((completed / tasks.length) * 100), [completed, tasks.length]);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setMessages((current) => [...current, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.reply || data.error || 'I could not complete that request.' }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'I am having trouble connecting right now. Please try again.' }]);
    } finally {
      setBusy(false);
      composer.current?.focus();
    }
  }

  function startVoice() {
    const Recognition = (window as typeof window & { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition || (window as typeof window & { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (!Recognition) return alert('Voice input is not supported in this browser.');
    const recognition = new Recognition();
    recognition.lang = language === 'Urdu' ? 'ur-PK' : 'en-US';
    recognition.onresult = (event) => setInput(event.results[0][0].transcript);
    recognition.start();
  }

  function addTask() { setTasks((current) => [...current, { title: 'New task', time: 'Today', done: false }]); }
  function addNote() { setNotes((current) => [...current, 'New personal note']); }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">✦</div><div><strong>Hub</strong><span>Personal AI</span></div></div>
        <nav className="nav-list">
          <a className="nav-item active" href="#assistant">◈ <span>Assistant</span></a>
          <a className="nav-item" href="#tasks">✓ <span>Tasks</span><b>{tasks.length - completed}</b></a>
          <a className="nav-item" href="#notes">▤ <span>Notes</span></a>
          <a className="nav-item" href="#files">▱ <span>Files</span></a>
          <a className="nav-item" href="#settings">⚙ <span>Settings</span></a>
        </nav>
        <div className="sidebar-bottom"><div className="upgrade"><span className="sparkle">✦</span><strong>Unlock more with Hub Pro</strong><small>Advanced memory, web search and integrations.</small><button>Explore Pro</button></div><div className="profile"><div className="avatar">A</div><div><strong>Abdul Jabbar</strong><small>Free plan</small></div><span>•••</span></div></div>
      </aside>

      <section className="content">
        <header className="topbar"><div><div className="eyebrow">SATURDAY, SEPTEMBER 19, 2026</div><h1>Good morning, Abdul <span>✦</span></h1></div><div className="top-actions"><button className="icon-button">⌕</button><button className="icon-button">♧</button><select value={language} onChange={(event) => setLanguage(event.target.value as 'English' | 'Urdu')}><option>English</option><option>Urdu</option></select></div></header>

        <div className="dashboard-grid">
          <section id="assistant" className="panel assistant-panel"><div className="panel-heading"><div><h2>Assistant</h2><p>Your thoughts, organized.</p></div><span className="status"><i /> Online</span></div><div className="chat-window">{messages.map((message, index) => <div className={`message-row ${message.role}`} key={`${message.role}-${index}`}><div className={`message ${message.role}`}>{message.role === 'assistant' && <span className="message-icon">✦</span>}<span>{message.content}</span></div></div>)}{busy && <div className="message-row"><div className="message assistant"><span className="message-icon">✦</span><span className="typing">Hub is thinking...</span></div></div>}</div><form className="composer" onSubmit={sendMessage}><input ref={composer} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask Hub anything..." /><button type="button" onClick={startVoice} title="Voice input">♩</button><button className="send-button" type="submit" disabled={busy}>↑</button></form><div className="quick-prompts"><button onClick={() => setInput('Help me plan my day')}>Plan my day</button><button onClick={() => setInput('Summarize my tasks')}>Summarize tasks</button><button onClick={() => setInput('Give me a productivity tip')}>Productivity tip</button></div></section>

          <div className="right-column"><section id="tasks" className="panel compact-panel"><div className="panel-heading"><div><h2>Today&apos;s tasks</h2><p>{completed} of {tasks.length} completed</p></div><button className="add-button" onClick={addTask}>+</button></div><div className="progress"><span style={{ width: `${progress}%` }} /></div><div className="task-list">{tasks.map((task, index) => <label className={`task ${task.done ? 'done' : ''}`} key={`${task.title}-${index}`}><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, done: !item.done } : item))} /><span className="checkmark">✓</span><span><strong>{task.title}</strong><small>{task.time}</small></span></label>)}</div><button className="text-button" onClick={addTask}>+ Add task</button></section><section id="notes" className="panel compact-panel"><div className="panel-heading"><div><h2>Quick notes</h2><p>Capture what&apos;s on your mind.</p></div><button className="add-button" onClick={addNote}>+</button></div><div className="notes-list">{notes.map((note, index) => <div className="note" key={`${note}-${index}`}><span>▤</span><span>{note}</span><b>›</b></div>)}</div><button className="text-button" onClick={addNote}>View all notes <span>→</span></button></section></div>
        </div>
        <footer className="footer"><span>Hub is ready to help.</span><span><i /> All systems operational</span></footer>
      </section>
    </main>
  );
}
