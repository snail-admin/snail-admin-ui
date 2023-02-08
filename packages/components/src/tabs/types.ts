import { ExtractPropTypes } from "vue";

export const type = ["default", "card", "fashion"];
export const size = ["large", "normal", "small", "mini"];

export const tabProps = {
  type: {
    type: String,
    values: type
  },
  size: {
    type: String,
    values: size
  }
};

export type TabsProps = ExtractPropTypes<typeof tabProps>;
