import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sjohansson88/repos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Mina GitHub-projekt</h2>
      {loading ? (
        <p>Laddar projekt...</p>
      ) : (
        <table className='portfolio'>
          <thead>
            <tr>
              <th>Namn</th>
              <th>Beskrivning</th>
              <th>Länk</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer">GitHub-länk</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Projects;