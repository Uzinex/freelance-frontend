import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';
import type { Project } from '../../api/adminApi';
import { useAuthStore } from '../../store/authStore';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }
    adminApi.getAllProjects().then(setProjects);
  }, [role, navigate]);

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2">ID</th>
          <th className="border px-2">Title</th>
          <th className="border px-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id}>
            <td className="border px-2">{p.id}</td>
            <td className="border px-2">{p.title}</td>
            <td className="border px-2">{p.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
