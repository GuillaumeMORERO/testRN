export const TOGGLE_FAVORITE = 'action/TOGGLE_FAVORITE';


export const toggle_favorite = (film) => {
  return { type: TOGGLE_FAVORITE, film };
};