

export const updateLocalStorage = (newFavourites) => {
    localStorage.setItem('favorites', JSON.stringify(newFavourites));
}