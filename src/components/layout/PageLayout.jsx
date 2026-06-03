import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NetworkCanvas from '../animations/NetworkCanvas';
import SVGDefs from '../common/SVGDefs';

export default function PageLayout() {
  return (
    <>
      <div className="bg-field"></div>
      <div className="bg-grid"></div>
      <NetworkCanvas />
      <SVGDefs />

      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
