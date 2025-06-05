import React from 'react';
import { Link } from 'react-router-dom';

const backgroundImageUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80';

const features = [
  {
    title: 'Mental Health Assessment',
    description: 'Take assessments to understand your mental wellbeing.',
  },
  {
    title: 'Mood & Sleep Tracking',
    description: 'Track your mood and sleep patterns over time.',
  },
  {
    title: 'AI-Powered Chatbot',
    description: 'Get support from our intelligent chatbot.',
  },
  {
    title: 'Professional Connection',
    description: 'Connect with licensed mental health professionals.',
  },
];

const testimonials = [
  { quote: 'MindfulCheck helped me understand my anxiety patterns.', author: 'Sarah T.' },
  { quote: 'The mood tracking feature gave me insights into my habits.', author: 'Michael K.' },
  { quote: 'This platform provided a gentle first step toward help.', author: 'Jamie R.' },
];

function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.88) 60%, rgba(200,220,255,0.60) 100%)',
          padding: 0,
        }}
      >
        {/* HEADER */}
        <header style={{ textAlign: 'center', padding: '48px 0 24px 0' }}>
          <h1 style={{ fontSize: 36, margin: 0, color: '#295fa6', fontWeight: 700 }}>
            MindfulCheck
          </h1>
          <p style={{ color: '#4c5a68', marginTop: 10, fontSize: 18 }}>
            Simple tools for your mental wellbeing.
          </p>
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 18 }}>
            <Link
              to="/register"
              style={{
                background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)',
                color: '#fff',
                padding: '12px 32px',
                borderRadius: 30,
                fontWeight: 600,
                fontSize: 17,
                boxShadow: '0 2px 8px rgba(33,147,176,0.13)',
                textDecoration: 'none',
              }}
            >
              Get Started
            </Link>
            <Link
              to="/assessment"
              style={{
                background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
                color: '#333',
                padding: '12px 32px',
                borderRadius: 30,
                fontWeight: 600,
                fontSize: 17,
                boxShadow: '0 2px 8px rgba(255,210,0,0.10)',
                textDecoration: 'none',
              }}
            >
              Take Assessment
            </Link>
          </div>
        </header>

        {/* FEATURES: Two-column grid */}
        <section style={{ maxWidth: 900, margin: '40px auto 0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: 22, color: '#295fa6', marginBottom: 18, fontWeight: 600 }}>
            Features
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 18, boxShadow: '0 1px 6px rgba(33,147,176,0.06)' }}>
              <strong style={{ color: '#2193b0', fontSize: 16 }}>{features[0].title}</strong>
              <div style={{ color: '#4c5a68', marginTop: 6 }}>{features[0].description}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 18, boxShadow: '0 1px 6px rgba(33,147,176,0.06)' }}>
              <strong style={{ color: '#2193b0', fontSize: 16 }}>{features[1].title}</strong>
              <div style={{ color: '#4c5a68', marginTop: 6 }}>{features[1].description}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 18, boxShadow: '0 1px 6px rgba(33,147,176,0.06)' }}>
              <strong style={{ color: '#2193b0', fontSize: 16 }}>{features[2].title}</strong>
              <div style={{ color: '#4c5a68', marginTop: 6 }}>{features[2].description}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 18, boxShadow: '0 1px 6px rgba(33,147,176,0.06)' }}>
              <strong style={{ color: '#2193b0', fontSize: 16 }}>{features[3].title}</strong>
              <div style={{ color: '#4c5a68', marginTop: 6 }}>{features[3].description}</div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: visually distinct steps */}
        <section style={{ maxWidth: 900, margin: '48px auto 0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: 22, color: '#295fa6', marginBottom: 18, fontWeight: 600 }}>
            How It Works
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 28,
            justifyContent: 'center',
          }}>
            <div style={{
              flex: '1 1 220px',
              minWidth: 220,
              background: 'rgba(109,213,237,0.13)',
              borderRadius: 12,
              padding: 20,
              textAlign: 'center',
              boxShadow: '0 1px 6px rgba(33,147,176,0.07)',
            }}>
              <span role="img" aria-label="Assessment" style={{ fontSize: 32, display: 'block' }}>📝</span>
              <div style={{ fontWeight: 600, color: '#2193b0', margin: '10px 0 4px 0' }}>Step 1: Assessment</div>
              <div style={{ color: '#4c5a68', fontSize: 15 }}>Answer a few simple questions to get started.</div>
            </div>
            <div style={{
              flex: '1 1 220px',
              minWidth: 220,
              background: 'rgba(247,151,30,0.13)',
              borderRadius: 12,
              padding: 20,
              textAlign: 'center',
              boxShadow: '0 1px 6px rgba(33,147,176,0.07)',
            }}>
              <span role="img" aria-label="Insights" style={{ fontSize: 32, display: 'block' }}>💡</span>
              <div style={{ fontWeight: 600, color: '#f7971e', margin: '10px 0 4px 0' }}>Step 2: Insights</div>
              <div style={{ color: '#4c5a68', fontSize: 15 }}>Receive personalized feedback and recommendations.</div>
            </div>
            <div style={{
              flex: '1 1 220px',
              minWidth: 220,
              background: 'rgba(33,147,176,0.10)',
              borderRadius: 12,
              padding: 20,
              textAlign: 'center',
              boxShadow: '0 1px 6px rgba(33,147,176,0.07)',
            }}>
              <span role="img" aria-label="Track" style={{ fontSize: 32, display: 'block' }}>📈</span>
              <div style={{ fontWeight: 600, color: '#2193b0', margin: '10px 0 4px 0' }}>Step 3: Track & Connect</div>
              <div style={{ color: '#4c5a68', fontSize: 15 }}>Monitor your progress and connect with professionals.</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ maxWidth: 900, margin: '48px auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: 22, color: '#295fa6', marginBottom: 18, fontWeight: 600 }}>
            Testimonials
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {testimonials.map((t, idx) => (
              <blockquote
                key={idx}
                style={{
                  flex: '1 1 240px',
                  borderLeft: '4px solid #2193b0',
                  margin: 0,
                  padding: '12px 18px',
                  color: '#333',
                  background: 'rgba(245,250,255,0.9)',
                  borderRadius: 10,
                  minWidth: 220,
                }}
              >
                "{t.quote}"
                <br />
                <span style={{ fontSize: 14, color: '#888' }}>– {t.author}</span>
              </blockquote>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ textAlign: 'center', color: '#aaa', fontSize: 14, margin: '24px 0 0 0' }}>
          &copy; {new Date().getFullYear()} MindfulCheck
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
