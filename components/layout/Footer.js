/**
 * Simple footer. Shared by all dashboard pages.
 */
export default function Footer() {
  return (
    <footer className="mt-auto border-top border-secondary py-3 bg-dark text-secondary">
      <div className="container-fluid d-flex justify-content-between small">
        <span>© {new Date().getFullYear()} BookInk</span>
        <span>v0.1 • Dashboard</span>
      </div>
    </footer>
  );
}
