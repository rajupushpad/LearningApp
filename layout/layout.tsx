import Header from './header';
import Footer from './footer';

function Layout(props:any) {
    return(
        <div>
            <Header />
                {props.children}
            <Footer />
        </div>
    )
}

export default Layout;