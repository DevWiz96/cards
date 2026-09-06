const idPlugin = (schema) => {
    schema.set("toJSON", {
        virtuals: true,
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    })
}
module.exports = idPlugin