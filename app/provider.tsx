import React from 'react'
import Header from './_components/Header';
import Footer from './_components/Footer';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <Header />
    {children}
    <Footer /></div>;
}

export default Provider
