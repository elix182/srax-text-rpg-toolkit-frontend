import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { es, en },
      current: 'en',
    },
    theme: {
        themes: {
          light: {
            primary: '#010121',
            accent: '#c51162',
            secondary: '#FFFFFF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#000000'
          },
        },
      },
      icons: {
        iconfont: 'md',
      }, 
});
