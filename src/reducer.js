export const initialState = {
    basket: [],
    user: null,
  };
       //selecter start
  export const getBasketTotal =(basket)=>
  basket?.reduce((amount, item) =>item.price + amount,0)
     //selecter ends
    
  
  const reducer = (state, action) => {

    switch (action.type) {
     case "SET_USER":
       return{
         ...state,
         user:action.user
       }
  
      case "ADD_TO_BASKET":
        //logic to adding to basket
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
    
    
      case "REMOVE_fROM_BASKET":
  
        //logic to REMOVING FROM basket...
        //new basket is clone of olds
        let newBasket = [...state.basket];
  
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
  
        if (index >= 0) {
          //if  item exist in basket ,slice the item...
          newBasket.splice(index, 1);
        } else {
          console.warn(`Cant remove product(id: ${action.id})as`);
        }
   
        return { ...state, basket: newBasket };
  
         default:
        return state;
    }
  };
  
  export default reducer;
  