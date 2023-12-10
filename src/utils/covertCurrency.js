export const covertCurrencyUSD = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số theo định dạng tiền tệ
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}