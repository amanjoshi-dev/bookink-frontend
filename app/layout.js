// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from '@/context/AuthContext';

export const metadata = { title: 'Book-Ink' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* The AuthProvider gives all pages access to user, login, logout */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
