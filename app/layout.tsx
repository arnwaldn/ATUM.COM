// Root layout - redirects to locale layout
// This file is required but the actual layout is in app/[locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
