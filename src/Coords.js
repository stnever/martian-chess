var outer = 6,
    size  = 40,
    inner = 6,
    border = 12

module.exports = {
  rows: _.flatten([
    _.times(4, i => outer + (i * (size + inner))),
    _.times(4, i => outer + border + inner + ((i+4) * (size + inner)))
  ]),
  cols: _.times(4, i => outer + (i * (size + inner))),

  borderPos : [outer, outer + (4 * (size + inner))],
  borderSize: [(4 * size) + (3 * inner), 12],

  boardHeight: (2 * outer) + (8 * size) + (8 * inner) + border
}
