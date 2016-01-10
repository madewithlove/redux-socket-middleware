
export default function (state = 0, action) {
    switch (action.type) {
        case 'counter/INCREMENT':
            return state + 1;

        default:
            return state;
    }
}
