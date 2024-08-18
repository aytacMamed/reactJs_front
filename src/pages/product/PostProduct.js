import "./PostProduct.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const PostProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    brand: "",
    color: "",
  });


  const [categories, setCategories] = useState([]);

  useEffect(() => {

      axios.get('http://localhost:8080/api/categories')  
          .then(response => {
              setCategories(response.data);
          })
          .catch(error => {
              console.error('Error fetching categories:', error);
          });
  }, []);

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
        const response = await fetch("http://localhost:8080/api/products/save",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        });
        const data= await response.json();
        console.log("Product created: ",data);
        navigate("/")
    } catch (error) {
        console.log("Error creating Product:",error.message);
    }
};



  return (
    <>
      <div className="center-form">
        <h1>Post New Product</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="number"
              name="stockQuantity"
              placeholder="Enter stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCategoryId">
                        <Form.Control
                            as="select"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="brand"
              placeholder="Enter brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="color"
              placeholder="Enter color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Post Product
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PostProduct;
