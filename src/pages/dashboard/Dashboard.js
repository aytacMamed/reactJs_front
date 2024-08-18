import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchProducts = async () =>{
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    fetchProducts();
  }, []);

  
  const handleDelete = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setProducts((prevProducts) =>
                prevProducts.filter(product => product.id !== productId)
            );
            console.log(`Product with ID ${productId} deleted successfully`);
        } else {
            console.error('Failed to delete product:', response.statusText);
        }
    } catch (error) {
        console.error("Error deleting product:", error.message);
    }
}


const handleUpdate = (productId) =>{
  navigate(`/product/${productId}`);
}


  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center">Products</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>name</th>
                  <th>description</th>
                  <th>price</th>
                  <th>stockQuantity</th>
                  <th>category</th>
                  <th>brand</th>
                  <th>color</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{product.categoryName}</td>
                    <td>{product.brand}</td>
                    <td>{product.color}</td>
                    <td>
                      <Button variant="outline-secondary" onClick={()=> handleUpdate(product.id)}>Update</Button>{" "}
                      <Button variant="outline-danger" onClick={()=> handleDelete(product.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
