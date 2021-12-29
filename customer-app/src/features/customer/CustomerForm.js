import React from 'react';

export default function CustomerForm(){
    return(
        <>
            <div className="modal fade" id="customerForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Customer</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="first_name" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="first_name" name="first_name"/>
                            </div>
                            <div className="mb-3">
                                <label for="last_name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="last_name" name="last_name"/>
                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email"/>
                            </div>
                            <div className="mb-3">
                                <label for="phone" className="form-label">Phone</label>
                                <input type="phone" className="form-control" id="phone" name="phone"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}