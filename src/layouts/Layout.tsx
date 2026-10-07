import { Outlet } from "react-router-dom"
import Header from "../components/Heades"

export default function Layout() {
    return (
        <>
            <Header/>
            
            <main className="container mx-auto py-16">
                <Outlet/>
            </main>
        </>
    )
}
