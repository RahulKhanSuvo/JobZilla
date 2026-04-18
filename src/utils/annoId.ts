export function getAnonId() {
    let anonId = localStorage.getItem("anonId");

    if (!anonId) {
        anonId = crypto.randomUUID();
        localStorage.setItem("anonId", anonId);
    }

    return anonId;
}