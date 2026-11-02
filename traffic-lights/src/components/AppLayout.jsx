import { NavLink, Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <header className="app-header">
        <nav className="app-nav" aria-label="Головна навігація">
          <NavLink to="/" end>Головна</NavLink>
          <NavLink to="/traffic-light">Світлофор</NavLink>
          <NavLink to="/stats">Статистика</NavLink>
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
