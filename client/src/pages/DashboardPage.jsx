// DashboardPage.jsx - Placeholder for user dashboard showing posts
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { token } = useAuth();

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-4">Dashboard</h1>
      {token ? (
        <div>
          <p className="text-foreground">Welcome! Your posts will appear here.</p>
          {/* Future: Fetch user posts with api.get */}
        </div>
      ) : (
        <p className="text-red-500">Please log in to see your dashboard.</p>
      )}
    </div>
  );
};

export default DashboardPage;