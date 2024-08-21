export function setSessionCart(newCart) {
    sessionStorage.setItem("cartProducts", JSON.stringify(newCart));
}

export function getSessionCart() {
    const sessionCart = sessionStorage.getItem("cartProducts");
    if (!sessionCart) {
        setSessionCart([]);
        return [];
    }
    return JSON.parse(sessionCart);
}

