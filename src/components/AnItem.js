import React from 'react';
import { Link } from 'react-router-dom';

const AnItem = ({ id, seller, escrow, metadata, price}) => 
    (
            <div>
                <div><Link to={`/products/${id}`}>ID: {id}</Link></div>
                <div>Seller: {seller}</div>
                <div>Escrow: {escrow}</div>
                <div>MetaData: {metadata}</div>
                <div>Price: {price}</div>
            </div>
        )


export default AnItem;