import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, AppBar, Toolbar, IconButton, Typography, tableCellClasses, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Invoices(){
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [updatedInvoice, setUpdatedInvoice] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios
            .get("/invoices")
            .then((res) => {
                console.log(res);
                setInvoices(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteInvoice = (id) => {
            Swal.fire({
            title: 'Are you sure you want to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios
                .delete(`/delete/${id}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
                Swal.fire(
                'Deleted!',
                'Invoice Deleted Successfully',
                'success')      
              }
              window.location.reload();
            })                  
    };

    const updateInvoice = (invoice) => {
        setUpdatedInvoice(invoice);
        handleShow();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInvoice((prev) => {
            return{
                ...prev,
                [name]:value,
            };
        });
    };

    const saveUpdatedInvoice = () => {

        axios
            .put(`/updated/${updatedInvoice._id}`, updatedInvoice)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            handleClose();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Updated! ',
                text: 'Invoice Updated Successfully',
                showConfirmButton: true,
                timer: 1500
              })          
            window.location.reload();

           
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    
    return (
        
        <div style={{ width:"100%", textAlign:"center", margin:"auto auto" }} >
            <AppBar position="static" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Invoices List</Typography>
                    <Stack direction="row" spacing={2} >
                        <Button variant="outlined" color="inherit" onClick={()=> navigate("create")}>Add Invoice</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                 <Modal.Title>Update a Invoice</Modal.Title>
                   </Modal.Header>
                    <Modal.Body>
                    <Form>
                    <Form.Label>Invoice Number</Form.Label>
                            <Form.Control name="id" value={updatedInvoice._id ? updatedInvoice._id : ""} onChange={handleChange} placeholder="From" disabled={true}/>

                            <Form.Label>From</Form.Label>
                            <Form.Control name="clientName" value={updatedInvoice.clientName ? updatedInvoice.clientName : ""} onChange={handleChange} placeholder="From"/>

                            <Form.Label>Bill To</Form.Label>
                            <Form.Control name="customerName" value={updatedInvoice.customerName ? updatedInvoice.customerName : ""} onChange={handleChange} placeholder="Bill To"/>                 

                            <Form.Label>Invoice Date</Form.Label>
                            <Form.Control name="date" type="date" value={updatedInvoice.date ? updatedInvoice.date : ""} onChange={handleChange} placeholder={new Date().toLocaleDateString("en-CA")} />
                    
                            <Form.Label>Item</Form.Label>
                            <Form.Control name="item" value={updatedInvoice.item ? updatedInvoice.item : ""} onChange={handleChange} placeholder="Item"/>

                            <Form.Label>Item Quantity</Form.Label>
                            <Form.Control name="itemQty" type="number" value={updatedInvoice.itemQty ? updatedInvoice.itemQty : 0} onChange={handleChange} />

                            <Form.Label>Item Price</Form.Label>
                            <Form.Control name="itemPrice" type="number" value={updatedInvoice.itemPrice ? updatedInvoice.itemPrice : 0} onChange={handleChange} />

                    </Form>
              </Modal.Body>
              <Modal.Footer>
                <Stack spacing={2} direction="row">
                <Button variant="outlined" color="success" onClick={saveUpdatedInvoice}>
                Save Changes
               </Button>
                <Button variant="outlined" color="error" onClick={handleClose} >
                Close
               </Button>
               </Stack>
              </Modal.Footer>
              </Modal>
        <div style={{ width:"90%", textAlign:"center", margin:"auto auto", marginTop:"2rem" }}>
           <TableContainer component={Paper}>
           <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center">Invoice Number</StyledTableCell>
                            <StyledTableCell align="center">From</StyledTableCell>
                            <StyledTableCell align="center">Bill To</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Quantity</StyledTableCell>
                            <StyledTableCell align="center">Amount</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                </TableHead>
                <TableBody>
                {invoices.map((invoice) => ( 
                    <StyledTableRow>
                        <StyledTableCell align="center">{invoice._id}</StyledTableCell>
                        <StyledTableCell align="center">{invoice.clientName}</StyledTableCell>
                        <StyledTableCell align="center">{invoice.customerName}</StyledTableCell>
                        <StyledTableCell align="center">{new Date(invoice.date).toLocaleDateString("en-GB").replaceAll("-","/")}</StyledTableCell>
                        <StyledTableCell align="center">{invoice.item}</StyledTableCell>
                        <StyledTableCell align="center">{invoice.itemQty}</StyledTableCell>
                        <StyledTableCell align="center">{Number(invoice.itemPrice * Number(invoice.itemQty))}</StyledTableCell>
                        <StyledTableCell align="center">
                                <IconButton size="large" edge="start" color="inherit" aria-label="update">
                                <EditIcon color="primary" onClick={() => updateInvoice(invoice)}/>    
                                </IconButton>
                                <IconButton  size="large"  fontSize="inherit" edge="start" color="inherit" aria-label="delete">
                                <DeleteIcon color="error" fontSize="inherit" onClick={() => deleteInvoice(invoice._id)}/>
                                </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>       
        </div>
    );
}
export default Invoices;