import "./globals.css";

export const metadata = {
  title: "petlove_ofanimals - Banho e Tosa",
  description: "Serviços profissionais de banho, tosa e cuidados especiais para o seu pet, cuidando com amor e dedicação.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
