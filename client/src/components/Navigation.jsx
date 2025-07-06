// Navigation.jsx - Reusable navigation bar with links for site navigation
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  return (
    <nav className="bg-neutral shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">BlogSite</Link>
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-gray-700 hover:text-primary">Home</Link></li>
          <li><Link to="/posts" className="text-gray-700 hover:text-primary">Posts</Link></li>
          <li><Link to="/categories" className="text-gray-700 hover:text-primary">Categories</Link></li>
          <li><Link to="/about" className="text-gray-700 hover:text-primary">About</Link></li>
          <li><Link to="/dashboard" className="text-gray-700 hover:text-primary">Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;