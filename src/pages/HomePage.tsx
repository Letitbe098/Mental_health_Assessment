import React from 'react';
import { Link } from 'react-router-dom';

// Example background image from Unsplash (calm, nature, mental health theme)
const backgroundImageUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80';

const HomePage = () => {
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
      <div
        style={{
          background: 'rgba(255,255,255,0.92)',
          maxWidth: 700,
          margin: '0 auto',
          minHeight: '100vh',
          padding: 24,
        }}
      >
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, margin: 0, color: '#2e4a62' }}>MindfulCheck</h1>
          <p style={{ color: '#555', marginTop: 8 }}>Simple tools for your mental wellbeing.</p>
          <div style={{ marginTop: 16 }}>
            <Link to="/register" style={{ marginRight: 12, textDecoration: 'none', color: '#1976d2' }}>
              Get Started
            </Link>
            <Link to="/assessment" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Take Assessment
            </Link>
          </div>
        </header>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Features</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {features.map((feature, idx) => (
              <li key={idx} style={{ margin: '18px 0', padding: 12, background: '#f7fafc', borderRadius: 6 }}>
                <strong>{feature.title}</strong>
                <div style={{ color: '#555', marginTop: 4 }}>{feature.description}</div>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, borderBottom: '1px solid #eee', paddingBottom: 8 }}>How It Works</h2>
          <ol style={{ paddingLeft: 20 }}>
            <li>Complete Assessment</li>
            <li>Get Personalized Insights</li>
            <li>Track Progress & Connect</li>
          </ol>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Testimonials</h2>
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              style={{
                borderLeft: '4px solid #1976d2',
                margin: '16px 0',
                paddingLeft: 12,
                color: '#333',
                background: '#f5faff',
                borderRadius: 6,
              }}
            >
              "{t.quote}"
              <br />
              <span style={{ fontSize: 14, color: '#888' }}>– {t.author}</span>
            </blockquote>
          ))}
        </section>

        <footer style={{ textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 24 }}>
          &copy; {new Date().getFullYear()} MindfulCheck
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
