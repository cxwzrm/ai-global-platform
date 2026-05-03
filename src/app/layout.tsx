import type { Metadata } from 'next';
import './globals.css';
 
export const metadata: Metadata = {
  title: 'AI Industrial - Global Laser Equipment Platform',
  description: 'Leading manufacturer of laser cutting and welding machines. Professional solutions for industrial manufacturing worldwide.',
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
