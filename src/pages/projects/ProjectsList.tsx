import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LIST_PROJECTS } from '../../api/projectsApi';
import { useAuthStore } from '../../store/authStore';

interface Project {
  id: number;
  title: string;
  budgetMin: number | null;
  budgetMax: number | null;
  status: string;
}

export default function ProjectsList() {
  const navigate = useNavigate();
  const { data, loading } = useQuery(LIST_PROJECTS);
  const token = useAuthStore((state) => state.accessToken);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {token && (
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => navigate('/projects/new')}
        >
          Создать проект
        </button>
      )}
      <ul className="space-y-2">
        {data?.projects?.map((project: Project) => (
          <li key={project.id} className="border p-2">
            <Link to={`/projects/${project.id}`} className="font-bold">
              {project.title}
            </Link>
            <div>
              Budget: {project.budgetMin} - {project.budgetMax}
            </div>
            <div>Status: {project.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
