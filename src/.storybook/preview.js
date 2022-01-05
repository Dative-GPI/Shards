import Vue from 'vue'
import Vuetify from 'vuetify'
import vuetify from '../src/plugins/vuetify' // <== important
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import { Shards } from "../src/index.ts"
import "./storybook.css"

// configure Vue to use Vuetify
Vue.use(Vuetify)
Vue.use(Shards)

// this was the only thing here by default
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}

// THIS is my decorator
export const decorators = [
  (story, context) => {
    // wrap the passed component within the passed context
    const wrapped = story(context)
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
      vuetify,
      components: { wrapped },
      props: {
        dark: {
          type: Boolean,
          default: context.args.dark,
        },
      },
      watch: {
        dark: {
          immediate: true,
          handler(val) {
            this.$vuetify.theme.dark = val
          }
        },
      },
      template: `
        <d-app class="storybook">
          <v-main>
            <wrapped />
          </v-main>
        </d-app>
      `
    })
  },
]