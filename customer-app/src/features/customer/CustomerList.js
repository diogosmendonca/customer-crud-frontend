import React, {useEffect} from 'react';
import LocationForm from '../location/LocationForm';
import LocationList from '../location/LocationList';
import CustomerForm from './CustomerForm';
import {useSelector, useDispatch} from 'react-redux';
import {deleteCustomersServer, fetchCustomers, selectAllCustomers} from './CustomersSlice'



function DeleteConfirmationModal(){
    return(
        <div className="modal fade" id="deleteCustomerConfirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Deleting Customer</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Confirm the excluison of the customer?</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
        </div>
    )
}

function CustomerLine(props){

    if(props != null && props.customer != null && props.customer.id != null){
        let customer = props.customer;
        return(
            <tr>
                <td>{customer.id}</td>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td><button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#locationList">{customer.locations.length} Location(s)</button></td>
                <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#customerForm">Update</button></td>
                <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCustomerConfirm">Delete</button></td>
            </tr>
        );
    }else{
        return(
            <tr>
                <td colSpan={8}>It was not possible to show the customer.</td>
            </tr>
        );
    }
}

function CustomerTable(props){
    if(props != null && props.customers != null && props.customers.length > 0){
        return(
            <table className="table table-striped">
                <thead className="table-light ">
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Locations</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.customers.map((customer) => <CustomerLine key={customer.id} customer={customer} />)}
                </tbody>
            </table>
            );
    }else{
        return(<div>No customers found.</div>)
    }
    
}

export default function CustomerList(){

    const customers = useSelector(selectAllCustomers)
    const status = useSelector(state => state.customers.status);
    const error = useSelector(state => state.customers.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded' ) {
            dispatch(fetchCustomers())
        }
    }, [status, dispatch])
    
    
    let customerTable;
    if(status === 'loaded' || status === 'saved' || status === 'deleted'){
      customerTable = <CustomerTable customers={customers} />;
    }else if(status === 'loading'){
      customerTable = <div >Loading customers...</div>;
    }else if(status === 'not_loaded'){
      customerTable = '';
    }else{
      //status === 'failed' or any other
      customerTable = <div>Error: {error}</div>;
    }
    
    return(
        <>
            <h1>Customers List</h1>
            <br/>
            <p><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#customerForm">New Customer</button></p>
            {customerTable}
            <CustomerForm/>
            <DeleteConfirmationModal />
            <LocationList />
            <LocationForm />
        </>
    );
}