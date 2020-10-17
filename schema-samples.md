```javascript
const couponSchema = new Schema(
  {
    account_id: { type: ObjectId, required: true },
    coupon_code: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ account_id: 1, coupon_code: 1 }, { unique: true });
```
