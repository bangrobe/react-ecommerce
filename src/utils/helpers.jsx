export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number/100)
}

export const getUniqueValues = (data, type) => {
    //data la all_products, type la cac key trong filters nhu category, company, color
    let unique = data.map((item)=> item[type])
    if (type === 'colors') {
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}