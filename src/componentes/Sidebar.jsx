import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  IconLayoutDashboard, 
  IconChartBar, 
  IconChevronDown, 
  IconChevronRight,
  IconUsers,
  IconShoppingCart,
  IconSettings,
  IconFileText,
  IconTrendingUp,
  IconApi,
  IconLoader
} from '@tabler/icons-react';

const Sidebar = ({ onNavigate }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action d-flex align-items-center ${isActive ? 'active' : ''}`;

  const submenuItemClass = ({ isActive }) =>
    `list-group-item list-group-item-action ps-4 ${isActive ? 'active' : ''}`;

  return (
    <aside className="card">
      <div className="list-group list-group-flush">
        {/* Dashboard */}
        <NavLink to="/" className={linkClass} onClick={onNavigate}>
          <IconLayoutDashboard className="me-2" size={18} />
          <span>Dashboard</span>
        </NavLink>

        {/* Reports com submenu */}
        <div>
          <button
            className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
            onClick={() => toggleMenu('reports')}
            type="button"
          >
            <div className="d-flex align-items-center">
              <IconChartBar className="me-2" size={18} />
              <span>Relatórios</span>
            </div>
            {openMenus.reports ? 
              <IconChevronDown size={16} /> : 
              <IconChevronRight size={16} />
            }
          </button>
          
          <div className={`collapse ${openMenus.reports ? 'show' : ''}`}>
            <NavLink to="/reports" className={submenuItemClass} onClick={onNavigate}>
              <IconTrendingUp className="me-2" size={16} />
              <span>Relatórios Gerais</span>
            </NavLink>
            <NavLink to="/reports/sales" className={submenuItemClass} onClick={onNavigate}>
              <IconShoppingCart className="me-2" size={16} />
              <span>Vendas</span>
            </NavLink>
            <NavLink to="/reports/users" className={submenuItemClass} onClick={onNavigate}>
              <IconUsers className="me-2" size={16} />
              <span>Usuários</span>
            </NavLink>
          </div>
        </div>

        {/* Gestão com submenu */}
        <div>
          <button
            className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
            onClick={() => toggleMenu('management')}
            type="button"
          >
            <div className="d-flex align-items-center">
              <IconUsers className="me-2" size={18} />
              <span>Gestão</span>
            </div>
            {openMenus.management ? 
              <IconChevronDown size={16} /> : 
              <IconChevronRight size={16} />
            }
          </button>
          
          <div className={`collapse ${openMenus.management ? 'show' : ''}`}>
            <NavLink to="/users" className={submenuItemClass} onClick={onNavigate}>
              <IconUsers className="me-2" size={16} />
              <span>Usuários</span>
            </NavLink>
            <NavLink to="/products" className={submenuItemClass} onClick={onNavigate}>
              <IconShoppingCart className="me-2" size={16} />
              <span>Produtos</span>
            </NavLink>
          </div>
        </div>

        {/* APIs com submenu */}
        <div>
          <button
            className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
            onClick={() => toggleMenu('apis')}
            type="button"
          >
            <div className="d-flex align-items-center">
              <IconApi className="me-2" size={18} />
              <span>APIs</span>
            </div>
            {openMenus.apis ? 
              <IconChevronDown size={16} /> : 
              <IconChevronRight size={16} />
            }
          </button>
          
          <div className={`collapse ${openMenus.apis ? 'show' : ''}`}>
            <NavLink to="/api-example" className={submenuItemClass} onClick={onNavigate}>
              <IconApi className="me-2" size={16} />
              <span>Exemplo Básico</span>
            </NavLink>
            <NavLink to="/api-hooks" className={submenuItemClass} onClick={onNavigate}>
              <IconLoader className="me-2" size={16} />
              <span>Com Hooks</span>
            </NavLink>
            <NavLink to="/loading-states" className={submenuItemClass} onClick={onNavigate}>
              <IconLoader className="me-2" size={16} />
              <span>Estados Loading</span>
            </NavLink>
          </div>
        </div>

        {/* Hooks com submenu */}
        <div>
          <button
            className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
            onClick={() => toggleMenu('hooks')}
            type="button"
          >
            <div className="d-flex align-items-center">
              <IconFileText className="me-2" size={18} />
              <span>Hooks</span>
            </div>
            {openMenus.hooks ? 
              <IconChevronDown size={16} /> : 
              <IconChevronRight size={16} />
            }
          </button>
          
          <div className={`collapse ${openMenus.hooks ? 'show' : ''}`}>
            <NavLink to="/hooks-example" className={submenuItemClass} onClick={onNavigate}>
              <IconFileText className="me-2" size={16} />
              <span>Hooks Básicos</span>
            </NavLink>
            <NavLink to="/custom-hooks" className={submenuItemClass} onClick={onNavigate}>
              <IconSettings className="me-2" size={16} />
              <span>Hooks Customizados</span>
            </NavLink>
          </div>
        </div>

        {/* Formulário */}
        <NavLink to="/form" className={linkClass} onClick={onNavigate}>
          <IconFileText className="me-2" size={18} />
          <span>Formulário</span>
        </NavLink>

        {/* Configurações */}
        <NavLink to="/settings" className={linkClass} onClick={onNavigate}>
          <IconSettings className="me-2" size={18} />
          <span>Configurações</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;