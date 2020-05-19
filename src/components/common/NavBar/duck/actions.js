import navBarTypes from "./types";

const login = () => ({
    type: navBarTypes.LOGIN
});

const logoff = () => ({
    type: navBarTypes.LOGOFF
});

const on = ()=>({
    type: navBarTypes.ON
})

const off = ()=>({
    type: navBarTypes.OFF
})
export default {
    login,
    logoff,
    on,
    off
}