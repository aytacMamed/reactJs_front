import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () =>{
    return (
        <>
        <Navbar bg="primary" variant="dark">
            <Container>
<Navbar.Brand to="/"><strong>Product Managment System</strong></Navbar.Brand>
<Nav className="ml-auto">
    <Nav.Link as={Link} to="/" className="nav-link">Products</Nav.Link>
    <Nav.Link as={Link} to="/product" className="nav-link">Post Product</Nav.Link>

</Nav>
            </Container>
        </Navbar>
        </>
    )
}
export default Header;