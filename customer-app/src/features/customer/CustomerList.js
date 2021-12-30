import React, {useEffect, useState} from 'react';
import LocationForm from '../location/LocationForm';
import LocationList from '../location/LocationList';
import CustomerForm from './CustomerForm';
import {useSelector, useDispatch} from 'react-redux';
import {deleteCustomerServer, fetchCustomers, selectAllCustomers} from './CustomersSlice'


/**
 * Modal of Delete Confirmation component
 * 
 * @param {customer} props 
 * @returns 
 */
function DeleteConfirmationModal(props){
    return(
        <div className="modal fade" id="deleteCustomerConfirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Deleting Customer</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Confirm the excluison of the customer {props?.customer?.first_name + " " + props?.customer?.last_name}?</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => props.handleClickDeleteCustomer()}>Delete</button>
            </div>
            </div>
        </div>
        </div>
    )
}

/**
 * Customer Line component
 * 
 * @param {customer} props 
 * @returns 
 */
function CustomerLine(props){

    //handle click event on any button of the row
    function handleOnClick(customer){
        props.setCustomerSelected(customer);
    }

    if(props != null && props.customer != null && props.customer.id != null){
        let customer = props.customer;
        return(
            <tr>
                <td>{customer.id}</td>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td><button type="button" onClick={()=>handleOnClick(props.customer)} className="btn btn-info" data-bs-toggle="modal" data-bs-target="#locationList">{customer.locations.length} Location(s)</button></td>
                <td><button type="button" onClick={()=>handleOnClick(props.customer)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#customerForm">Update</button></td>
                <td><button type="button" onClick={()=>handleOnClick(props.customer)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCustomerConfirm">Delete</button></td>
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

/**
 * Customer Table component
 * 
 * @param {customers, setCustomerSelected} props 
 * @returns 
 */
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
                    {props.customers.map((customer) => <CustomerLine key={customer.id} customer={customer} setCustomerSelected={props.setCustomerSelected} />)}
                </tbody>
            </table>
            );
    }else{
        return(<div>No customers found.</div>)
    }
    
}

/**
 * Customer List feature component
 */
export default function CustomerList(){

    //init hooks
    const customers = useSelector(selectAllCustomers)
    const status = useSelector(state => state.customers.status);
    const error = useSelector(state => state.customers.error);
    const dispatch = useDispatch();

    //load the customer list from backend api
    useEffect(() => {
        if (status === 'not_loaded' ) {
            dispatch(fetchCustomers())
        }
    }, [status, dispatch])

    //state for selected customer
    const [customerSelected, setCustomerSelected] = useState();
    
    //handle delete event
    function handleClickDeleteCustomer(){
        dispatch(deleteCustomerServer(customerSelected.id));
    }
    
    //decides how to render the table given state of customer interaction with the server
    let customerTable;
    if(status === 'loaded' || status === 'created' || status === 'saved' || status === 'deleted' || status === 'validation_failed'){
      customerTable = <CustomerTable customers={customers} setCustomerSelected={setCustomerSelected} />;
    }else if(status === 'loading'){
      customerTable = <div >Loading customers...</div>;
    }else if(status === 'not_loaded'){
      customerTable = '';
    }else{
      //status === 'failed' or any other
      customerTable = <div>Error: {error}</div>;
    }
    
    //render the feature
    return(
        <>
            <h1>Customers List</h1>
            <br/>
            <p><button type="button" className="btn btn-primary" onClick={() => setCustomerSelected(null)} data-bs-toggle="modal" data-bs-target="#customerForm">New Customer</button></p>
            {customerTable}
            <CustomerForm customer={customerSelected} />
            <DeleteConfirmationModal customer={customerSelected} handleClickDeleteCustomer={handleClickDeleteCustomer} />
            <LocationList customer={customerSelected} />
            <LocationForm />
        </>
    );
}