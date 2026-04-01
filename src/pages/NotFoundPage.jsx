import { Header } from '../Components/Header';
import './NotFoundPage.css'

export function NotFoundPage( { cart }) {
  return (
    <>
    <title> 404 Page not found</title>
    <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

    <Header  cart={cart}/>

    <div className="not-found-message">
      Page not found
    </div>
    </>
  );
}