// src/components/EventDetails/Schedule.jsx
const Schedule = ({ date, time, location, sponsors }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  
    return (
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Schedule</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-5 w-5 text-blue-600 rounded border-gray-300 mr-3"
            />
            <span className="text-gray-700">
              {formattedDate} ▪ {time}
            </span>
          </div>
          
          <p className="text-gray-600">{location || 'Location details here'}</p>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Event Sponsors</h3>
            <ul className="space-y-1">
              {sponsors.map((sponsor, index) => (
                <li key={index} className="text-gray-600">- {sponsor}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  };
  
  export default Schedule;