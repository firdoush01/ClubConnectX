// src/components/EventDetails/Attendees.jsx
const Attendees = ({ count }) => (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Attendees</h2>
      <p className="text-gray-600">+{count} people</p>
    </section>
  );
  
  export default Attendees;