
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose:"",
}


const initialStateCustomer = {
    fullName:"",
    nationalID:"",
    createdAt:"",
};

function accountReducer(state = initialStateAccount, action) {
    switch(action.type) {
        case "account/deposit":
            return{...state, balnce: state.balance + action.payload };
        case "account/withdraw":
            return{...state, balnce: state.balance - action.payload };
        case "account/requestLoan":
            if(state.loan > 0) return state;
            //LATER
            return{...state, loan: action.payload.amount, loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
             };
        case "account/payLoan":
            return{...state, loan:0, loanPurpose:"", balance: state.balance - state.loan,};
        default:
          return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch(action.type){
        case "customer/createCustomer":
            return{...state, fullName: action.payload.fullName, 
                nationalID: action.payload.nationalID, 
                createdAt: action.payload.createdAt, 
            };
            case "customer/updateName":
                return {...state, fullName: action.payload };

        default:
             return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const Store = createStore(rootReducer);

// Store.dispatch({type: "account/deposit", payload: 500 });
// Store.dispatch({type: "account/withdraw", payload: 200 });
// console.log(Store.getState());

// Store.dispatch({
//     type: "account/requestLoan",
//     payload: { amount: 1000, purpose: "Buy a car"},
// })
// console.log(Store.getState());

// Store.dispatch({ type: "account/payLoan"});
// console.log(Store.getState());

// const ACCOUNT_DEPOSIT = "account/deposit";

function deposit (amount) {
    return {type: "account/deposit", payload: amount }
}

function withdraw (amount) {
    return {type: "account/withdraw", payload: amount }
}

function requestLoan (amount, purpose) {
   return { 
          type: "account/requestLoan",
          payload: { amount, purpose},
    };
}

function payLoan () {
    return {type: "account/payLoan"};
}

Store.dispatch(deposit(500));
Store.dispatch(withdraw(200));
console.log(Store.getState());

Store.dispatch(requestLoan(1000, "Buy a cheap car"));
console.log(Store.getState());
Store.dispatch(payLoan());
console.log(Store.getState());

function createCustomer (fullName, nationalID) {
    return {
        type: "customer/createCustomer", 
        payload: {fullName, nationalID,createdAt: new Date().toISOString()},
    };
}

function updateName (fullName){
    return { type: "account/updateName",
        payload: fullName };
}

Store.dispatch(createCustomer("john", "24343434" ));
Store.dispatch(deposit(250));
console.log(Store.getState());