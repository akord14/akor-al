export const metadata = {
  title: "akord.al",
  description: "Një dritare për punë fleksibël dhe bashkëpunime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}
