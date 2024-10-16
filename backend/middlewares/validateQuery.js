const validateParams = (schema) => (req, res, next) =>{
    try {
        schema.parse(req.query);
        next();
    } catch (err) {
        return res.status(400).json({errors: err.errors})
    }
}
export default validateParams