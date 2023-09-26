import React from 'react';

class ListProduct extends React.Component {
  render() {
    // Extract the productsList array from your JSON object
    const { productsList } = this.props;

    if (!productsList || productsList.length === 0) {
        return <div>No products available in your cart!</div>;
      }

    return (
      <div>
        {productsList.map((product, index) => (
        <div key={ product.title } role="listitem" className="w-commerce-commercecheckoutorderitem order-item">
            <img data-wf-bindings="%5B%7B%22src%22%3A%7B%22type%22%3A%22ImageRef%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems.0.product.f_job_icon_2_3dr8dr%22%7D%7D%5D" src={ product.image } alt="" className="w-commerce-commercecartitemimage product-image"/>
            <div className="w-commerce-commercecheckoutorderitemdescriptionwrapper product-quantity">
                <div data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22PlainText%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems.0.product.f_name_%22%7D%7D%5D" className="w-commerce-commerceboldtextblock checkout-product-title">{ product.title }</div>
                <div className="w-commerce-commercecheckoutorderitemquantitywrapper">
                    <div>Quantity:  </div>
                    <div data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22Number%22%2C%22filter%22%3A%7B%22type%22%3A%22numberPrecision%22%2C%22params%22%3A%5B%220%22%2C%22numberPrecision%22%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems.0.count%22%7D%7D%5D">{ product.quantity }</div>
                </div>
                <script type="text/x-wf-template" id="wf-template-5eeac0d6d48cc49315c0af4200000000008f">%3Cli%3E%3Cspan%20data-wf-bindings%3D%22%255B%257B%2522innerHTML%2522%253A%257B%2522type%2522%253A%2522PlainText%2522%252C%2522filter%2522%253A%257B%2522type%2522%253A%2522identity%2522%252C%2522params%2522%253A%255B%255D%257D%252C%2522dataPath%2522%253A%2522database.commerceOrder.userItems.0.product.f_sku_properties_3dr%255B%255D.name%2522%257D%257D%255D%22%3E%3C%2Fspan%3E%3Cspan%3E%3A%20%3C%2Fspan%3E%3Cspan%20data-wf-bindings%3D%22%255B%257B%2522innerHTML%2522%253A%257B%2522type%2522%253A%2522CommercePropValues%2522%252C%2522filter%2522%253A%257B%2522type%2522%253A%2522identity%2522%252C%2522params%2522%253A%255B%255D%257D%252C%2522dataPath%2522%253A%2522database.commerceOrder.userItems.0.product.f_sku_properties_3dr%255B%255D%2522%257D%257D%255D%22%3E%3C%2Fspan%3E%3C%2Fli%3E</script>
                <ul data-wf-bindings="%5B%7B%22optionSets%22%3A%7B%22type%22%3A%22CommercePropTable%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems.0.product.f_sku_properties_3dr[]%22%7D%7D%2C%7B%22optionValues%22%3A%7B%22type%22%3A%22CommercePropValues%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems.0.sku.f_sku_values_3dr%22%7D%7D%5D" className="w-commerce-commercecheckoutorderitemoptionlist" data-wf-collection="database.commerceOrder.userItems.0.product.f_sku_properties_3dr" data-wf-template-id="wf-template-5eeac0d6d48cc49315c0af4200000000008f"></ul>
            </div>
            <div data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems.0.rowTotal%22%7D%7D%5D" className="checkout-product-price">${ product.subtotal } USD</div>
        </div>
        ))}
      </div>
    );
  }
}

export default ListProduct;
