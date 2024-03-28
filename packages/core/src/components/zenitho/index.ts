import createUVComponentClass from "@/lib/UVComponent";
import Gradient from "./Gradient";

const Zenitho = createUVComponentClass({
  defaultStates: {},
  setup({ glContext: { gl } }) {
    const gradientColors = ["#ef008f", "#6ec3f4", "#7038ff", "#ffba27"];
    const gradient = new Gradient();
    gradient.initGradient({
      el: gl.canvas,
      gradientColors,
    });
    return {
      gradient,
    };
  },
  render({ states, glContext: { gradient } }) {
    const { time } = states;
    gradient.t += Math.min(time * 100 - gradient.last, 1e3 / 15);
    gradient.last = time * 100;
    gradient.mesh.material.uniforms.u_time.value = gradient.t;
    gradient.minigl.render();
  },
});

export { Zenitho };
