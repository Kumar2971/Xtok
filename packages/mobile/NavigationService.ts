// https://reactnavigation.org/docs/2.x/navigating-without-navigation-prop
//@ts-nocheck
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(
    routeName: string,
    params: object | undefined,
    action: object | undefined,
) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
            action
        }),
    );
}

export default {
    navigate,
    setTopLevelNavigator,
};

