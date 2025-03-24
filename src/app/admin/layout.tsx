import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin page",
  description: "Please add students and sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
