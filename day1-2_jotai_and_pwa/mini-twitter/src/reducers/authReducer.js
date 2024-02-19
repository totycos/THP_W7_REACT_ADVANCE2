import auth from "../utils/auth";

const { checkAuth } = auth()

const initialState = {
    isLogged: checkAuth(),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AUTH':
            return {
                ...state,
                isLogged: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;