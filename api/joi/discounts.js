const Joi = require("joi");

const SCHEMA_GET = Joi.object({
    discountCode: Joi.string().max(12).alphanum().required()
});

const SCHEMA_PUT = SCHEMA_GET.keys({
    redeemedOrderName: Joi.string().alphanum().max(7),
    redeemedOrderId: Joi.string().regex(/^\d+$/)
});
//validation for Get
function validateGet(arg) {

    return Joi.validate(arg, SCHEMA_GET, {stripUnknown: true})

}
//validation for update
function validatePut(arg) {

    return Joi.validate(arg, SCHEMA_PUT, {stripUnknown: true})

}

module.exports = {
    validateGet,
    validatePut
}