export function getProducts(): Promise<any> {
    return fetch("./api/products.json")
        .then(response => response.json());
}