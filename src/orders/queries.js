const getOrdersByUserId = "SELECT clothes.title, clothes.description, clothes.created_at, clothes.size, clothes.price, users.name, users.surname, users.email FROM buying JOIN clothes ON buying.clothesid = clothes.id JOIN users ON buying.usersid = users.id WHERE users.id = $1"
const createMultipleOrders = "INSERT INTO buying (id, usersid, clothesid) VALUES %L"

module.exports = {
    getOrdersByUserId,
    createMultipleOrders
}