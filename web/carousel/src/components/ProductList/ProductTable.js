import ProductInSearch from './ProductInSearch'

const productTable = props => {
  let productInTableForm = []
  productInTableForm = makeTableForm(props.productList, props.columnSize)

  return (
    <tbody>
      {productInTableForm.map(row => (
        <tr>
          {row.map(product => (
            <td>
              <ProductInSearch product={product} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

function makeTableForm (list, columnSize) {
  let table = []

  for (let i = 0; i < list.length; i += columnSize) {
    table.push(list.slice(i, Math.min(list.length, i + columnSize)))
  }

  return table
}

export default productTable
