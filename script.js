document.addEventListener("DOMContentLoaded", () => {
    const chessBoard = document.getElementById("chess-board");
  
    // Unicode for chess pieces
    const initialPieces = {
      0: ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
      1: ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      6: ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      7: ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    };
  
    let selectedPiece = null;
    let selectedSquare = null;
  
    // Generate the chessboard
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = row;
        square.dataset.col = col;
  
        // Alternate colors
        if ((row + col) % 2 === 0) {
          square.classList.add("white");
        } else {
          square.classList.add("black");
        }
  
        // Add pieces if in initial position
        if (initialPieces[row] && initialPieces[row][col]) {
          const piece = document.createElement("div");
          piece.classList.add("piece");
          piece.textContent = initialPieces[row][col];
          piece.dataset.color = row < 2 ? "black" : "white"; // Assign color to pieces
          square.appendChild(piece);
        }
  
        // Add click listener to the square
        square.addEventListener("click", () => handleSquareClick(square));
  
        chessBoard.appendChild(square);
      }
    }
  
    // Handle square click
    function handleSquareClick(square) {
      if (selectedPiece) {
        const targetPiece = square.querySelector(".piece");
  
        // Check if square is occupied by an opponent's piece
        if (targetPiece && targetPiece.dataset.color !== selectedPiece.dataset.color) {
          // Capture the opponent's piece
          targetPiece.remove();
          movePieceToSquare(square);
        } else if (!targetPiece) {
          // Move to an empty square
          movePieceToSquare(square);
        } else {
          // Deselect if clicking on a square with the same color piece
          deselect();
        }
      } else {
        // Select a piece
        const piece = square.querySelector(".piece");
        if (piece) {
          selectedPiece = piece;
          selectedSquare = square;
          square.classList.add("selected");
        }
      }
    }
  
    // Move the piece to the target square
    function movePieceToSquare(square) {
      square.appendChild(selectedPiece);
      deselect();
    }
  
    // Deselect the current selection
    function deselect() {
      if (selectedSquare) {
        selectedSquare.classList.remove("selected");
      }
      selectedPiece = null;
      selectedSquare = null;
    }
  });
  