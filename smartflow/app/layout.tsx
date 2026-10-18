import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smartflow — Understand your business",
  description: "A clear, guided view of your business's financial health."
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5eee4"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}