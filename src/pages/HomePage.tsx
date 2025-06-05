import React from 'react';
import { Link } from 'react-router-dom';

const backgroundImageUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80';

const features = [
  { title: 'Mental Health Assessment', description: 'Take assessments to understand your mental wellbeing.' },
  { title: 'Mood & Sleep Tracking', description: 'Track your mood and sleep patterns over time.' },
  { title: 'AI-Powered Chatbot', description: 'Get support from our intelligent chatbot.' },
  { title: 'Professional Connection', description: 'Connect with licensed mental health professionals.' },
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
        padding: 0,
        margin: 0,
        fontFamily: 'sans-serif',
      }}
    >
      {/* Soft overlay for readability */}
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.82) 60%, rgba(200,220,255,0.60) 100%)',
          padding: '0',
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
                transition: 'background 0.2s',
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
                transition: 'background 0.2s',
              }}
            >
              Take Assessment
            </Link>
          </div>
        </header>

        {/* FEATURES */}
        <section style={{ maxWidth: 800, margin: '40px auto 0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: 22, color: '#295fa6', marginBottom: 18, fontWeight: 600 }}>
            Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}>
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.82)',
                  borderRadius: 12,
                  padding: 18,
                  boxShadow: '0 1px 6px rgba(33,147,176,0.06)',
                  minHeight: 110,
                }}
              >
                <strong style={{ color: '#2193b0', fontSize: 16 }}>{feature.title}</strong>
                <div style={{ color: '#4c5a68', marginTop: 6 }}>{feature.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ maxWidth: 800, margin: '40px auto 0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: 22, color: '#295fa6', marginBottom: 18, fontWeight: 600 }}>
            How It Works
          </h2>
          <ol style={{ color: '#4c5a68', fontSize: 16, paddingLeft: 24 }}>
            <li>Complete Assessment</li>
            <li>Get Personalized Insights</li>
            <li>Track Progress & Connect</li>
          </ol>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
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
