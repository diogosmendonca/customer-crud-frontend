import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addLocationServer} from './LocationsSlice';
import {fetchCustomers} from '../customer/CustomersSlice';

/**
 * Location Insert Form component
 * 
 * @param {customer} props 
 * @returns 
 */
export default function LocationForm(props){

    //initilize hooks needed
    const status = useSelector(state => state.locations.status);
    const error = useSelector(state => state.locations.error);
    const dispatch = useDispatch();
    const closeBtnRef = useRef(null);

    //configure initial state
    const [locationErr, setLocationErr] = useState({
        address: null, 
        city: null, 
        state: null, 
        zip: null, 
    });
    let locationOnLoad = {
        address: "", 
        city: "", 
        state: "", 
        zip: "", 
        customer_id: null,
    }
    const [location, setLocation] = useState(locationOnLoad);

    //update customer_id when props changes
    useEffect(() => {
        if(props != null && props.customer != null)
            setLocation( location => {return {...location, customer_id: props.customer.id}})
    }, [props, props.customer, setLocation]);
    

    //handle input value changes
    function handleInputChange(e) {
        setLocation( {...location, [e.target.name]: e.target.value} );
    }
    
    //handle save event
    async function handleSave(){
        let response = (await dispatch(addLocationServer(location)).unwrap());
        if (response.status === 201)
            dispatch(fetchCustomers());
    }

    //handle state changes when have err msgs or saved.
    useEffect(() => {
        let errMsg = "";
        let address_err, city_err, state_err, zip_err = null;

        if(status === 'validation_failed'){
            errMsg = <div className="alert alert-danger" role="alert">{error.message}</div>;

            if(error.errors){
                if(error.errors.address != null){
                    address_err = <div className="invalid-feedback">{error.errors.address.toString()} </div>
                }
                if(error.errors.city != null){
                    city_err = <div className="invalid-feedback">{error.errors.city.toString()} </div>
                }
                if(error.errors.state != null){
                    state_err = <div className="invalid-feedback">{error.errors.state.toString()} </div>
                }
                if(error.errors.zip != null){
                    zip_err = <div className="invalid-feedback">{error.errors.zip.toString()} </div>
                }
                setLocationErr({
                    message: errMsg,
                    address: address_err,
                    city: city_err,
                    state: state_err,
                    zip: zip_err
                })
            }
        }else if (status === 'created'){
            closeBtnRef.current.click();
        }
    }, [status, error]);

    
    //handle modal close event
    function handleClose(){
        setLocation({
            address: "", 
            city: "", 
            state: "", 
            zip: "", 
        });
        setLocationErr({
            message: null,
            address: null, 
            city: null, 
            state: null, 
            zip: null, 
        });
    }

    return(
        <>
            <div className="modal fade" id="locationForm" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Location</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {locationErr.message}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className={ locationErr.address != null ? "form-control is-invalid": "form-control"}  id="address" name="address" value={location.address} onChange={handleInputChange}/>
                                {locationErr.address}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className={ locationErr.city != null ? "form-control is-invalid": "form-control"} id="city" name="city" value={location.city} onChange={handleInputChange}/>
                                {locationErr.city}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className={ locationErr.state != null ? "form-control is-invalid": "form-control"} id="state" name="state" value={location.state} onChange={handleInputChange}/>
                                {locationErr.state}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zip" className="form-label">Zip Code</label>
                                <input type="text" className={ locationErr.zip != null ? "form-control is-invalid": "form-control"} id="zip" name="zip" value={location.zip} onChange={handleInputChange}/>
                                {locationErr.zip}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>handleClose()}  data-bs-toggle="modal" data-bs-target="#locationList" ref={closeBtnRef}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>handleSave()} >Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
