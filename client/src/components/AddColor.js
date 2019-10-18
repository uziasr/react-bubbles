import React, {useState} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'

const AddColor = ({ colors, updateColors, getColors } )=> {
    const [newColor, setNewColor] = useState({
        color: "",
        code: { hex: "" }
    })
    const addColor = (e) =>{
        e.preventDefault()
        console.log('this',newColor)
        axiosWithAuth()
        .post('/colors',newColor)
        .then(res=>{
            console.log(res)
            getColors()
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className='addForm'>
            <form>
                <label> set color:
                    <input type='text' name='color' onChange={(e)=>{
                        setNewColor({
                            ...newColor,
                            [e.target.name]:e.target.value
                        })   }
                    }></input>
                </label>
                <label> set hex:
                    <input type='text' name='hex' onChange={(e)=>{
                        console.log(newColor)
                        setNewColor({
                            ...newColor,
                            code:{hex:e.target.value}
                        })}
                    }></input>
                </label>
                <div className='button-row' onClick={addColor}><button type='submit'>Add New Color</button></div>
            </form>
        </div>
    );
};


export default AddColor;