const TeamMemberItem = ({ member, index, onChangeMember, onRemoveMember }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={member.name || ''}
          onChange={(e) => onChangeMember(index, 'name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={member.email || ''}
          onChange={(e) => onChangeMember(index, 'email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={member.phone || ''}
          onChange={(e) => onChangeMember(index, 'phone', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="College / Institution"
          value={member.college || ''}
          onChange={(e) => onChangeMember(index, 'college', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onRemoveMember(index)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Remove Member
        </button>
      </div>
    </div>
  );
};

export default TeamMemberItem;
