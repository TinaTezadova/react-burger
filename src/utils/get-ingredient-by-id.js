export default function getIngredientById(ids, fullIngredients) {
    return ids.map((id) => {
        return fullIngredients.find((ingredient) => ingredient._id === id)
    })
}