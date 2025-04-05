import { useState } from 'react';
import TeamMemberItem from '../components/TeamMemberItem';
import { useParams } from 'react-router-dom';

const StudentRegisterPage = ({ onRegister }) => {
  const [leader, setLeader] = useState({
    name: '',
    email: '',
    phone: '',
    college: ''
  });
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const { eventId } = useParams();

  const handleAddMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: '', email: '', phone: '', college: '' }
    ]);
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
        onRegister;
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white text-gray-900 rounded-xl shadow-lg border border-gray-200">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Event Registration</h2>
        <div className="h-1 w-20 bg-indigo-600 mx-auto mt-2 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Team Leader</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={leader.name}
                onChange={(e) => setLeader({ ...leader, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={leader.email}
                onChange={(e) => setLeader({ ...leader, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={leader.phone}
                onChange={(e) => setLeader({ ...leader, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">College / Institution</label>
              <input
                type="text"
                value={leader.college}
                onChange={(e) => setLeader({ ...leader, college: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </section>

        <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <label className="block text-xl font-semibold text-indigo-600 mb-4">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </section>

        <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-indigo-600">Team Members</h3>
            <button
              type="button"
              onClick={handleAddMember}
              className="bg-indigo-950 hover:bg-indigo-950 text-white px-4 py-2 rounded-md transition duration-200"
            >
              + Add Member
            </button>
          </div>

          <div className="space-y-6">
            {teamMembers.length === 0 && (
              <p className="text-sm text-gray-500">No team members yet. Click "Add Member" to start adding.</p>
            )}
            {teamMembers.map((member, index) => (
              <TeamMemberItem
                key={index}
                index={index}
                member={member}
                onChangeMember={handleChangeMember}
                onRemoveMember={handleRemoveMember}
              />
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-indigo-950 hover:bg-indigo-950 text-white font-semibold text-lg py-3 rounded-lg transition duration-300"
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
};

export default StudentRegisterPage;
