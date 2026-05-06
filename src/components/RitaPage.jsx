import React, { useEffect, useState } from 'react';
import { Mic, MicOff, AlertTriangle } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

function RitaPage() {
  const [client] = useState(() => new RetellWebClient());
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [callId, setCallId] = useState('');

  useEffect(() => {
    client.on('call_started', () => setStatus('live'));
    client.on('call_ended', () => setStatus('ended'));
    client.on('agent_start_talking', () => setStatus('rita-speaking'));
    client.on('agent_stop_talking', () => setStatus('listening'));

    client.on('error', (err) => {
      console.error('Retell error:', err);
      setError(err?.message || 'Retell call error');
      setStatus('error');
    });
  }, [client]);

  async function startCall(event) {
    event.preventDefault();

    setError('');
    setStatus('connecting');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/retell/create-web-call`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not create Retell call');
      }

      setCallId(data.call_id || '');

      await client.startCall({
        accessToken: data.access_token,
        sampleRate: 24000,
      });

      setStatus('connected');
    } catch (err) {
      console.error('Start call error:', err);
      setError(err.message || 'Something went wrong');
      setStatus('error');
    }
  }

  function stopCall(event) {
    event.preventDefault();
    client.stopCall();
    setStatus('ended');
  }

  return (
    <main className="ritaPage">
      <section className="hero">
        <div className="ritaCard">
          <div className="avatar">
            <Mic size={34} />
          </div>

            <h1
              style={{
                textAlign: 'center',
                marginTop: '16px',
              }}
            >
              Talk to Rita
            </h1>
          <p>Voice receptionist for Splaash parents.</p>

          <div className={`status ${status}`}>
            {status}
          </div>

          {callId && <small>Call ID: {callId}</small>}

          {error && (
            <div className="error">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <div className="actions center">
            <button
              type="button"
              className="primary button"
              onClick={startCall}
              disabled={
                status === 'connecting' ||
                status === 'live' ||
                status === 'listening' ||
                status === 'rita-speaking'
              }
            >
              <Mic size={18} /> Start Talking
            </button>

            <button
              type="button"
              className="secondary button"
              onClick={stopCall}
            >
              <MicOff size={18} /> Stop
            </button>
          </div>

          <p className="hint">
            Try: “My child is 6. How do I register?”
          </p>
        </div>
      </section>
    </main>
  );
}

export default RitaPage;