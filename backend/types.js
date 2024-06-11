const z = require('zod');

const schema1 = z.object({
    username : z.string().email(),
    firstName : z.string().max(50),
    lastName : z.string().max(50),
    password : z.string().min(6)
});

const schema2 = z.object({
    username : z.string().email(),
    password : z.string().min(6)
});

const schema3 = z.object({
    password : z.string().min(6),
    firstName : z.string().max(50),
    lastName : z.string().max(50)
}).partial();    // this .partial() means none of these entries are compulsory they may be present or absent

// another syntax to achieve the same functionality
// const schema3 = z.object({
//     password : z.string().min(6).optional(),
//     firstName : z.string().max(50).optional(),
//     lastName : z.string().max(50).optional()
// });

module.exports = {
    schema1,
    schema2,
    schema3
};