import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="min-h-screen min-w-screen grid">
            <Header />
            <main className="p-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}