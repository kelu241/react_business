import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';


const Topbar = ({ onToggleSidebar }) => {
const [dark, setDark] = useState(false);


useEffect(() => {
document.body.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
}, [dark]);


return (
  <header className="navbar navbar-expand-md d-print-none">
    <div className="container-xl">
      {/* Botão do menu - sempre visível */}
      <button 
        className="btn btn-ghost-dark me-2" 
        type="button" 
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <IconMenu2 size={20} />
      </button>

      <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <span className="navbar-brand-text">Meu Dashboard</span>
      </h1>

      <div className="navbar-nav flex-row order-md-last">
        <button className="btn" onClick={() => setDark(v => !v)} aria-label="Alternar tema">
          {dark ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </div>
  </header>
);
}

export default Topbar;