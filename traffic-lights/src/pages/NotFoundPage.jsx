import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="traffic-card page-heading">
      <h1>404 — Сторінку не знайдено</h1>
      <p>Такої адреси немає.</p>
      <Link to="/">На головну</Link>
    </section>
  );
}

export default NotFoundPage;
