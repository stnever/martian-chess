var _ = require('lodash'),
    getAvailableMoves = require('./Moves')




// Atalho para criar uma peça em um local row,col da board
function mkPiece(state, row, col, color, rank) {
  var id = state.allPieces.length + 1
  var piece = {id, position: [row,col], color, rank}
  state.board[row][col].piece = piece
  state.allPieces.push(piece)
}

// Atalho para criar peças de um player. A sintaxe é:
// mkPlayerPieces(state, 'red', {
//   pawn : [ [0,0], [1,1] ],
//   drone: [ [1,1], [2,2] ],
//   queen: [ [2,2], [3,3] ]
// })
function mkPlayerPieces(state, color, posByRank) {
  _.forOwn(posByRank, (pos, rank) => {
    _.forOwn(pos, onePos => {
      mkPiece(state, onePos[0], onePos[1], color, rank)
    })
  })
}

// mkPiece(0,0, 'red', 'queen')
// mkPiece(0,1, 'red', 'queen')
// mkPiece(0,2, 'red', 'drone')
// mkPiece(1,0, 'red', 'queen')
// mkPiece(1,1, 'red', 'drone')
// mkPiece(1,2, 'red', 'pawn')
// mkPiece(2,0, 'red', 'drone')
// mkPiece(2,1, 'red', 'pawn')
// mkPiece(2,2, 'red', 'pawn')
//
// mkPiece(5,1, 'blue', 'pawn')
// mkPiece(5,2, 'blue', 'pawn')
// mkPiece(5,3, 'blue', 'drone')
// mkPiece(6,1, 'blue', 'pawn')
// mkPiece(6,2, 'blue', 'drone')
// mkPiece(6,3, 'blue', 'queen')
// mkPiece(7,1, 'blue', 'drone')
// mkPiece(7,2, 'blue', 'queen')
// mkPiece(7,3, 'blue', 'queen')

function isSame(posA, posB) {
  return posA[0] == posB[0] && posA[1] == posB[1]
}

function walk(board, fn) {
  _.forEach(board, row => _.forEach(row, cell => fn(cell)))
}

function cellAt(board, pos) {
  return board[pos[0]][pos[1]]
}

function pointsValue(rank) {
  switch (rank) {
    case 'pawn': return 1
    case 'drone': return 2
    case 'queen': return 3
    default: return 0
  }
}

function isInside(pos, region) {
  console.log(JSON.stringify(pos), JSON.stringify(region))
  var top     = region[0][0],
      left    = region[0][1],
      bottom  = region[1][0],
      right   = region[1][1]
  return pos[0] >= top && pos[0] <= bottom && pos[1] >= left && pos[1] <= right
}

module.exports = {
  state: {

    // Começa com "menu" para indicar que estamos no menu;
    // para iniciar o jogo, deve ser setado (via mutation)
    // para "game"
    stage: 'menu',

    // Objetos que representam os dois players
    players: null,

    // Índice do player atual na lista acima
    activePlayerIndex: null,

    // Tamanho da board
    maxCols: 4, maxRows: 8,

    // Array de arrays de cells
    board: null,

    // Lista com todas as peças ativas (não-capturadas)
    allPieces: null,

    // Posição [row,col] da peça selecionada, se houver.
    selectedPiecePos: null,

    // Lista com os movimentos permitidos (se houver uma peça selecionada)
    availableMoves: null
  },
  getters: {
    activePlayer(state) {
      if ( state.players == null ) return null
      return state.players[state.activePlayerIndex]
    },

    // retorna todos os quadrados
    allSquares: state => _.flatten(state.board),

  },
  mutations: {

    newGame(state, {numPlayers=2}={}) {

      state.stage = 'game'

      state.players = [
        {name: 'Player 1', color: 'red' , isWinner: false, score: 0, captures: [], territory: [ [0,0], [3,3] ]},
        {name: 'Player 2', color: 'blue', isWinner: false, score: 0, captures: [], territory: [ [4,0], [7,3] ]},
        // {name: 'Player 3', color: 'green', captures: [], territory: [ [0,4], [3,7] ]},
        // {name: 'Player 4', color: 'yellow', captures: [], territory: [ [4,4], [7,7] ]}
      ]

      state.activePlayerIndex = 0

      state.selectedPiecePos = null

      state.availableMoves = null

      // A Board em si é um array de maxRows linhas, cada uma um array
      // de maxCols colunas, com uma Cell vazia inicialmente.
      state.board = _.times(state.maxRows, i => {
        return _.times(state.maxCols, j => {
          return {position: [i,j], piece: null, move: null}
        })
      })

      state.allPieces = []

      mkPlayerPieces(state, 'red', {
        pawn : [ [1,2], [2,1], [2,2] ],
        drone: [ [0,2], [1,1], [2,0] ],
        queen: [ [0,0], [1,0], [0,1] ],
      })

      mkPlayerPieces(state, 'blue', {
        pawn : [ [5,1], [5,2], [6,1] ],
        drone: [ [5,3], [6,2], [7,1] ],
        queen: [ [6,3], [7,2], [7,3] ],
      })

    },

    selectPiece: (state, position) => state.selectedPiecePos = position,

    setMoves: (state, moves) => {
      console.log('Setting %s moves', moves.length)
      state.availableMoves = moves
      walk(state.board, cell => cell.move = null)
      _.forEach(moves, m => {
        cellAt(state.board, m.position).move = m
      })
    },

    addCapturedPiece: (state, piece) => {
      console.log('capturing piece %s', piece.id)
      _.remove(state.allPieces, {id: piece.id})
      var player = state.players[state.activePlayerIndex]
      player.captures.push(piece)
      player.score += pointsValue(piece.rank)
      cellAt(state.board, piece.position).piece = null
      piece.position = null
    },

    movePiece: (state, {piece, to}) => {
      console.log('moving piece %s to %s', piece, to)
      cellAt(state.board, piece.position).piece = null
      cellAt(state.board, to).piece = piece
      piece.position = to

      // Encontra o player cujo território contém este
      // quadrado e seta a cor da peça para ele.
      var controllingPlayer = _.find(state.players, p => {
        return isInside(to, p.territory)
      })

      piece.color = controllingPlayer.color
    },

    setActivePlayerIndex: (state, newIndex) => {
      state.activePlayerIndex = newIndex
    },

    gameOver(state) {
      state.stage = 'end'
      _.maxBy(state.players, 'score').isWinner = true
    }

  },

  actions: {
    squareClicked({commit, state, getters, dispatch}, position) {
      // Ignora clicks se o jogo já terminou
      if ( state.stage == 'end' ) return

      var cell = cellAt(state.board, position)

      // Se não temos uma peça selecionada:
      //    Se na cell há uma peça do jogador corrente, seleciona (calcula possibleMoves e marca isSelected)
      //    Se na cell há uma peça do oponente, ou está vazia, ignora
      if ( state.selectedPiecePos == null ) {
        if ( cell.piece == null || cell.piece.color != getters.activePlayer.color ) return

        // seleciona a peça, calcula moves
        return dispatch('pieceSelected', position)
      }

      // Se temos uma peça selecionada:
      //    Se na cell existe um .possibleMove, executa esse move (remove os possibleMoves antigos, aplica alterações no gameState)
      //    Se não existe um .possibleMove, mas há uma peça do jogador corrente, seleciona esta e deseleciona a anterior
      //    Caso contrário, ignora
      else {
        var move = cell.move
        if ( move != null ) {

          // Se o move era do tipo 'capture', captura a peça
          if ( move.type == 'capture' ) {
            commit('addCapturedPiece', cell.piece)
          }

          // Em seguida, move a peça selecionada
          var selectedPiece = cellAt(state.board, state.selectedPiecePos).piece
          commit('movePiece', {piece: selectedPiece, to: position})

          // Se este movimento fez com que o player atual fique sem peças
          // (pois todas foram oferecidas ao oponente), termina o jogo.
          var remainingPieces = _.filter(state.allPieces, p => p.color == getters.activePlayer.color)
          if ( remainingPieces.length < 1 )
            commit('gameOver')

          // Reseta os moves
          commit('setMoves', [])


          // Muda o player atual
          var newIndex = (state.activePlayerIndex + 1) % state.players.length
          commit('setActivePlayerIndex', newIndex)

        }
        else if ( cell.piece != null && cell.piece.color == getters.activePlayer.color )
          // seleciona a peça, calcula moves
          return dispatch('pieceSelected', position)
      }
    },

    pieceSelected({commit, state, getters}, position) {
      // seleciona a peça
      commit('selectPiece', position)

      // calcula os moves e guarda no state
      var cell = state.board[position[0]][position[1]]
      var moves = getAvailableMoves({state, getters, cell})
      console.log('available moves', moves)
      commit('setMoves', moves)
    }
  }
}
