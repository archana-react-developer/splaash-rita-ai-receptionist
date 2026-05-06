import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Users,
  CalendarDays,
  DollarSign,
  Palette,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import './styles.css';

const SPLAASH_URL =
  import.meta.env.VITE_SPLAASH_URL || 'https://splaash.net/';

const initialLeads = [
  {
    id: 1,
    parent: 'Priya',
    email: 'priya@example.com',
    childAge: 6,
    classTime: 'Sat 1:00 PM',
    status: 'Follow-up',
    notes: 'Asked about supplies and beginner level.',
  },
  {
    id: 2,
    parent: 'Meera',
    email: 'meera@example.com',
    childAge: 10,
    classTime: 'Sat 2:30 PM',
    status: 'Paid',
    notes: 'Needs Zoom link after PayPal subscription.',
  },
];

function App() {
  const [leads, setLeads] = useState(initialLeads);

  const [form, setForm] = useState({
    parent: '',
    email: '',
    childAge: '',
    notes: '',
  });

  const recommendedClass = useMemo(() => {
    const age = Number(form.childAge);

    if (!age) return 'Enter age to recommend a class';
    if (age >= 5 && age <= 7) {
      return 'Recommended: Saturday 1:00–2:00 PM PST';
    }
    if (age >= 8 && age <= 12) {
      return 'Recommended: Saturday 2:30–3:30 PM PST';
    }

    return 'Please contact Splaash for the best class fit';
  }, [form.childAge]);

  function addLead(event) {
    event.preventDefault();

    const age = Number(form.childAge);

    const classTime =
      age >= 5 && age <= 7
        ? 'Sat 1:00 PM'
        : age >= 8 && age <= 12
          ? 'Sat 2:30 PM'
          : 'Needs review';

    const newLead = {
      id: Date.now(),
      parent: form.parent || 'New Parent',
      email: form.email || 'Not provided',
      childAge: form.childAge || '—',
      classTime,
      status: 'New',
      notes: form.notes || 'Website inquiry',
    };

    setLeads((items) => [newLead, ...items]);

    setForm({
      parent: '',
      email: '',
      childAge: '',
      notes: '',
    });
  }

  return (
    <main>
      <section className="hero">
        <nav>
          <div className="brand">
            <span>S</span>Splaash Art Studio
          </div>

          <a href="#register">Register</a>
        </nav>

        <div className="heroGrid">
          <div>
            <p className="eyebrow">
              <Sparkles size={16} />
              Rita AI Voice Receptionist Demo
            </p>

            <h1>
              Online Saturday art classes for kids,
              guided by Rita.
            </h1>

            <p className="subtext">
              Parents can talk to Rita, learn about Splaash
              classes, choose the right age group, and get
              guided to Splaash.net to register for the $40
              monthly pass.
            </p>

            <div className="actions">
              <a className="primary" href="/rita" target='_blank' rel="noreferrer">
                <PhoneCall size={18} />
                Talk to Rita
              </a>

              <a
                className="secondary"
                href={SPLAASH_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open Splaash.net
              </a>
            </div>
          </div>

          <div className="ritaCard">
            <div className="avatar">
              <PhoneCall size={34} />
            </div>

            <h2>Rita is ready</h2>

            <p>
              Click Talk to Rita to open a dedicated voice
              assistant page.
            </p>

            <div className="status idle">idle</div>

            <div className="transcript">
              Rita can answer questions about schedules,
              registration, pricing, Zoom classes, supplies,
              and cancellation.
            </div>
          </div>
        </div>
      </section>

      <section className="cards">
        <InfoCard
          icon={<CalendarDays />}
          title="Saturdays only"
          text="Ages 5–7: 1–2 PM PST. Ages 8–12: 2:30–3:30 PM PST."
        />

        <InfoCard
          icon={<Users />}
          title="Small Zoom groups"
          text="Live online classes with up to 5 students for personalized attention."
        />

        <InfoCard
          icon={<DollarSign />}
          title="$40 monthly pass"
          text="Includes 4 live Zoom classes. Renews through PayPal until canceled."
        />

        <InfoCard
          icon={<Palette />}
          title="SF-inspired art"
          text="Kids draw San Francisco landmarks, tourist places, and fun seasonal themes."
        />
      </section>

      <section id="register" className="split">
        <div className="panel">
          <h2>Parent registration lead form</h2>

          <p>
            Use this as your simple website form. Rita can
            also collect these fields during calls.
          </p>

          <form onSubmit={addLead}>
            <label>
              Parent name
              <input
                value={form.parent}
                onChange={(event) =>
                  setForm({
                    ...form,
                    parent: event.target.value,
                  })
                }
                placeholder="Parent name"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    email: event.target.value,
                  })
                }
                placeholder="parent@email.com"
              />
            </label>

            <label>
              Child age
              <input
                type="number"
                min="1"
                max="18"
                value={form.childAge}
                onChange={(event) =>
                  setForm({
                    ...form,
                    childAge: event.target.value,
                  })
                }
                placeholder="6"
              />
            </label>

            <div className="recommendation">
              <CheckCircle2 size={18} />
              {recommendedClass}
            </div>

            <label>
              Notes
              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm({
                    ...form,
                    notes: event.target.value,
                  })
                }
                placeholder="Questions about class, supplies, Zoom link..."
              />
            </label>

            <button className="primary button" type="submit">
              Add inquiry
            </button>
          </form>
        </div>

        <div className="panel dashboard">
          <h2>Owner dashboard</h2>

          <p>
            Track Rita calls, parent inquiries, payment status,
            and follow-ups.
          </p>

          <div className="metrics">
            <Metric
              label="New leads"
              value={
                leads.filter((lead) => lead.status === 'New')
                  .length
              }
            />

            <Metric
              label="Paid"
              value={
                leads.filter((lead) => lead.status === 'Paid')
                  .length
              }
            />

            <Metric
              label="Follow-up"
              value={
                leads.filter(
                  (lead) => lead.status === 'Follow-up'
                ).length
              }
            />
          </div>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Parent</th>
                  <th>Age</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Rita notes</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      {lead.parent}
                      <br />
                      <small>{lead.email}</small>
                    </td>
                    <td>{lead.childAge}</td>
                    <td>{lead.classTime}</td>
                    <td>
                      <span className="badge">
                        {lead.status}
                      </span>
                    </td>
                    <td>{lead.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <article className="info">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default App;