import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth'
import AddColor from './AddColor'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);


  const getColors =()=>{
    axiosWithAuth()
    .get('colors')
    .then(res=>{
      console.log(res.data)
      updateColors([...res.data])
    })
    .catch(err=>console.log('err',err.response))
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  console.log(colorToEdit)
  const saveEdit = e => {
    e.preventDefault();
    updateColors(colors.filter(color=>color.id!==colorToEdit.id))
    console.log('updated', colors)
    axiosWithAuth()
    .put(`colors/${colorToEdit.id}`,colorToEdit)
    .then(res=>{
      console.log(res)
      getColors()
    })
    .catch(err=>console.log(err))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${colorToEdit.id}`)
    .then(res=>{
      console.log(res)
      getColors()
    })
    .catch(err=>console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <AddColor getColors={getColors} colors={colors} updateColors={updateColors}/>
    </div>
  );
};

export default ColorList;
