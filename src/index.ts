import * as ES6Promise from 'es6-promise';
import Vue from 'vue';
import 'whatwg-fetch';

import App from './components/App/index.vue';
import { logVersion } from './utils/log';


ES6Promise.polyfill();



interface ExtWindow extends Window {
    app: Vue;
}

interface AppData {}

interface AppMethods {}

interface AppComputedProps {}


(window as ExtWindow).app = new Vue<AppData, AppMethods, AppComputedProps>({
    el: '#root',
    template: `
        <App />
    `,
    components: {
        App
    }
});


if (process.env.NODE_ENV === 'development') {
    logVersion(__PROJECT_NAME__, __BUILD_VERSION__, process.env.NODE_ENV);
}
