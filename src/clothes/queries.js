const getClothes = "SELECT * FROM clothes"
const getClothesById = "SELECT * FROM clothes WHERE id = $1"
const createClothes = "INSERT INTO clothes (title, description, size, price) VALUES($1, $2, $3, $4) RETURNING *"
const delClothes = "DELETE FROM clothes WHERE id = $1"
const putClothes = "UPDATE clothes SET description = $1 WHERE id = $2"

module.exports = {
    getClothes,
    createClothes,
    getClothesById,
    delClothes,
    putClothes
}
