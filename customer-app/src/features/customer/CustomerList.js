import React from 'react';
import LocationForm from '../location/LocationForm';
import LocationList from '../location/LocationList';
import CustomerForm from './CustomerForm';


function DeleteConfirmationModal(){
    return(
        <div className="modal fade" id="deleteCustomerConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


export default function CustomerList(){
    return(
        <>
            <h1>Customers List</h1>
            <br/>
            <p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#customerForm">New Customer</button></p>
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
                <tr>
                    <td>1</td>
                    <td>Diogo</td>
                    <td>Mendonça</td>
                    <td>diogosmendonca@gmail.com</td>
                    <td>(21) 971771155</td>
                    <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#locationList">1 Location(s)</button></td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#customerForm">Update</button></td>
                    <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCustomerConfirm">Delete</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Taliha</td>
                    <td>Mendonça</td>
                    <td>talihavet@gmail.com</td>
                    <td>(21) 99625-0054</td>
                    <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#locationList">2 Location(s)</button></td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#customerForm">Update</button></td>
                    <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCustomerConfirm">Delete</button></td>
                </tr>
                </tbody>
            </table>
            <CustomerForm/>
            <DeleteConfirmationModal />
            <LocationList />
            <LocationForm />
        </>
    );
}