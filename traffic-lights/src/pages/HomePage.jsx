import { Link } from "react-router";

function HomePage() {
  return (
    <section className="traffic-card page-heading">
      <h1>Світлофор</h1>
      <p>Вибирайте сигнал вручну або запускайте автоматичне перемикання кожні 2 секунди.</p>
      <p>На сторінці статистики можна переглянути ручні натискання та поточний стан.</p>
      <Link to="/traffic-light">Перейти до світлофора</Link>
    </section>
  );
}

export default HomePage;
