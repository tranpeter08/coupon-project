```javascript

  const couponSchema = new Schema({
    account_id: {type: ObjectId, unique: true},
    coupon_code: {type: String, unique: true},
    date_created: {type: Date, default: Date.now},
    date_updated: {type: Date, default: Date.now]}
  }, {
    _id: false
  });

  couponSchema.index({account_id: 1,  coupon_code: 1});

```
