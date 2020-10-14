import React from 'react';
import LiElement from './LiElement';

/**
 * 
 * @param {*} props
 * 
 *  A reusable component for both array of Tags and Categories
 * Array is passed as prop
 * which is mapped 
 * and for each element a Card is rendered 
 */

function RelatedtagsAndCategories(props) {
    return (
        <div>
             <div>
            <ul>
                {props.data.map((value,index)=>{
                    return <LiElement stringVal={value}/>
                })}
            </ul>
        </div>
        </div>
    );
}

export default RelatedtagsAndCategories;