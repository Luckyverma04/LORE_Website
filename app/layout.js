import "./globals.css";

export const metadata = {
  title: "Lore",
  description: "Lore app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}