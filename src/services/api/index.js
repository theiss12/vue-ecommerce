export function getProducts() {
    const baseUrl = window.location.origin;
    return fetch(`${baseUrl}/api/products.json`)
        .then(response => response.json())
        .catch(reason => console.log(reason));
}