// src/pages/EventDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/events/${id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!event) return <div className="p-4 text-center">Loading...</div>;

  const formattedDate = new Date(event.date).toLocaleDateString('en-US');
  
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1D1D35]">{event.name}</h1>
        <div className="flex gap-2">
          <button className="border border-[#1D1D35] rounded-full px-4 py-1 text-sm hover:bg-[#1D1D35] hover:text-white transition">All event</button>
          <button className="border border-[#1D1D35] rounded-full px-4 py-1 text-sm hover:bg-[#1D1D35] hover:text-white transition">Campus event</button>
          <button className="bg-[#1D1D35] text-white rounded-full px-4 py-1 text-sm">Near Campus event</button>
        </div>
      </div>

      {/* Image/Video placeholder */}
      <div className="w-full bg-gray-300 h-52 rounded-md"></div>

      <div className="flex justify-end">
        <button className="px-4 py-1 rounded-md bg-[#1D1D35] text-white">Share</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* About Event Section */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#1D1D35] mb-2">About Event</h2>
          <p className="text-sm text-gray-500 mb-4">{event.description || "About Event"}</p>
          <div className="bg-gray-200 h-2.5 w-full rounded-full mb-2"></div>
          <div className="bg-gray-200 h-2.5 w-4/5 rounded-full"></div>
        </div>

        {/* Contact Organizers */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-sm font-medium text-[#1D1D35]">contact organizers</h2>
          <div className="flex items-center gap-3">
            <img src="/default-avatar.png" alt="Organizer" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm text-gray-700">{event.phone || "+91 526425663"}</p>
              <p className="text-sm text-gray-500">{event.organizer || "itz_user"}</p>
            </div>
          </div>
          <button className="w-full py-2 text-white bg-[#1D1D35] rounded-md">Contact Us</button>
        </div>
      </div>

      {/* Schedule & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
          <Calendar className="text-gray-500" />
          <p className="text-sm text-gray-700">{formattedDate} • {event.time || "10:00 PM"}</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
          <MapPin className="text-gray-500" />
          <p className="text-sm text-gray-700">{event.location || "Location"}</p>
        </div>
      </div>

      {/* Sponsors */}
      <div className="bg-white p-4 rounded-lg shadow space-y-2">
        <h3 className="text-md font-semibold text-[#1D1D35]">Event Sponsors</h3>
        <div className="flex flex-wrap gap-2">
          {event.sponsors?.map((s, index) => (
            <button key={index} className="bg-[#1D1D35] text-white text-sm rounded-full px-4 py-1">{s}</button>
          )) || (
            <>
              <span className="bg-[#1D1D35] text-white text-sm rounded-full px-4 py-1">sponsor 01</span>
              <span className="bg-[#1D1D35] text-white text-sm rounded-full px-4 py-1">sponsor 02</span>
              <span className="bg-[#1D1D35] text-white text-sm rounded-full px-4 py-1">sponsor 03</span>
            </>
          )}
        </div>
      </div>

      {/* Attendees */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-md font-semibold mb-2 text-[#1D1D35]">Attendees</h3>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <img key={i} src="/default-avatar.png" alt="attendee" className="-ml-2 w-8 h-8 rounded-full border-2 border-white" />
          ))}
          <span className="ml-4 text-sm text-gray-600">+15 people</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
