import React, { useEffect, useState } from 'react';
import CustomCalendar from '../components/CustomCalendar';
import { useAuth } from '../AuthContext';

export default function Events() {
  const { user } = useAuth(); // Get authentication status
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/events`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched events:', data);
        setEvents(data);
      })
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  // Find events for the selected date
  const selectedDateString = selectedDate.toISOString().slice(0, 10);
  const eventsForDate = events.filter(ev => {
    // Handle both ISO format and simple date format
    const eventDate = ev.date.includes('T') ? ev.date.slice(0, 10) : ev.date;
    return eventDate === selectedDateString;
  });

  // Sort events by date and time
  const sortedEvents = events.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime}`);
    const dateB = new Date(`${b.date} ${b.startTime}`);
    return dateA - dateB;
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-white">Upcoming Events</h2>
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={() => setView('calendar')} 
            className={`px-4 py-2 rounded-lg transition-colors ${view === 'calendar' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Calendar View
          </button>
          <button 
            onClick={() => setView('list')} 
            className={`px-4 py-2 rounded-lg transition-colors ${view === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            List View
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
                        <CustomCalendar
              onChange={setSelectedDate}
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
                  const hasEvent = events.some(ev => {
                    // Handle both ISO format and simple date format
                    const eventDate = ev.date.includes('T') ? ev.date.slice(0, 10) : ev.date;
                    return eventDate === dateString;
                  });
                  return hasEvent ? (
                    <div 
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full shadow-lg"
                      style={{
                        background: '#10b981',
                        boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                        zIndex: 10
                      }}
                    ></div>
                  ) : null;
                }
              }}
            />
          </div>

          {/* Events for selected date */}
          <div>
            <h3 className="text-xl mb-4 text-white">Events on {selectedDate.toLocaleDateString()}</h3>
            {eventsForDate.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <p className="text-lg">No events scheduled for this date.</p>
                <p className="text-sm mt-2">Click on a different date to see events.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {eventsForDate.map(ev => (
                  <div key={ev.id} className="bg-gray-800 border border-purple-500/20 p-4 rounded-lg shadow-lg">
                                          <div className="flex items-start gap-4">
                        {ev.image && (
                          <img 
                            src={ev.image} 
                            alt={ev.title} 
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white">{ev.title}</h4>
                          <p className="text-purple-400 font-medium">{ev.startTime} - {ev.endTime}</p>
                          {ev.room && <p className="text-gray-300">📍 {ev.room}</p>}
                          <p className="text-gray-300 mt-2">{ev.description}</p>
                          {/* Only show sponsors for authenticated users */}
                          {user && ev.sponsors && (
                            <p className="text-sm text-purple-400 mt-2">
                              🎯 Sponsored by: {ev.sponsors}
                            </p>
                          )}
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {sortedEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">No events scheduled yet.</p>
                <p className="text-sm text-gray-500 mt-2">Check back soon for upcoming events!</p>
              </div>
            ) : (
              sortedEvents.map(ev => (
                <div key={ev.id} className="bg-gray-800 border border-purple-500/20 rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    {ev.image && (
                      <div className="md:w-48 md:shrink-0">
                        <img 
                          src={ev.image} 
                          alt={ev.title} 
                          className="w-full h-48 md:h-full object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                                          <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{ev.title}</h3>
                            <div className="flex items-center gap-4 text-gray-300">
                              <span className="flex items-center gap-1">
                                📅 {new Date(ev.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                🕒 {ev.startTime} - {ev.endTime}
                              </span>
                              {ev.room && (
                                <span className="flex items-center gap-1">
                                  📍 {ev.room}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Only show sponsors for authenticated users */}
                          {user && ev.sponsors && (
                            <div className="bg-purple-900/50 px-3 py-1 rounded-full border border-purple-500/30">
                              <span className="text-sm text-purple-300">🎯 {ev.sponsors}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 leading-relaxed">{ev.description}</p>
                      </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
