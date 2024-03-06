import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCoupon } from '../../actions/couponAction';
import './AddCouponform.css';

const AddCouponForm = () => {
    const [name, setName] = useState('')
    const [code, setCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [validFrom, setValidFrom] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [isActive, setIsActive] = useState(true);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // Add further validation as necessary
        const discountNum = Number(discountPercentage);
        if (discountNum <= 0 || discountNum > 100) {
            alert('Discount percentage must be between 1 and 100.');
            return;
        }

        // Check if the validUntil date is after the validFrom date
        if (validFrom && validUntil && new Date(validFrom) >= new Date(validUntil)) {
            alert('Valid until date must be after valid from date.');
            return;
        }

        const couponData = {
            name,
            code,
            discountPercentage: discountNum,
            validFrom,
            validUntil,
            isActive
        };

        dispatch(createCoupon(couponData));
    };

    return (
        <form onSubmit={submitHandler} className='addCouponForm'>
            <h2>Add Coupon</h2>
            <div>
                <label htmlFor="code">Coupon Name</label>
                <input 
                    id="name"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="code">Coupon Code</label>
                <input 
                    id="code"
                    type="text" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="discountPercentage">Discount Percentage</label>
                <input 
                    id="discountPercentage"
                    type="number" 
                    value={discountPercentage} 
                    onChange={(e) => setDiscountPercentage(e.target.value)} 
                    required            />
                    </div>
                    <div>
                        <label htmlFor="validFrom">Valid From</label>
                        <input 
                            id="validFrom"
                            type="date" 
                            value={validFrom} 
                            onChange={(e) => setValidFrom(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="validUntil">Valid Until</label>
                        <input 
                            id="validUntil"
                            type="date" 
                            value={validUntil} 
                            onChange={(e) => setValidUntil(e.target.value)} 
                        />
                    </div>
                    <div>
                <label htmlFor="isActive">Is Active</label>
                <input 
                    id="isActive"
                    type="checkbox" 
                    checked={isActive} 
                    onChange={(e) => setIsActive(e.target.checked)} 
                />
            </div>
                    <button type="submit">Add Coupon</button>
                </form>
            );
            
            };
            
            export default AddCouponForm;
