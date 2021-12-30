import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCustomerServer, updateCustomerServer} from './CustomersSlice';

/**
 * Customer form component
 */
export default function CustomerForm(props){
    
    //initilize hooks needed
    const status = useSelector(state => state.customers.status);
    const error = useSelector(state => state.customers.error);
    const dispatch = useDispatch();
    const closeBtnRef = useRef(null);
    const [customerErr, setCustomerErr] = useState({
        first_name: null, 
        last_name: null, 
        email: null, 
        phone: null, 
    });

    //configure initial state
    let customerOnLoad = props.customer;
    let action = 'update';
    if(props.customer == null){
        customerOnLoad = {
                        first_name: "", 
                        last_name: "", 
                        email: "", 
                        phone: "", 
                    };
        action = 'insert';
    }
    const [customer, setCustomer] = useState(customerOnLoad);
    
    
    //handle input value changes
    function handleInputChange(e) {
        setCustomer( {...customer, [e.target.name]: e.target.value} );
    }

    
    //handle save event
    function handleSave(){
        if(action === 'insert'){
            dispatch(addCustomerServer(customer))
        }else if (action === 'update'){
            dispatch(updateCustomerServer(customer))
        }
    }

    //change state if customer changed
    useEffect(() => {
        if(props.customer == null){
            setCustomer({
                            first_name: "", 
                            last_name: "", 
                            email: "", 
                            phone: "", 
                        });
        }else{
            setCustomer(props.customer);
        }
        setCustomerErr({
            message: null,
            first_name: null, 
            last_name: null, 
            email: null, 
            phone: null, 
        });
    }, [props.customer])


    //handle state changes when have err msgs or saved.
    useEffect(() => {
        let errMsg = "";
        let first_name_err, last_name_err, email_err, phone_err = null;

        if(status === 'validation_failed'){
            errMsg = <div className="alert alert-danger" role="alert">{error.message}</div>;

            if(error.errors){
                if(error.errors.first_name != null){
                    first_name_err = <div className="invalid-feedback">{error.errors.first_name.toString()} </div>
                }
                if(error.errors.last_name != null){
                    last_name_err = <div className="invalid-feedback">{error.errors.last_name.toString()} </div>
                }
                if(error.errors.email != null){
                    email_err = <div className="invalid-feedback">{error.errors.email.toString()} </div>
                }
                if(error.errors.phone != null){
                    phone_err = <div className="invalid-feedback">{error.errors.phone.toString()} </div>
                }
                setCustomerErr({
                    message: errMsg,
                    first_name: first_name_err,
                    last_name: last_name_err,
                    email: email_err,
                    phone: phone_err
                })
            }
        }else if (status === 'created' || status === 'saved'){
            closeBtnRef.current.click();
        }
    }, [status, error]);

    //handle modal close event
    function handleClose(){
        if(action === 'insert'){
            setCustomer({
                first_name: "", 
                last_name: "", 
                email: "", 
                phone: "", 
            });
        } else if (action === 'update'){
            setCustomer(props.customer);
        }
        setCustomerErr({
            message: null,
            first_name: null, 
            last_name: null, 
            email: null, 
            phone: null, 
        });
    }
    
    //render the component
    return(
        <>
            <div className="modal fade" id="customerForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Customer</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {customerErr.message}
                        <form id="customer_form">
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input type="text" className={ customerErr.first_name != null ? "form-control is-invalid": "form-control"}  id="first_name" name="first_name" value={customer.first_name} onChange={handleInputChange} />
                                {customerErr.first_name}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input type="text" className={ customerErr.last_name != null ? "form-control is-invalid": "form-control"} id="last_name" name="last_name" value={customer.last_name} onChange={handleInputChange} />
                                {customerErr.last_name}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className={ customerErr.email != null ? "form-control is-invalid": "form-control"} id="email" name="email" value={customer.email} onChange={handleInputChange} />
                                {customerErr.email}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className={ customerErr.phone != null ? "form-control is-invalid": "form-control"} id="phone" name="phone" value={customer.phone} onChange={handleInputChange} />
                                {customerErr.phone}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>handleClose()} data-bs-dismiss="modal" ref={closeBtnRef}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>handleSave()}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <script></script>
        </>
    )
}