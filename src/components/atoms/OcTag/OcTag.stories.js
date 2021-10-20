import { action } from "@storybook/addon-actions"
import OcTag from "./OcTag.vue"

// ! Property or method "toJSON" is not defined
// ! Unknown custom element: <router-link>

export default {
  component: OcTag,
  title: "Atoms/Tag",
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["span", "button", "a", "router-link"],
      required: false,
      defaultValue: "span",
    },
    to: {
      control: { type: "text" },
      required: false,
      defaultValue: null,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcTag },
  data() {
    return {
      args: { onClick: { action: "clicked" }, ...args },
    }
  },
  template: `<oc-tag v-bind="$props" @click="action">${args.text}</oc-tag>`,
  methods: { action: action("Clicked!") },
})

export const Component = Template.bind({})
Component.args = {
  text: "Button",
}
