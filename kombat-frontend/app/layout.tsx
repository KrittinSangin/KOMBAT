import "./globals.css";
import type {ReactNode} from "react";
import {Jersey_25} from 'next/font/google'

const jersey25 = Jersey_25({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-jersey25'
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={`${jersey25.variable}`}>
        <body>{children}</body>
        </html>
    );
}