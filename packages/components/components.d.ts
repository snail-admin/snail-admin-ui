declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SnButton: typeof import("snail-snail").Button;
  }
}
export {};
