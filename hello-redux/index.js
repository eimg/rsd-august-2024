const { createStore } = require("redux");

const store = createStore((state = [], action) => {
    if(action.type == "add") {
        return [{ name: action.name }, ...state];
    }

    if(action.type == "del") {
        return state.filter(item => item.name != action.name);
    }

    return state;
});

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch({ type: "add", name: "Apple" });
store.dispatch({ type: "add", name: "Orange" });
store.dispatch({ type: "add", name: "Milk" });
store.dispatch({ type: "del", name: "Orange" });
store.dispatch({ type: "add", name: "Egg" });
