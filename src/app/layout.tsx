import type {Metadata} from 'next';
import {Xanh_Mono, Work_Sans} from 'next/font/google';
import './globals.css';

const xanhMono = Xanh_Mono({subsets: ['latin'], weight: '400'});
const workSans = Work_Sans({subsets: ['latin'], weight: '400'});

export const metadata: Metadata = {
  title: 'Aled Photography',
};

// Design for this page https://dribbble.com/shots/15038119-Photography-Portfolio/attachments/6763052?mode=media
// Design for this page https://www.keisukeono.com/

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className={`${workSans.className} h-full bg-slate-100 text-slate-600`}>
        {children}
      </body>
    </html>
  );
}
