const slugify = require('slugify');

const slugOptions = {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: true,
    trim: true,
    locale: 'en'
}

exports.generateSlug = (text) => {
    return slugify(text, {
        ...slugOptions
    })
}