import { useState } from 'react';
import TeamMemberItem from '../components/TeamMemberItem';
import { useParams } from 'react-router-dom';

const StudentRegisterPage = ({ onRegister }) => {
  const [leader, setLeader] = useState({ name: '', email: '' });
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const { eventId } = useParams();

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: '' }]);
  };

  const handleRemoveMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleChangeMember = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { eventId, leader, teamName, teamMembers };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/studentregister`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        alert('Registration successful!');
        onRegister();
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="mb-10 text-left">
        <h2 className="text-3xl font-bold text-[#1b1f3b] mb-2">Register for Event</h2>
        <p className="text-gray-500">Fill in your team details below to register.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Team Leader */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-xl font-semibold text-[#1b1f3b] mb-4">Team Leader</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b1f3b]" 
                value={leader.name} 
                onChange={(e) => setLeader({ ...leader, name: e.target.value })} 
                required 
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b1f3b]" 
                value={leader.email} 
                onChange={(e) => setLeader({ ...leader, email: e.target.value })} 
                required 
              />
            </div>
          </div>
        </div>

        {/* Team Name */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <label className="block mb-2 text-lg font-semibold text-[#1b1f3b]">Team Name</label>
          <input 
            type="text" 
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b1f3b]" 
            value={teamName} 
            onChange={(e) => setTeamName(e.target.value)} 
            required 
          />
        </div>

        {/* Team Members */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#1b1f3b]">Team Members</h3>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium bg-[#1b1f3b] text-white rounded hover:bg-[#2b2f4c] transition"
              onClick={handleAddMember}
            >
              + Add Member
            </button>
          </div>
          {teamMembers.length === 0 && (
            <p className="text-gray-500 text-sm italic">No members added yet.</p>
          )}
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <TeamMemberItem
                key={index}
                member={member}
                index={index}
                onChangeMember={handleChangeMember}
                onRemoveMember={handleRemoveMember}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#1b1f3b] hover:bg-[#2b2f4c] text-white font-bold py-3 px-8 rounded-md transition"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegisterPage;
