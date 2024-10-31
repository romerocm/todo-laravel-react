import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/" className="text-xl font-bold text-primary">
            TodoList App
          </Link>
        </div>
      </header>

      <main className="py-6">{children}</main>
    </div>
  );
}
