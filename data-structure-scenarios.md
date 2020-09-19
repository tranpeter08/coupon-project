# Coupon Data Structure Sample Scenarios

## Sitewide Offer

_Example: 10% off at store with free shipping_

```javascript
{
  coupon_id: "e9c02f00-f6ee-4701-a72a-04fd93de90ab",
  coupon_code: "10%_OFF_TARGET",
  discount_value: {
    percent_off: 10,
    amount_off: null,
    free_shipping: true,
    free_item: null
  },
  validation_rules: [],
  // redemption_limit: null, ** ommited if no limit? **
  timeframe: {
    start: "2020-10-01T07:00:00.000Z",
    expires: "2020-12-31T08:00:00.000Z"
  },
  metadata: {
    description: "10% off sitewide"
  },
  tiers: []
}

```

## Discount Via Coupon

_Example: 10% off product with specific sku. In this case, a Tide product with item sku "123abc"_

```javascript
{
  coupon_id: "e9c02f00-f6ee-4701-a72a-04fd93de90ab",
  coupon_code: "10%_OFF_TIDE_W_SKU",
  discount_value: {
    percent_off: 10,
    amount_off: null,
    free_shipping: false,
    free_item: null
  },
  validation_rules: [
    "cart","find_item",{sku: "123abc"}, "to_exist"
  ],
  // redemption_limit: null,
  timeframe: {
    start: "2020-10-01T07:00:00.000Z",
    expires: "2020-12-31T08:00:00.000Z"
  },
  metadata: {
    description: "10% off specific item"
  },
  tiers: []
}

```

## Combine Offers

_Example: 10% product with specific sku and free shipping, using same item sku as above._

```javascript
{
  coupon_id: "e9c02f00-f6ee-4701-a72a-04fd93de90ab",
  coupon_code: "10%_OFF_TIDE_W_SKU_&_SHIPPING",
  discount_value: {
    percent_off: 10,
    amount_off: null,
    free_shipping: true,
    free_item: null
  },
  validation_rules: [
    "cart_item", "find_item", {sku: "123abc"}, "to_exist"
  ],
  // redemption_limit: null,
  timeframe: {
    start: "2020-10-01T07:00:00.000Z",
    expires: "2020-12-31T08:00:00.000Z"
  },
  metadata: {
    description: "10% off specific item and free shipping"
  },
  tiers: []
}
```

## Free Product

_Example: Free candle with at least \$50 purchase_

```javascript
{
  coupon_id: "e9c02f00-f6ee-4701-a72a-04fd93de90ab",
  coupon_code: "FREE_CANDLE_$50_PURCHASE",
  discount_value: {
    percent_off: null,
    amount_off: null,
    free_shipping: true,
    free_item: "CANDLE_SKU"
  },
  validation_rules: [
    "cart_value", "greater_than_equal_to", 50.00
    ],
  // redemption_limit: null,
  timeframe: {
    start: "2020-10-01T07:00:00.000Z",
    expires: "2020-12-31T08:00:00.000Z"
  },
  metadata: {
    description: "Free candle with $50 purchase"
  },
  tiers: []
}
```

## BOGO

_Example: Buy one Big Mac, get one free. Big Mac has an item id of "bm100"_

```javascript
{
  coupon_id: "e9c02f00-f6ee-4701-a72a-04fd93de90ab",
  coupon_code: "BOGO_BIGMAC",
  discount_value: {
    percent_off: 100,
    amount_off: null,
    free_shipping: false,
    free_item: null
  },
  validation_rules: [
    "cart", "find_item", {id: "bm100"}, "get_prop", "qty", "greater_than_equal_to", 2
  ],
  // redemption_limit: null,
  timeframe: {
    start: "2020-10-01T07:00:00.000Z",
    expires: "2020-12-31T08:00:00.000Z"
  },
  metadata: {
  },
  tiers: []
}
```

_Example: Buy one Big Mac, get one 50%. Big Mac has an item id of "bm100"_

```javascript
{
  coupon_id: "e9c02f00-f6ee-4701-a72a-04fd93de90ab",
  coupon_code: "BOGO_HALF_BIGMAC",
  discount_value: {
    percent_off: 50,
    amount_off: null,
    free_shipping: false,
    free_item: null
  },
  validation_rules: [
    "cart", "find_item", {id: "bm100"}, "get_prop", "qty", "greater_than_equal_to", 2
  ],
  // redemption_limit: null,
  timeframe: {
    start: "2020-10-01T07:00:00.000Z",
    expires: "2020-12-31T08:00:00.000Z"
  },
  metadata: {
  },
  tiers: []
}
```

## Free Sample

_Example: Buy one Big Mac, get one 50%. Big Mac has an item id of "bm100"_

```javascript
{
  coupon_id: "e9c02f00-f6ee-4701-a72a-04fd93de90ab",
  coupon_code: "BOGO_HALF_BIGMAC",
  discount_value: {
    percent_off: 50,
    amount_off: null,
    free_shipping: false,
    free_item: null
  },
  validation_rules: [
    "cart", "find_item", {id: "bm100"}, "get_prop", "qty", "greater_than_equal_to", 2
  ],
  // redemption_limit: null,
  timeframe: {
    start: "2020-10-01T07:00:00.000Z",
    expires: "2020-12-31T08:00:00.000Z"
  },
  metadata: {
  },
  tiers: []
}
```
