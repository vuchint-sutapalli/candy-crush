import { type } from '@testing-library/user-event/dist/type';
import './board.css';

import Candy from './components/candy';

import StripedCandy from './components/stripedCandy';

import { useEffect, useState } from 'react';

// function checkWrappedCandy(matrix, row, column):
//     if column + 2 < matrix[row].length and row + 1 < matrix.length:
//         if matrix[row][column] is same color as matrix[row][column+1] and
//            matrix[row][column+1] is same color as matrix[row][column+2] and
//            matrix[row][column+2] is same color as matrix[row+1][column+2]:
//             // Wrapped candy found
//             markAsWrappedCandy(matrix, row, column)
//             markAsWrappedCandy(matrix, row, column+1)
//             markAsWrappedCandy(matrix, row, column+2)
//             markAsWrappedCandy(matrix, row+1, column+2)
// function checkForSpecialCandies(matrix):
//     for each row in matrix:
//         for each column in row:
//             if matrix[row][column] is a candy:
//                 checkHorizontalStripedCandy(matrix, row, column)
//                 checkVerticalStripedCandy(matrix, row, column)

// function checkHorizontalStripedCandy(matrix, row, column):
//     if column + 3 < matrix[row].length:
//         if matrix[row][column] is same color as matrix[row][column+1] and
//            matrix[row][column+1] is same color as matrix[row][column+2] and
//            matrix[row][column+2] is same color as matrix[row][column+3]:
//             // Striped candy found in a row
//             markAsStripedCandy(matrix, row, column)
//             markAsStripedCandy(matrix, row, column+1)
//             markAsStripedCandy(matrix, row, column+2)
//             markAsStripedCandy(matrix, row, column+3)

// function checkVerticalStripedCandy(matrix, row, column):
//     if row + 3 < matrix.length:
//         if matrix[row][column] is same color as matrix[row+1][column] and
//            matrix[row+1][column] is same color as matrix[row+2][column] and
//            matrix[row+2][column] is same color as matrix[row+3][column]:
//             // Striped candy found in a column
//             markAsStripedCandy(matrix, row, column)
//             markAsStripedCandy(matrix, row+1, column)
//             markAsStripedCandy(matrix, row+2, column)
//             markAsStripedCandy(matrix, row+3, column)

// function markAsStripedCandy(matrix, row, column):
//     // Mark the candy at the given row and column as a striped candy
//     matrix[row][column] = striped candy

const Board = ({rows, columns, colors}) => {

    const [boardColors, setBoardColors] = useState([]);
    const [squareBeingDragged, setSquareBeingDragged] = useState(null);
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);


  // Similar to componentDidMount and componentDidUpdate:

  const handleDragStart = (e) => {
    setSquareBeingDragged(e.target);
  }
  const handleDragEnd = (e) => {
    
   
    e.preventDefault();

    
  }


//   const checkForSpecialCandies = (matrix) => {

//   }
//     for each row in matrix:
//         for each column in row:
//             if matrix[row][column] is a candy:
//                 checkHorizontalStripedCandy(matrix, row, column)
//                 checkVerticalStripedCandy(matrix, row, column)

// function checkHorizontalStripedCandy(matrix, row, column):
//     if column + 3 < matrix[row].length:
//         if matrix[row][column] is same color as matrix[row][column+1] and
//            matrix[row][column+1] is same color as matrix[row][column+2] and
//            matrix[row][column+2] is same color as matrix[row][column+3]:
//             // Striped candy found in a row
//             markAsStripedCandy(matrix, row, column)
//             markAsStripedCandy(matrix, row, column+1)
//             markAsStripedCandy(matrix, row, column+2)
//             markAsStripedCandy(matrix, row, column+3)

  const getValidMoves = (squareBeingDraggedId) => {
    let  validMoves = [];

    let firstColumnItems = [...Array(rows)].map((x, i) => {
        return i*columns
    })
    

    let firstRowItems = [...Array(columns)].map((x, i) => {
        return i
    })

    console.log(firstColumnItems, firstRowItems)

    if(!firstRowItems.includes(squareBeingDraggedId)){
        validMoves.push(squareBeingDraggedId - columns)
    }

    if(!firstColumnItems.includes(squareBeingDraggedId)){
        validMoves.push(squareBeingDraggedId - 1)
    }

    //check for last row
    if(!firstRowItems.includes((rows*columns)-squareBeingDraggedId-1)){
        validMoves.push(squareBeingDraggedId + columns)
    }

    //check for last column
     if(!firstColumnItems.includes((squareBeingDraggedId-columns + 1))){
        validMoves.push(squareBeingDraggedId + 1)
    }

    return validMoves;
  }

  function generateNewElements(grid) {
    let currentArrangement = [...grid];
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        let currentObj = currentArrangement[(row)*columns + col];
        if (Object.keys(currentObj).length === 0 && currentObj.constructor === Object) {
        // if (currentObj.type === 'hidden') {

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            currentArrangement[(row)*columns + col] = {color: randomColor, type: 'normal'}
        }
      }
    }
    setBoardColors([...currentArrangement])
  }
  const moveElementsToFillVacantSpots = (currentArrangement) => {
    for (let col = 0; col < columns; col++) {
        let emptySpaces = 0;
        for (let row = rows-1; row >= 0; row--) {
            let currentObj = currentArrangement[(row)*columns + col];
          if (Object.keys(currentObj).length === 0 && currentObj.constructor === Object) {
            // if (currentObj.type === 'hidden') {
            emptySpaces++;
          } else if (emptySpaces > 0) {
            let tempRow = row + emptySpaces
            currentArrangement[(tempRow)*columns + col] = currentArrangement[(row)*columns + col]
            currentArrangement[(row)*columns + col] = {};
          }
        }
      }
    setBoardColors([...currentArrangement])

    setTimeout(() => {
        generateNewElements(currentArrangement)
    }, 0);

   
  }

  function checkThreeInARow(currentArrangement) {
    // Check horizontally for three in a row
        let isMatchFound = false;
        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= columns-2; col++) {

                let rowindex = (row-1)*columns + col -1
                const element = currentArrangement[rowindex]
                if (
                element && element.color && 
                element.color === currentArrangement[rowindex+1].color &&
                element.color === currentArrangement[rowindex+2].color
                ) {
                    isMatchFound =true;
                    console.log("found 3 in row!!")
                    currentArrangement[rowindex] = currentArrangement[rowindex+1] = currentArrangement[rowindex+2] = {};

                    setBoardColors([...currentArrangement])

                    setTimeout(() => {
                        moveElementsToFillVacantSpots(currentArrangement);
                    }, 2000);
                // Found three in a row horizontally
                // Perform your logic here (e.g., remove the matching elements, update the grid, etc.)
                }
        
            }
        }
        return isMatchFound;
    }
  const handleDragDrop = (e) => {
    let targetSquare = e.target
    console.log("Drag DROP", e.target);
    setSquareBeingReplaced(e.target);
    const squareBeingDraggedId = parseInt(
        squareBeingDragged.getAttribute("data-id")
      );
    const squareBeingReplacedId = parseInt(
        targetSquare.getAttribute("data-id")
    );

    let currentArrangement = [...boardColors]
    let currentArrangementClone = [...boardColors]
  
    currentArrangement[squareBeingReplacedId] = {
        type : squareBeingDragged.getAttribute("data-type"),
        color: squareBeingDragged.getAttribute("data-color")
    }

    currentArrangement[squareBeingDraggedId] = {
        type : targetSquare.getAttribute("data-type"),
        color: targetSquare.getAttribute("data-color")
    }
        
    // currentArrangement[squareBeingDraggedId] =
    //     targetSquare.getAttribute("data-color");
   
    const validMoves = getValidMoves(squareBeingDraggedId)

    console.log(   `valid moves for ${squareBeingDraggedId} are ${validMoves} `)
      const isValidMove = validMoves.includes(squareBeingReplacedId);
      if (isValidMove) {
            setBoardColors([...currentArrangement]);


            // const isAColumnOfFour = checkForColumnOfFour();
            // const isARowOfFour = checkForRowOfFour();
            // const isAColumnOfThree = checkForColumnOfThree();
            const isARowOfThree = checkThreeInARow(currentArrangement)
            if (squareBeingReplacedId && isValidMove && (isARowOfThree)) {
                setSquareBeingDragged(null);
                setSquareBeingReplaced(null);
            }else {
                setBoardColors([...currentArrangementClone]);
            }
            //else if(squareBeingReplacedId && isValidMove) {
            //     currentArrangement[squareBeingReplacedId] = {
            //         type : squareBeingReplaced.getAttribute("data-type"),
            //         color: squareBeingReplaced.getAttribute("data-color")
            //     }
            //     currentArrangement[squareBeingDraggedId] = {
            //         type : squareBeingDragged.getAttribute("data-type"),
            //         color: squareBeingDragged.getAttribute("data-color")
            //     }
            //     setBoardColors([...currentArrangement]);
            // }
      } else {
        // currentArrangement[squareBeingReplacedId] =
        //     squareBeingDragged.getAttribute("data-color");
        // currentArrangement[squareBeingDraggedId] =
        //     targetSquare.getAttribute("data-color");
        setBoardColors([...currentArrangementClone]);
      }
  
      
  }

  useEffect(() => {

    let randomColorsArray = [...Array(rows*columns)].map((x, i) => {
        let randInt = Math.floor(colors.length*Math.random());
        // return colors[randInt]
        return {
            type: 'normal',
            color: colors[randInt]
        }
    })

    
    setBoardColors(randomColorsArray);


  }, []);
  useEffect(() => {

        const timer = setInterval(() => {
            boardColors.length && checkThreeInARow(boardColors);
        }, 100);

        return () => clearInterval(timer)


  }, [checkThreeInARow, boardColors]);



    return (
        <div id="board" style={{width: (columns*50) + 'px', height: (rows*50 ) + 'px'}}  data-width={columns*50} data-height={rows*50}>
            {
                boardColors.map((colorObj, index) => {
                    return <Candy color={colorObj.color} index ={index} type={colorObj.type} handleDragStart={handleDragStart} handleDragDrop={handleDragDrop} handleDragEnd={handleDragEnd} />
                })
            }
            
        </div>
    )
}
export default Board;