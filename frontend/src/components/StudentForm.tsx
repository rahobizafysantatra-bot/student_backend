import { useState, useEffect } from 'react';
import type { Student, Group } from '../types';

interface Props {
  editingStudent: Student | null;
  onSubmit: (student: Student) => void;
  onCancel: () => void;
}

export const StudentForm = ({ editingStudent, onSubmit, onCancel }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState<Group>('N1');

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setGroup(editingStudent.group);
    } else {
      setName('');
      setEmail('');
      setGroup('N1');
    }
  }, [editingStudent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...editingStudent, name, email, group });
    if (!editingStudent) {
      setName('');
      setEmail('');
      setGroup('N1');
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? 'Edit student' : 'Add student'}</h2>
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select value={group} onChange={(e) => setGroup(e.target.value as Group)}>
        <option value="N1">N1</option>
        <option value="N2">N2</option>
        <option value="N3">N3</option>
      </select>
      <div className="form-actions">
        <button type="submit">{editingStudent ? 'Save' : 'Add'}</button>
        {editingStudent && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};