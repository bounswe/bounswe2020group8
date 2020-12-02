import ProductInSearch from "./ProductInSearch";

const productTable = (props) => {
  let productInTableForm = [];
  productInTableForm = makeTableForm(props.productList, props.columnSize);

  return (
    <table>
      <tbody>
        {productInTableForm.map((row, key) => (
          <tr key={key}>
            {row.map((product, key) => (
              <td key={key}>
                <ProductInSearch product={product} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function makeTableForm(list, columnSize) {
  let table = [];

  for (let i = 0; i < list.length; i += columnSize) {
    table.push(list.slice(i, Math.min(list.length, i + columnSize)));
  }

  return table;
}

export default productTable;
