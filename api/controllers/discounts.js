const discounts = require('../db/discounts');
const joi = require('../joi/discounts');

/**
 * Takes a discount code with query params and returns a discound row.
 *
 * @param {string} discount_code
 * @returns {object} discount
 */
const getByCode = async (req, res) => {

    let result = joi.validateGet(req.query);

    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const { discountCode } = result.value;

    if(!discountCode) {

        res.status(400).json({error: 'Please input discount code.'});
        return;

    }

    try {

        let item = await discounts.fromDiscountCode(discountCode);
        
        if (item === null) {

            res.status(400).json({error: 'No discount found.'});
            return;

        }

        res.json(item);

    } catch (err) {
        
        console.log(err);
        return;

    }

}

/**
 * Takes a discount code and updates redeemed_order_name and redeemed_order_id.
 *
 * @param {string} discount_code
 * @param {string} redeemed_order_name
 * @param {string} redeemed_order_id
 * @returns {object} discount
 */
const updateByCode = async (req, res) => {

    let result = joi.validatePut(req.body);

    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const item = result.value;

    try {

        await discounts.update(item);
        
        let update = await discounts.fromDiscountCode(item.discountCode);
        if (update === null) {

            res.status(400).json({error: 'No discount found.'});
            return;

        }

        res.json(update);

    } catch (err) {
        
        console.log(err);
        return;

    }

}

module.exports = {
    getByCode,
    updateByCode
}