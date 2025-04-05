// src/components/EventDetails/AboutEvent.jsx
const AboutEvent = ({ description, contact }) => (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">About Event</h2>
      <p className="text-gray-600 mb-6">{description || 'About Event content goes here...'}</p>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">Contact organizers</h3>
        <p className="text-gray-600">{contact.phone}</p>
        <p className="text-gray-600">{contact.username}</p>
      </div>
      
      <button className="mt-6 text-blue-600 font-medium hover:text-blue-800">
        Contact Us
      </button>
    </section>
  );
  
  export default AboutEvent;