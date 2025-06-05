import React from 'react';
import { Link } from 'react-router-dom';

// Example background image URL (you can replace it with your preferred image URL)
const backgroundImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80';

const HomePage = () => {
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
    {
      quote: 'MindfulCheck helped me understand my anxiety patterns.',
      author: 'Sarah T.',
    },
    {
      quote: 'The mood tracking feature gave me insights into my habits.',
      author: 'Michael K.',
    },
    {
      quote: 'This platform provided a gentle first step toward help.',
      author: 'Jamie R.',
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive, sans-serif", // Cute, friendly font
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#333',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Soft white overlay
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: 'relative',
          maxWidth: 700,
          backgroundColor: '#fff',
          borderRadius: 20,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          padding: 32,
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 36, margin: 0, color: '#ff6f91' }}>MindfulCheck</h1>
          <p style={{ color: '#666', marginTop: 8, fontSize: 18 }}>
            Simple tools for your mental wellbeing.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link
              to="/register"
              style={{
                marginRight: 16,
                textDecoration: 'none',
                color: '#fff',
                backgroundColor: '#ff6f91',
                padding: '10px 20px',
                borderRadius: 30,
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(255,111,145,0.4)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff4c70'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff6f91'}
            >
              Get Started
            </Link>
            <Link
              to="/assessment"
              style={{
                textDecoration: 'none',
                color: '#ff6f91',
                fontWeight: 'bold',
                padding: '10px 20px',
                borderRadius: 30,
                border: '2px solid #ff6f91',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#ff6f91';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ff6f91';
              }}
            >
              Take Assessment
            </Link>
          </div>
        </header>

        {/* Features */}
        <section style={{ marginBottom: 40, textAlign: 'left' }}>
          <h2 style={{ fontSize: 26, borderBottom: '2px solid #ff6f91', paddingBottom: 8, marginBottom: 20 }}>
            Features
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {features.map((feature, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: 18,
                  padding: 16,
                  backgroundColor: '#ffe6eb',
                  borderRadius: 15,
                  boxShadow: '2px 2px 8px rgba(255,111,145,0.15)',
                }}
              >
                <strong style={{ fontSize: 18, color: '#ff4c70' }}>{feature.title}</strong>
                <p style={{ marginTop: 6, color: '#555' }}>{feature.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: 40, textAlign: 'left' }}>
          <h2 style={{ fontSize: 26, borderBottom: '2px solid #ff6f91', paddingBottom: 8, marginBottom: 20 }}>
            How It Works
          </h2>
          <ol style={{ paddingLeft: 20, color: '#555', fontSize: 16 }}>
            <li style={{ marginBottom: 12 }}>Complete Assessment</li>
            <li style={{ marginBottom: 12 }}>Get Personalized Insights</li>
            <li>Track Progress & Connect</li>
          </ol>
        </section>

        {/* Testimonials */}
        <section style={{ marginBottom: 40, textAlign: 'left' }}>
          <h2 style={{ fontSize: 26, borderBottom: '2px solid #ff6f91', paddingBottom: 8, marginBottom: 20 }}>
            Testimonials
          </h2>
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              style={{
                borderLeft: '5px solid #ff6f91',
                paddingLeft: 16,
                marginBottom: 20,
                fontStyle: 'italic',
                color: '#444',
                backgroundColor: '#fff0f4',
                borderRadius: 12,
                boxShadow: '1px 1px 6px rgba(255,111,145,0.1)',
              }}
            >
              "{t.quote}"
              <br />
              <span style={{ fontSize: 14, color: '#aa4c66' }}>– {t.author}</span>
            </blockquote>
          ))}
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 24 }}>
          &copy; {new Date().getFullYear()} MindfulCheck
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
