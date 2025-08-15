import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import CustomCalendar from '../components/CustomCalendar';
import { useTranslation } from 'react-i18next';

export default function BackOffice() {
  const { token, login, logout, user } = useAuth();
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    sponsors: '',
    image: '',
    room: '',
    id: null
  });
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(!token);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  useEffect(() => {
    if (token) fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    setEvents(await res.json());
  };

  const handleCalendarClick = (date) => {
    setSelectedDate(date);
    // Format date in local timezone to avoid UTC conversion issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const localDate = `${year}-${month}-${day}`;
    
    setForm({
      ...form,
      date: localDate,
      id: null
    });
    setShowForm(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id ? `/api/events/${form.id}` : '/api/events';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          date: form.date,
          startTime: form.startTime,
          endTime: form.endTime,
          description: form.description,
          sponsors: form.sponsors,
          image: form.image,
          room: form.room
        })
      });
      if (!res.ok) throw new Error('Failed to save event');
      setForm({ title: '', date: '', startTime: '', endTime: '', description: '', sponsors: '', image: '', room: '', id: null });
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this event?')) return;
    await fetch(`/api/events/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchEvents();
  };

  const handleEdit = event => {
    setForm(event);
    setShowForm(true);
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(loginForm.username, loginForm.password);
      setShowLogin(false);
    } catch {
      setError('Invalid credentials');
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Sign in to manage your events</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={loginForm.username}
                    onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Sign In
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Secure admin access to manage events and content
              </p>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">{t('event_management')}</h2>
        <button onClick={logout} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">{t('logout')}</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div>
          <h3 className="text-xl mb-4 text-white">{t('interactive_calendar')}</h3>
          <CustomCalendar
            onChange={handleCalendarClick}
            value={selectedDate}
            tileDisabled={({ date }) => {
              // Disable dates before today
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const dateString = date.toISOString().slice(0, 10);
                const hasEvent = events.some(ev => ev.date === dateString);
                return hasEvent ? <div className="event-indicator"></div> : null;
              }
            }}
          />
          <p className="text-sm text-gray-300 mt-4 text-center">{t('click_date_add_event')}</p>
        </div>

        {/* Form Section */}
        <div>
                      {showForm ? (
              <div className="bg-gray-800 border border-purple-500/20 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl mb-4 text-white">{form.id ? t('edit_event') : t('add_new_event')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">{t('event_title')} *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder={t('event_title')} 
                    value={form.title} 
                    onChange={e => setForm({ ...form, title: e.target.value })} 
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:border-purple-500 focus:outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">{t('date')} *</label>
                    <input 
                      required 
                      type="date" 
                      value={form.date} 
                      onChange={e => setForm({ ...form, date: e.target.value })} 
                      className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:border-purple-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">{t('room')}</label>
                    <input 
                      type="text" 
                      placeholder={t('room_name')} 
                      value={form.room} 
                      onChange={e => setForm({ ...form, room: e.target.value })} 
                      className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:border-purple-500 focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">{t('start_time')} *</label>
                    <input 
                      required 
                      type="time" 
                      value={form.startTime} 
                      onChange={e => setForm({ ...form, startTime: e.target.value })} 
                      className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:border-purple-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">{t('end_time')} *</label>
                    <input 
                      required 
                      type="time" 
                      value={form.endTime} 
                      onChange={e => setForm({ ...form, endTime: e.target.value })} 
                      className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:border-purple-500 focus:outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">{t('description')} *</label>
                  <textarea 
                    required 
                    placeholder={t('description')} 
                    value={form.description} 
                    onChange={e => setForm({ ...form, description: e.target.value })} 
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded h-20 focus:border-purple-500 focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">{t('sponsors')}</label>
                  <input 
                    type="text" 
                    placeholder={t('sponsor_names')} 
                    value={form.sponsors} 
                    onChange={e => setForm({ ...form, sponsors: e.target.value })} 
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:border-purple-500 focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">{t('image_url')}</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/image.jpg" 
                    value={form.image} 
                    onChange={e => setForm({ ...form, image: e.target.value })} 
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:border-purple-500 focus:outline-none" 
                  />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                    {form.id ? t('update_event') : t('add_event')}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setForm({ title: '', date: '', startTime: '', endTime: '', description: '', sponsors: '', image: '', room: '', id: null });
                      setShowForm(false);
                    }} 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {t('cancel')}
                  </button>
                </div>
                {error && <div className="text-red-500">{error}</div>}
              </form>
            </div>
                      ) : (
              <div className="bg-gray-800 border border-purple-500/20 p-6 rounded-lg">
                <h3 className="text-xl mb-4 text-white">{t('quick_actions')}</h3>
                <p className="text-gray-300 mb-4">{t('click_calendar_add_event')}</p>
                <button 
                  onClick={() => setShowForm(true)} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {t('add_new_event')}
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Events List */}
      <div className="mt-8">
        <h3 className="text-xl mb-4 text-white">{t('all_events')}</h3>
        <div className="grid gap-4">
          {events.map(ev => (
            <div key={ev.id} className="bg-gray-800 border border-purple-500/20 p-4 rounded-lg shadow-lg">
                              <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">{ev.title}</h4>
                    <p className="text-gray-300">{ev.date} • {ev.startTime} - {ev.endTime}</p>
                    {ev.room && <p className="text-gray-400">📍 {ev.room}</p>}
                    <p className="text-sm mt-2 text-gray-300">{ev.description}</p>
                    {ev.sponsors && <p className="text-sm text-purple-400">🎯 Sponsors: {ev.sponsors}</p>}
                    {ev.image && <p className="text-sm text-gray-400">🖼️ Image: {ev.image}</p>}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleEdit(ev)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors">Edit</button>
                    <button onClick={() => handleDelete(ev.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">Delete</button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 