export const STORE_SWITCHES = 'STORE_SWITCHES'

export const storeSwitches = (switchData) => {
   return dispatch => {
      dispatch({
         type: STORE_SWITCHES,
         switchData: switchData
      })
   }
}