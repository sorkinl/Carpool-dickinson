import navBarTypes from "./types";

const login = () => ({
    type: navBarTypes.LOGIN
});

const logoff = () => ({
    type: navBarTypes.LOGOFF
});

export default {
    login,
    logoff
}