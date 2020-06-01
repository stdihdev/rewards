const db = require('../../libs/mysql');

let self = {

    // this function just takes a query result and converts it to array of discounts
    itemsFromRows: (result) => {

        let items = [];

        for (let row of result) {
            let item = {
                id: row.id,
                storeUrl: row.store_url,
                created: row.created_at,
                discountCode: row.discount_code,
                discountProductUrl: row.discounted_product_url,
                redeemedOrderName: row.redeemed_order_name,
                redeemedOrderId: row.redeemed_order_id,
            };

            items.push(item);
        }

        return items;
    },
    // gets a discount from a discount code
    fromDiscountCode: async (discountCode) => {

        try {

            let query = `SELECT * FROM discounts where discount_code = ?`;

            const result = await db.pool.query(query, [discountCode]);

            let items = self.itemsFromRows(result);

            if (items.length > 0) {

                return (items[0]);

            }

            return null;
        } catch(err) {

            console.log(err)
            return;

        }
    },
    // update a discount row by discount code
    update: async(item) => {

        try {

            let query = `UPDATE discounts SET redeemed_order_name = ?, redeemed_order_id = ? WHERE discount_code = ?`;

            await db.pool.query(query, [item.redeemedOrderName, item.redeemedOrderId, item.discountCode]);

            return;

        } catch(err) {

            console.log(err)
            return;

        }

    }

}

module.exports = self;