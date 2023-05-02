import { Form, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TextField, Button, AppBar, Toolbar, IconButton, Typography } from "@mui/material";

function CreateInvoice(){
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        clientName:"",
        customerName: "",
        date: new Date().toLocaleDateString("en-CA"),
        item: "",
        itemQty: 0,
        itemPrice: 0,
        total: 0,
    });
    
    const handleChange = (event) => {      
        console.log(event.target);
        const { name, value} = event.target;
        setInvoice((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const handleClick = (event) => {
        event.preventDefault();
    
        axios
            .post("/create", invoice)
            .then((res)=> console.log(res))
            .catch((err) => console.log(err))
 
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Invoice Added Successfully ',
                showConfirmButton: true,
                timer: 2500
              })
    
            navigate("/")
    };
    
    const handleCompute = () => {
        const total = invoice.reduce((acc, curr) => {
          return acc + Number(curr.itemPrice) * Number(curr.itemQty)
        }, 0)
        return total
      }

    return(
            <div style={{ width:"80%", margin:"auto auto",textAlign:"center", boxShadow:"2px 2px 5px", marginTop:"20px"}}  >            
                <AppBar position="static" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                        
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Create an Invoice</Typography>
                    
                </Toolbar>
            </AppBar> 
            <div style={{ width:"90%", margin:"auto auto",textAlign:"left", marginTop:"20px" }} >        
            <Form >
            <Container>
                
                    <Row>
                        <Col>
                            <Form.Group>
                                <TextField name="clientName" label="From" value={invoice.clientName} onChange={handleChange} placeholder="From" />
                            </Form.Group>                           
                        </Col>
                        <Col>
                            <Form.Group>
                                <TextField name="customerName" label="Bill To" value={invoice.customerName} onChange={handleChange} placeholder="Bill To" />
                            </Form.Group>
                        </Col>
                        <Col></Col>
                        <Col>
                            <Form.Group>
                                <TextField label="Date" name="date" type="date" value={invoice.date} onChange={handleChange} placeholder={new Date().toLocaleDateString("en-CA")} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Col>
                        <br>
                        </br>
                    </Col>
                    <Row>
                        <Col>
                            <Form.Group>
                                <TextField label="Item" name="item" value={invoice.item} onChange={handleChange} placeholder="Item" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <TextField label="Item Price" name="itemPrice" type="number" value={invoice.itemPrice} onChange={handleChange} onFocus={(event) => event.target.value = ''} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <TextField label="Quantity" name="itemQty" type="number" value={invoice.itemQty} onChange={handleChange} onFocus={(event) => event.target.value = ''} />
                            </Form.Group>
                        </Col>                       
                        <Col>
                            <Form.Group>
                                <TextField label="Total" name="total" type="number" value={Number(invoice.itemPrice * Number(invoice.itemQty))} onChange={handleCompute} onFocus={(event) => event.target.value = ''} style={{ marginBottom:"2rem" }} disabled={true} />
                            </Form.Group>
                        </Col>
                    </Row>
                 </Container>             
            </Form>

            <Button style={{ width:"100%", marginBottom:"1rem" }} variant="contained" color="primary" onClick={handleClick}>Create Invoice</Button>
            <Button style={{ width:"100%", marginBottom:"1rem"}} variant="contained" color="error" onClick={()=>navigate(-1)}>Cancel</Button>

            </div> 

        </div>
    );
}
export default CreateInvoice;