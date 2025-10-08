
## 🟩 webHook - handle subscription:-

```js
{
  "id": "sub_1SFxYRHje2ICnTUdc5Unj2nU",
  "object": "subscription",
  "application": null,
  "application_fee_percent": null,
  "automatic_tax": {
    "disabled_reason": null,
    "enabled": false,
    "liability": null
  },
  "billing_cycle_anchor": 1759930637,
  "billing_cycle_anchor_config": null,
  "billing_mode": {
    "flexible": {
      "proration_discounts": "included"
    },
    "type": "flexible",
    "updated_at": 1759930620
  },
  "billing_thresholds": null,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": null,
  "cancellation_details": {
    "comment": null,
    "feedback": null,
    "reason": null
  },
  "collection_method": "charge_automatically",
  "created": 1759930637,
  "currency": "usd",
  "current_period_end": 1762609037,
  "current_period_start": 1759930637,
  "customer": "cus_TA4eA8GQAss9bI",
  "days_until_due": null,
  "default_payment_method": "pm_1SFxYOHje2ICnTUddKQiG0Wr",
  "default_source": null,
  "default_tax_rates": [],
  "description": null,
  "discount": null,
  "discounts": [],
  "ended_at": null,
  "invoice_settings": {
    "account_tax_ids": null,
    "issuer": {
      "type": "self"
    }
  },
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_TCMGIbU63SVLIi",
        "object": "subscription_item",
        "billing_thresholds": null,
        "created": 1759930638,
        "current_period_end": 1762609037,
        "current_period_start": 1759930637,
        "discounts": [],
        "metadata": {},
        "plan": {
          "id": "price_1SFXpaHje2ICnTUdiJ5wGeN4",
          "object": "plan",
          "active": true,
          "aggregate_usage": null,
          "amount": 1900,
          "amount_decimal": "1900",
          "billing_scheme": "per_unit",
          "created": 1759831758,
          "currency": "usd",
          "interval": "month",
          "interval_count": 1,
          "livemode": false,
          "metadata": {},
          "meter": null,
          "nickname": null,
          "product": "prod_TBvg8IjYy1EfV0",
          "tiers_mode": null,
          "transform_usage": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "price": {
          "id": "price_1SFXpaHje2ICnTUdiJ5wGeN4",
          "object": "price",
          "active": true,
          "billing_scheme": "per_unit",
          "created": 1759831758,
          "currency": "usd",
          "custom_unit_amount": null,
          "livemode": false,
          "lookup_key": null,
          "metadata": {},
          "nickname": null,
          "product": "prod_TBvg8IjYy1EfV0",
          "recurring": {
            "aggregate_usage": null,
            "interval": "month",
            "interval_count": 1,
            "meter": null,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "tax_behavior": "unspecified",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "recurring",
          "unit_amount": 1900,
          "unit_amount_decimal": "1900"
        },
        "quantity": 1,
        "subscription": "sub_1SFxYRHje2ICnTUdc5Unj2nU",
        "tax_rates": []
      }
    ],
    "has_more": false,
    "total_count": 1,
    "url": "/v1/subscription_items?subscription=sub_1SFxYRHje2ICnTUdc5Unj2nU"
  },
  "latest_invoice": "in_1SFxYPHje2ICnTUdtxLpFYuO",
  "livemode": false,
  "metadata": {},
  "next_pending_invoice_item_invoice": null,
  "on_behalf_of": null,
  "pause_collection": null,
  "payment_settings": {
    "payment_method_options": {
      "acss_debit": null,
      "bancontact": null,
      "card": {
        "network": null,
        "request_three_d_secure": "automatic"
      },
      "customer_balance": null,
      "konbini": null,
      "sepa_debit": null,
      "us_bank_account": null
    },
    "payment_method_types": [
      "card"
    ],
    "save_default_payment_method": "off"
  },
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "plan": {
    "id": "price_1SFXpaHje2ICnTUdiJ5wGeN4",
    "object": "plan",
    "active": true,
    "aggregate_usage": null,
    "amount": 1900,
    "amount_decimal": "1900",
    "billing_scheme": "per_unit",
    "created": 1759831758,
    "currency": "usd",
    "interval": "month",
    "interval_count": 1,
    "livemode": false,
    "metadata": {},
    "meter": null,
    "nickname": null,
    "product": "prod_TBvg8IjYy1EfV0",
    "tiers_mode": null,
    "transform_usage": null,
    "trial_period_days": null,
    "usage_type": "licensed"
  },
  "quantity": 1,
  "schedule": null,
  "start_date": 1759930637,
  "status": "active",
  "test_clock": null,
  "transfer_data": null,
  "trial_end": null,
  "trial_settings": {
    "end_behavior": {
      "missing_payment_method": "create_invoice"
    }
  },
  "trial_start": null
}
```
