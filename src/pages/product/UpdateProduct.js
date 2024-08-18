import './UpdateProduct.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
        // Fetch categories
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(response.data); // Categories'ları state'e atama
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        // Fetch product data
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching product:", error.message);
            }
        };
        fetchProduct();
    }, [id]);



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: "PATCH", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Product updated: ", data);
            navigate("/"); 
        } catch (error) {
            console.log("Error updating product:", error.message);
        }
    }; 
  
    return (
        <>
            <div className="center-form">
                <h1>Edit Product</h1>
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

                    <Form.Group controlId="formBasicDescription">
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Control
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicStockQuantity">
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

                    <Form.Group controlId="formBasicBrand">
                        <Form.Control
                            type="text"
                            name="brand"
                            placeholder="Enter brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicColor">
                        <Form.Control
                            type="text"
                            name="color"
                            placeholder="Enter color"
                            value={formData.color}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Edit Product
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default UpdateProduct;
