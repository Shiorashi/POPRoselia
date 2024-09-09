import './globals.css'; // Import your global CSS
import { Nunito } from '@next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'], // Include weights you need
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  );
}
