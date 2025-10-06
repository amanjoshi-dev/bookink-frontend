// Server Component (no "use client") → great for SEO defaults.
// We only import CSS and wrap children with our AuthProvider.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // <-- icons
//import '@/styles/theme.css';
import AuthProvider from '@/context/AuthContext';

export const metadata = { title: 'Book-Ink' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* AuthProvider is a client component that manages login state */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
