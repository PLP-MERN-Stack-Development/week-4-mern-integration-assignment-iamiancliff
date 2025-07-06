// HomePage.jsx - Landing page with a welcome message and placeholder for blog content
import { useEffect } from 'react';

const HomePage = () => {
  // Simulate a simple effect (e.g., future API call for posts)
  useEffect(() => {
    document.title = 'BlogSite - Home';
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary mb-4 text-center">
        Welcome to BlogSite
      </h1>
      <p className="text-lg text-foreground text-center max-w-prose">
        Explore a world of ideas, stories, and insights. Start by logging in or signing up to share your own!
      </p>
      <div className="mt-6 text-muted-foreground text-center">
        {/* Placeholder for future blog post previews */}
        <p>Coming soon: Latest posts will appear here.</p>
      </div>
    </div>
  );
};

export default HomePage;