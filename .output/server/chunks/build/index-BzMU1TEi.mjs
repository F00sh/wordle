import { _ as __nuxt_component_0 } from './nuxt-link-0xZ5kNhq.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center px-6 py-10" }, _attrs))}><div class="w-full max-w-md text-center"><h1 class="text-3xl font-extrabold mb-2">Wordle</h1><p class="text-gray-300 mb-8">Choose a mode to start playing.</p><div class="space-y-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/game?mode=easy",
        class: "block w-full bg-correct hover:bg-green-600 text-white font-semibold py-3 rounded-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Easy Mode `);
          } else {
            return [
              createTextVNode(" Easy Mode ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/game?mode=pro",
        class: "block w-full bg-present hover:bg-yellow-600 text-white font-semibold py-3 rounded-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Pro Mode (2 min timer) `);
          } else {
            return [
              createTextVNode(" Pro Mode (2 min timer) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="mt-8 text-xs text-gray-400"> Mobile‑first. Use on‑screen or physical keyboard. </p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BzMU1TEi.mjs.map
