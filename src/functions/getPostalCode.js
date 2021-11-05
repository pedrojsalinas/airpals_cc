const getPostalCode = (place) => {
    let code = '';
    if (place.address_components) {
        for (var i = 0; i < place.address_components.length; i++) {
            for (var j = 0; j < place.address_components[i].types.length; j++) {
                if (place.address_components[i].types[j] === "postal_code") {
                    code = place.address_components[i].long_name;
                }
            }
        }
    }
    return Number(code);
};
export default getPostalCode;