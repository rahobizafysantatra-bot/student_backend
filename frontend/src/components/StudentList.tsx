import type { Student } from '../types';

interface Props {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const groupColors: Record<string, string> = {
  N1: '#6366f1',
  N2: '#059669',
  N3: '#d97706',
};

export const StudentList = ({ students, onEdit, onDelete }: Props) => {
  if (students.length === 0) {
    return <p className="empty">No students yet.</p>;
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <div className="student-card" key={student.id}>
          <span className="badge" style={{ backgroundColor: groupColors[student.group] }}>
            {student.group}
          </span>
          <h3>{student.name}</h3>
          <p className="email">{student.email}</p>
          <div className="student-card-actions">
            <button onClick={() => onEdit(student)}>Edit</button>
            <button className="danger" onClick={() => student.id && onDelete(student.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};