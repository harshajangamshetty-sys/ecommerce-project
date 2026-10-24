import { Header } from "../../components/Header";
import './NotFoundPage.css'

export function NotFoundPage () {
    return (
        <>
         <Header/>

         <div className="not-found-container"><p>Page not found</p></div>
        </>
    );
}