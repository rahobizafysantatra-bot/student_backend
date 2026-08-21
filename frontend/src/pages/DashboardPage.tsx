import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Student, Statistics } from '../types';
import { StudentForm } from '../components/StudentForm';
import { StudentList } from '../components/StudentList';
import { Stats } from '../components/Stats';
import { useAuth } from '../auth/AuthContext';

export const DashboardPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  const loadData = async () => {
    try {
      const [studentsRes, statsRes] = await Promise.all([
        api.get<Student[]>('/students'),
        api.get<Statistics>('/students/stats'),
      ]);
      setStudents(studentsRes.data);
      setStats(statsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (student: Student) => {
    try {
      if (student.id) {
        await api.put(`/students/${student.id}`, student);
      } else {
        await api.post('/students', student);
      }
      setEditingStudent(null);
      loadData();
    } catch (err) {
      setError('Failed to save student.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/students/${id}`);
      loadData();
    } catch (err) {
      setError('Failed to delete student.');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Student Manager</h1>
        <button className="logout" onClick={logout}>Logout</button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <Stats stats={stats} />

      <div className="main-grid">
        <StudentForm
          editingStudent={editingStudent}
          onSubmit={handleSubmit}
          onCancel={() => setEditingStudent(null)}
        />
        <StudentList students={students} onEdit={setEditingStudent} onDelete={handleDelete} />
      </div>
    </div>
  );
};