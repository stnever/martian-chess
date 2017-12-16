var _ = require('lodash')

module.exports = getMoves

// Resultado: lista de Moves:
// [
//   {position: [row,col], type: 'move'},
//   {position: [row,col], type: 'capture'},
//   ...
// ]
function getMoves({state, getters, cell}) {
  switch(cell.piece.rank) {
    case 'pawn' : return getPawnMoves ({state, getters, cell})
    case 'drone': return getDroneMoves({state, getters, cell})
    case 'queen': return getQueenMoves({state, getters, cell})
  }
}

function getPawnMoves({state, getters, cell}) {
  return tryDiagonals(cell, 1, state)
}

function getDroneMoves({state, getters, cell}) {
  return tryOrthogonals(cell, 2, state)
}

function getQueenMoves({state, getters, cell}) {
  return _.chain([
    tryOrthogonals(cell, 8, state),
    tryDiagonals(cell, 8, state),
  ]).flatten().compact().value()
}

function tryDiagonals(cell, num, state) {
  return _.chain([
    tryMoves(cell, [-1,-1], num, state),
    tryMoves(cell, [-1,+1], num, state),
    tryMoves(cell, [+1,-1], num, state),
    tryMoves(cell, [+1,+1], num, state)
  ]).flatten().compact().value()
}

function tryOrthogonals(cell, num, state) {
  return _.chain([
    tryMoves(cell, [0,-1], num, state),
    tryMoves(cell, [0,+1], num, state),
    tryMoves(cell, [-1,0], num, state),
    tryMoves(cell, [+1,0], num, state)
  ]).flatten().compact().value()
}

function tryMove(cell, deltaPos, num, state) {
  var newPos = add(cell.position, deltaPos, num)
  if ( newPos[0] < 0 || newPos[1] < 0 ||
       newPos[0] >= state.maxRows || newPos[1] >= state.maxCols )
    return null // fora da board

  var existing = state.board[newPos[0]][newPos[1]]
  if ( existing.piece == null ) {
    return {type: 'move', position: newPos}
  } else if ( existing.piece.color != state.players[state.activePlayerIndex].color ) {
    return {type: 'capture', position: newPos}
  } else {
    return null // ocupada por uma peça aliada
  }
}

function tryMoves(cell, deltaPos, num, state) {
  var result = []
  for ( var i = 0; i < num; i++ ) {
    var move = tryMove(cell, deltaPos, i+1, state)
    if ( move ) result.push(move)

    // Não prossegue se for uma captura ou se move for null
    if ( move == null || move.type == 'capture' ) break
  }
  return result
}

function add(posA, deltaPos, num=1) {
  return [posA[0] + (deltaPos[0] * num), posA[1] + (deltaPos[1] * num)]
}
