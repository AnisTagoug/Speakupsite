import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ onChange, value, tileContent, tileDisabled, className = '' }) => {
  return (
    <div className={`custom-calendar ${className}`}>
      <style jsx>{`
        .custom-calendar {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(168, 85, 247, 0.2);
        }

        .custom-calendar .react-calendar {
          background: transparent;
          border: none;
          font-family: 'Inter', sans-serif;
        }

        .custom-calendar .react-calendar__navigation {
          background: rgba(168, 85, 247, 0.1);
          border-radius: 12px;
          padding: 8px;
          margin-bottom: 16px;
        }

        .custom-calendar .react-calendar__navigation button {
          background: transparent;
          border: none;
          color: #e2e8f0;
          font-size: 18px;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .custom-calendar .react-calendar__navigation button:hover {
          background: rgba(168, 85, 247, 0.2);
          color: #a855f7;
        }

        .custom-calendar .react-calendar__navigation button:disabled {
          color: #64748b;
        }

        .custom-calendar .react-calendar__month-view__weekdays {
          background: rgba(168, 85, 247, 0.05);
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .custom-calendar .react-calendar__month-view__weekdays__weekday {
          color: #a855f7;
          font-weight: 600;
          font-size: 14px;
          padding: 12px 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }

        .custom-calendar .react-calendar__tile {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(168, 85, 247, 0.1);
          border-radius: 8px;
          color: #e2e8f0;
          font-weight: 500;
          padding: 12px 8px;
          margin: 0;
          transition: all 0.3s ease;
          position: relative;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
        }

        .custom-calendar .react-calendar__tile:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: #a855f7;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
        }

        .custom-calendar .react-calendar__tile:active {
          transform: translateY(0);
        }

        .custom-calendar .react-calendar__tile--active {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
          border-color: #a855f7;
          color: white;
          box-shadow: 0 4px 16px rgba(168, 85, 247, 0.4);
        }

        .custom-calendar .react-calendar__tile--now {
          background: rgba(168, 85, 247, 0.15);
          border-color: #a855f7;
          color: #a855f7;
        }

        .custom-calendar .react-calendar__tile--disabled {
          color: #64748b;
          background: rgba(30, 41, 59, 0.4);
          border-color: rgba(100, 116, 139, 0.2);
          cursor: not-allowed;
          opacity: 0.5;
        }

        .custom-calendar .react-calendar__tile--disabled:hover {
          background: rgba(30, 41, 59, 0.4);
          border-color: rgba(100, 116, 139, 0.2);
          transform: none;
          box-shadow: none;
          cursor: not-allowed;
        }

        .custom-calendar .react-calendar__tile abbr {
          font-size: 14px;
          font-weight: 600;
        }

        .custom-calendar .react-calendar__tile--active abbr {
          color: white;
        }

        .custom-calendar .react-calendar__tile--now abbr {
          color: #a855f7;
        }

        /* Event indicator styling */
        .custom-calendar .event-indicator {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        .custom-calendar .react-calendar__tile--active .event-indicator {
          background: white;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .custom-calendar {
            padding: 16px;
          }
          
          .custom-calendar .react-calendar__tile {
            padding: 8px 4px;
            min-height: 50px;
            font-size: 12px;
          }
          
          .custom-calendar .react-calendar__tile abbr {
            font-size: 12px;
          }
        }
      `}</style>
      
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        className="w-full"
        showNeighboringMonth={false}
        locale="fr-FR"
        calendarType="gregory"
      />
    </div>
  );
};

export default CustomCalendar;