import { SET_TRADE_MODAL_VISIBILITY } from './tabConstants';

export const setTradeModalVisibility = (isVisible) => (dispatch) => {
    dispatch({
        type: SET_TRADE_MODAL_VISIBILITY,
        payload: { isVisible }
    })
}