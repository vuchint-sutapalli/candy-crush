import React from 'react';
import StripedCandy from '../stripedCandy';
import { useEffect } from 'react';


const CommoncandySkeleton = ({ color, index, type, handleDragStart, handleDragDrop,handleDragEnd }) => {

    // useEffect(() => {

    // if(type === 'hidden') {

    // }
    
    // }, [type]);
    return (
        <>
            {
               color && color.length ? (
                <img
                    src = {type === 'normal' ? `/images/${color}.png`: `/images/${color}-Striped-Horizontal.png`}
                    key={index}
                    class = {`element ${type}`}
                    draggable={true}
                    data-id={index}
                    data-color={color}
                    data-type={type}
                    onDragStart={handleDragStart}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={handleDragDrop}
                    onDragEnd={handleDragEnd}
                    >
                </img>
               ) : (
                <span class="empty element hidden"></span>
               )
            }
        </>
     )
  };
  

const Candy = (props) => {
  return (
    <>
    {
        props.type && props.type !== 'normal' ? (
            <CommoncandySkeleton {...props}/>
        ) : (
            <StripedCandy {...props}>
                <CommoncandySkeleton {...props} />
            </StripedCandy>
        )
    }
    </>

  );
};

export default Candy;