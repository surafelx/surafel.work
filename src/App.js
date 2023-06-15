import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import portfolioData from './data/portfolioData.json';
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio/:slug" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
    <nav className="fixed top-0 w-full bg-white">
  <ul className="flex justify-center space-x-4">
    <li>
      <a href="#home" className="text-gray-800 hover:text-blue-500 transition-colors duration-300">Home</a>
    </li>
    <li>
      <a href="#about" className="text-gray-800 hover:text-blue-500 transition-colors duration-300">About</a>
    </li>
    <li>
      <a href="#portfolio" className="text-gray-800 hover:text-blue-500 transition-colors duration-300">Portfolio</a>
    </li>
  </ul>
</nav>


     
      <hr />
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div >
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold mb-4">Home</h2>
      </section>
      <section id="about" className="min-h-screen flex flex-col items-center justify-center">
      <About />
      </section>
      <section id="portfolio">
      <Portfolio />
      </section>
    </div>
  );
}

function About() {
  return (
    <div >
      <h3 className="text-2xl font-semibold mb-4">About</h3>
    </div>
  );
}

function Portfolio() {
  const { portfolio } = portfolioData;
  const [activeSection, setActiveSection] = useState('All');
  const [activeProject, setActiveProject] = useState(0);

  const filteredPortfolio = activeSection === 'All' ? portfolio : portfolio.filter(item => item.section === activeSection);

  const sectionOptions = ['All', 'Web', 'Mobile', 'Data Science'];

  const handleNextProject = () => {
    setActiveProject(prevProject => (prevProject === filteredPortfolio.length - 2 ? 0 : prevProject + 1));
  };

  const handlePrevProject = () => {
    setActiveProject(prevProject => (prevProject === 0 ? filteredPortfolio.length - 2 : prevProject - 1));
  };

  const visibleProjects = filteredPortfolio.slice(activeProject, activeProject + 2);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h3 className="text-2xl font-semibold mb-4">Portfolio</h3>

      <div className="flex justify-center mt-8">
        <div className="max-w-screen-lg bg-white overflow-hidden">
          <div className="flex items-center justify-center p-4">
            {sectionOptions.map(section => (
              <button
                key={section}
                className={`mr-2 text-gray-600 ${activeSection === section ? 'text-blue-500 font-semibold underline' : ''}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="relative h-100 p-10">
            <div className={`flex transition-transform duration-300 ease-in-out transform -translate-x-${activeProject * 50}%`}>
              {visibleProjects.map(item => (
                <div key={item.id} className="w-96 mx-2">
                  <a href={`/portfolio/${item.id}`}>
                    <div className="p-4 h-full bg-white rounded-lg shadow-md">
                      <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <button
              className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600"
              onClick={handlePrevProject}
            >
              {`<`}
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-600"
              onClick={handleNextProject}
            >
              {`>`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function ProjectDetails() {
  const { slug } = useParams();
  const { portfolio } = portfolioData;
  const project = portfolio.find(item => String(item.id) === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2>Project not found!</h2>
        <p>
          <Link to="/portfolio">Go back to Portfolio</Link>
        </p>
      </div>
    );
  }

  const { title, description } = project;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
          <Link to="/#portfolio">Go back to Home</Link>
        </p>
    </div>
  );
}
