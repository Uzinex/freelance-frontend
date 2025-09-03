import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../api/projectsApi';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
  });
  const navigate = useNavigate();
  const [createProject] = useMutation(CREATE_PROJECT);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({
        variables: {
          title: form.title,
          description: form.description,
          budgetMin: form.budgetMin ? parseFloat(form.budgetMin) : null,
          budgetMax: form.budgetMax ? parseFloat(form.budgetMax) : null,
        },
      });
      navigate('/projects');
    } catch {
      setError('Failed to create project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 w-full"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full"
      />
      <input
        name="budgetMin"
        value={form.budgetMin}
        onChange={handleChange}
        placeholder="Budget Min"
        className="border p-2 w-full"
      />
      <input
        name="budgetMax"
        value={form.budgetMax}
        onChange={handleChange}
        placeholder="Budget Max"
        className="border p-2 w-full"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Create
      </button>
    </form>
  );
}
