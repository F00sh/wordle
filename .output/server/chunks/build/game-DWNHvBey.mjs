import { defineComponent, ref, computed, watch, mergeProps, unref, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderTeleport } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, b as useRouter } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WordleBoard",
  __ssrInlineRender: true,
  props: {
    board: {},
    currentRow: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-rows-5 gap-2 w-full max-w-xs sm:max-w-sm mx-auto" }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.board, (row, rIdx) => {
        _push(`<div class="grid grid-cols-5 gap-2"><!--[-->`);
        ssrRenderList(row.letters, (cell, cIdx) => {
          _push(`<div class="${ssrRenderClass([{
            "bg-tile text-white": cell.state === "empty" || cell.state === "tbd",
            "bg-absent text-white": cell.state === "absent",
            "bg-present text-white": cell.state === "present",
            "bg-correct text-white": cell.state === "correct"
          }, "aspect-square flex items-center justify-center rounded select-none font-bold text-xl sm:text-2xl uppercase transition-colors duration-200 border border-gray-700"])}">${ssrInterpolate(cell.letter)}</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WordleBoard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const WordleBoard = Object.assign(_sfc_main$3, { __name: "WordleBoard" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WordleKeyboard",
  __ssrInlineRender: true,
  props: {
    keyState: {}
  },
  emits: ["key"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const rows = [
      "QWERTYUIOP".split(""),
      "ASDFGHJKL".split(""),
      ["ENTER", ..."ZXCVBNM".split(""), "⌫"]
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-xl mx-auto mt-5 sm:mt-6 select-none" }, _attrs))}><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(rows, (row, idx) => {
        _push(`<div class="flex gap-1.5 sm:gap-1 justify-center"><!--[-->`);
        ssrRenderList(row, (key) => {
          _push(`<button class="${ssrRenderClass([[
            key.length > 1 ? "flex-[1.5]" : "",
            props.keyState[key]?.toString() === "correct" ? "bg-correct text-white" : props.keyState[key]?.toString() === "present" ? "bg-present text-white" : props.keyState[key]?.toString() === "absent" ? "bg-absent text-white" : "bg-tile text-gray-100"
          ], "px-3 sm:px-3 py-3.5 sm:py-2.5 rounded-md font-semibold text-base sm:text-sm uppercase flex-1 basis-0 min-h-[48px] sm:min-h-[40px]"])}">${ssrInterpolate(key)}</button>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WordleKeyboard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const WordleKeyboard = Object.assign(_sfc_main$2, { __name: "WordleKeyboard" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ResultModal",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    status: {},
    answer: {}
  },
  emits: ["close", "again"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.show) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" data-v-8ac7bc41><div class="w-full max-w-sm bg-tile rounded-lg border border-gray-700 shadow-xl p-4 sm:p-6 text-gray-100" data-v-8ac7bc41><div class="text-center" data-v-8ac7bc41><h2 class="${ssrRenderClass([_ctx.status === "won" ? "text-correct" : "text-absent", "text-2xl font-bold mb-2"])}" data-v-8ac7bc41>${ssrInterpolate(_ctx.status === "won" ? "You Win!" : "Better Luck Next Time")}</h2><p class="text-sm text-gray-300 mb-4" data-v-8ac7bc41>${ssrInterpolate(_ctx.status === "won" ? "Nice job guessing the word." : "No worries, try another round.")}</p><div class="text-sm mb-6" data-v-8ac7bc41> The word was <span class="font-extrabold uppercase" data-v-8ac7bc41>${ssrInterpolate(_ctx.answer)}</span></div><div class="flex gap-2 justify-center" data-v-8ac7bc41><button class="px-4 py-2 rounded bg-correct text-white font-semibold" data-v-8ac7bc41>Play Again</button><button class="px-4 py-2 rounded bg-absent text-white" data-v-8ac7bc41>Close</button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ResultModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ResultModal = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-8ac7bc41"]]), { __name: "ResultModal" });
const WORDS = [
  "about",
  "above",
  "abuse",
  "actor",
  "acute",
  "admit",
  "adopt",
  "adult",
  "after",
  "again",
  "agent",
  "agree",
  "ahead",
  "alarm",
  "album",
  "alert",
  "alike",
  "alive",
  "allow",
  "alone",
  "along",
  "aloud",
  "alter",
  "among",
  "angel",
  "anger",
  "angle",
  "angry",
  "apart",
  "apple",
  "apply",
  "arena",
  "argue",
  "arise",
  "armed",
  "array",
  "arrow",
  "aside",
  "asset",
  "audio",
  "audit",
  "avoid",
  "award",
  "aware",
  "badly",
  "baker",
  "bases",
  "basic",
  "basis",
  "beach",
  "beard",
  "beast",
  "began",
  "begin",
  "begun",
  "being",
  "below",
  "bench",
  "billy",
  "birth",
  "black",
  "blame",
  "blind",
  "block",
  "blood",
  "board",
  "boost",
  "booth",
  "bound",
  "brain",
  "brand",
  "bread",
  "break",
  "breed",
  "brief",
  "bring",
  "broad",
  "broke",
  "brown",
  "build",
  "built",
  "buyer",
  "cable",
  "calif",
  "carry",
  "catch",
  "cause",
  "chain",
  "chair",
  "chart",
  "chase",
  "cheap",
  "check",
  "cheek",
  "chest",
  "chief",
  "child",
  "china",
  "chose",
  "civic",
  "civil",
  "claim",
  "class",
  "clean",
  "clear",
  "click",
  "clock",
  "close",
  "coach",
  "coast",
  "could",
  "count",
  "court",
  "cover",
  "craft",
  "crash",
  "cream",
  "crime",
  "cross",
  "crowd",
  "crown",
  "curve",
  "cycle",
  "daily",
  "dance",
  "dated",
  "dealt",
  "death",
  "debut",
  "delay",
  "depth",
  "doing",
  "doubt",
  "dozen",
  "draft",
  "drama",
  "drawn",
  "dream",
  "dress",
  "drill",
  "drink",
  "drive",
  "drove",
  "dying",
  "eager",
  "early",
  "earth",
  "eight",
  "elite",
  "empty",
  "enemy",
  "enjoy",
  "enter",
  "entry",
  "equal",
  "error",
  "event",
  "every",
  "exact",
  "exist",
  "extra",
  "faith",
  "false",
  "fault",
  "favor",
  "fewer",
  "fiber",
  "field",
  "fifth",
  "fifty",
  "fight",
  "final",
  "first",
  "fixed",
  "flash",
  "fleet",
  "floor",
  "fluid",
  "focus",
  "force",
  "forth",
  "forty",
  "forum",
  "found",
  "frame",
  "fraud",
  "fresh",
  "front",
  "fruit",
  "fully",
  "funny",
  "giant",
  "given",
  "glass",
  "globe",
  "going",
  "grace",
  "grade",
  "grand",
  "grant",
  "grass",
  "great",
  "green",
  "gross",
  "group",
  "grown",
  "guard",
  "guess",
  "guest",
  "guide",
  "happy",
  "harry",
  "heart",
  "heavy",
  "hence",
  "henry",
  "horse",
  "hotel",
  "house",
  "human",
  "ideal",
  "image",
  "index",
  "inner",
  "input",
  "issue",
  "japan",
  "jimmy",
  "joint",
  "jones",
  "judge",
  "known",
  "label",
  "large",
  "laser",
  "later",
  "laugh",
  "layer",
  "learn",
  "lease",
  "least",
  "leave",
  "legal",
  "level",
  "lever",
  "light",
  "limit",
  "links",
  "lives",
  "local",
  "logic",
  "loose",
  "lower",
  "lucky",
  "lunch",
  "lying",
  "magic",
  "major",
  "maker",
  "march",
  "maria",
  "match",
  "maybe",
  "mayor",
  "meant",
  "media",
  "metal",
  "might",
  "minor",
  "minus",
  "mixed",
  "model",
  "money",
  "month",
  "moral",
  "motor",
  "mount",
  "mouse",
  "mouth",
  "movie",
  "music",
  "needs",
  "never",
  "newly",
  "night",
  "noise",
  "north",
  "novel",
  "nurse",
  "occur",
  "ocean",
  "offer",
  "often",
  "order",
  "other",
  "ought",
  "paint",
  "panel",
  "paper",
  "party",
  "peace",
  "peter",
  "phase",
  "phone",
  "photo",
  "piece",
  "pilot",
  "pitch",
  "place",
  "plain",
  "plane",
  "plant",
  "plate",
  "point",
  "pound",
  "power",
  "press",
  "price",
  "pride",
  "prime",
  "print",
  "prior",
  "prize",
  "proof",
  "proud",
  "prove",
  "queen",
  "quick",
  "quiet",
  "quite",
  "radio",
  "raise",
  "range",
  "rapid",
  "ratio",
  "reach",
  "react",
  "ready",
  "refer",
  "right",
  "rival",
  "river",
  "roger",
  "roman",
  "rough",
  "round",
  "route",
  "royal",
  "rural",
  "scale",
  "scene",
  "scope",
  "score",
  "sense",
  "serve",
  "seven",
  "shall",
  "shape",
  "share",
  "sharp",
  "sheet",
  "shelf",
  "shell",
  "shift",
  "shirt",
  "shock",
  "shoot",
  "short",
  "shown",
  "sight",
  "since",
  "sixth",
  "sixty",
  "sized",
  "skill",
  "sleep",
  "slide",
  "small",
  "smart",
  "smile",
  "smith",
  "smoke",
  "solid",
  "solve",
  "sorry",
  "sound",
  "south",
  "space",
  "spare",
  "speak",
  "speed",
  "spend",
  "spent",
  "split",
  "spoke",
  "sport",
  "staff",
  "stage",
  "stake",
  "stand",
  "start",
  "state",
  "steam",
  "steel",
  "stick",
  "still",
  "stock",
  "stone",
  "stood",
  "store",
  "storm",
  "story",
  "strip",
  "stuck",
  "study",
  "stuff",
  "style",
  "sugar",
  "suite",
  "super",
  "sweet",
  "table",
  "taken",
  "taste",
  "taxes",
  "teach",
  "teeth",
  "terry",
  "texas",
  "thank",
  "theft",
  "their",
  "theme",
  "there",
  "these",
  "thick",
  "thing",
  "think",
  "third",
  "those",
  "three",
  "threw",
  "throw",
  "tight",
  "times",
  "tired",
  "title",
  "today",
  "topic",
  "total",
  "touch",
  "tough",
  "tower",
  "track",
  "trade",
  "train",
  "treat",
  "trend",
  "trial",
  "tried",
  "tries",
  "truck",
  "truly",
  "trust",
  "truth",
  "twice",
  "under",
  "undue",
  "union",
  "unity",
  "until",
  "upper",
  "upset",
  "urban",
  "usage",
  "usual",
  "valid",
  "value",
  "video",
  "virus",
  "visit",
  "vital",
  "voice",
  "waste",
  "watch",
  "water",
  "wheel",
  "where",
  "which",
  "while",
  "white",
  "whole",
  "whose",
  "woman",
  "women",
  "world",
  "worry",
  "worse",
  "worst",
  "worth",
  "would",
  "wound",
  "write",
  "wrong",
  "wrote",
  "yield",
  "young",
  "youth",
  // dodatnih 100 riječi
  "acorn",
  "adapt",
  "alien",
  "amber",
  "armor",
  "ashes",
  "atlas",
  "awake",
  "bacon",
  "badge",
  "basil",
  "batch",
  "beads",
  "beams",
  "belly",
  "blink",
  "bliss",
  "blown",
  "blues",
  "bonus",
  "brass",
  "bride",
  "brush",
  "buddy",
  "buggy",
  "candy",
  "cargo",
  "carol",
  "carve",
  "cedar",
  "chalk",
  "charm",
  "cheer",
  "chill",
  "choir",
  "clash",
  "clerk",
  "climb",
  "clown",
  "comet",
  "coral",
  "couch",
  "crane",
  "creek",
  "curry",
  "daisy",
  "demon",
  "devil",
  "diner",
  "ditch",
  "dough",
  "doves",
  "drain",
  "dread",
  "dusty",
  "eagle",
  "elder",
  "elbow",
  "elves",
  "fable",
  "fancy",
  "feast",
  "fence",
  "fever",
  "flame",
  "flock",
  "flute",
  "focal",
  "foggy",
  "folks",
  "frost",
  "funky",
  "gains",
  "gears",
  "ghost",
  "glide",
  "gloom",
  "goose",
  "grape",
  "grove",
  "gummy",
  "haunt",
  "hedge",
  "honey",
  "hound",
  "icing",
  "irony",
  "ivory",
  "jelly",
  "jolly",
  "karma",
  "kayak",
  "kneel",
  "knife",
  "koala",
  "ladle",
  "lager",
  "lance",
  "larva",
  "laser",
  "lemon",
  "lever",
  "lilac",
  "linen",
  "lions",
  "liver",
  "lofty",
  "logic",
  "lotus",
  "lunar",
  "lunge",
  "lurid",
  "lyric",
  "macho",
  "macro",
  "madam",
  "maize",
  "mango",
  "manor",
  "maple",
  "march",
  "marry",
  "mason",
  "meadow",
  "medal",
  "melon",
  "mercy",
  "merit",
  "micro",
  "mimic",
  "mince",
  "mined",
  "miner",
  "mirth",
  "moist",
  "molar",
  "money",
  "moody",
  "moose",
  "mossy",
  "motel",
  "motto",
  "mourn",
  "mower",
  "mucky",
  "mummy",
  "myrrh",
  "nadir",
  "naive",
  "nanny",
  "nasal",
  "nasty",
  "naval",
  "needy",
  "nerdy",
  "niece",
  "noble",
  "noise",
  "noisy",
  "nomad",
  "noose",
  "north",
  "novae",
  "nudge",
  "oasis",
  "obese",
  "occur",
  "ocean",
  "octet",
  "offal",
  "olive",
  "omega",
  "onion",
  "opals",
  "opera",
  "orbit",
  "order",
  "organ",
  "other",
  "otter",
  "oxide",
  "ozone",
  "paddy",
  "pagan",
  "paint",
  "palms",
  "panda",
  "panic",
  "pansy",
  "paper",
  "parka",
  "party",
  "paste",
  "patch",
  "patio",
  "pause",
  "peace",
  "pearl",
  "pecan",
  "pedal",
  "peony",
  "perch",
  "petal",
  "phase",
  "phone",
  "piano",
  "picky",
  "piece",
  "pinto",
  "piper",
  "pitch",
  "pivot",
  "pixel",
  "plank",
  "plant",
  "plate",
  "plead",
  "plush",
  "poise",
  "polar",
  "polka",
  "poppy",
  "porch",
  "poser",
  "pouch",
  "pound",
  "prank",
  "press",
  "prism",
  "prose",
  "prune",
  "pseud",
  "pulse",
  "punch",
  "puppy",
  "purse",
  "quack",
  "quail",
  "quake",
  "qualm",
  "quart",
  "queen",
  "query",
  "quest",
  "quick",
  "quiet",
  "quill",
  "quilt",
  "quirk",
  "quite",
  "quota",
  "quote",
  "rabbi",
  "racer",
  "radar",
  "radio",
  "rainy",
  "raise",
  "ranch",
  "range",
  "rapid",
  "raspy",
  "ratio",
  "raven",
  "reach",
  "ready",
  "realm",
  "rebel",
  "recur",
  "reedy",
  "refer",
  "regal",
  "rehab",
  "reign",
  "relax",
  "relay",
  "remit",
  "renew",
  "repay",
  "reply",
  "rerun",
  "reset",
  "retro",
  "reuse",
  "rhyme",
  "rider",
  "ridge",
  "rifle",
  "rigid",
  "rinse",
  "risky",
  "rival",
  "roast",
  "robin",
  "robot",
  "rocky",
  "rogue",
  "roman",
  "rouge",
  "rough",
  "round",
  "route",
  "rover",
  "royal",
  "rugby",
  "ruins",
  "ruler",
  "rumor",
  "rural",
  "rusty",
  "sable",
  "salsa",
  "sandy",
  "satin",
  "sauce",
  "sauna",
  "scald",
  "scale",
  "scalp",
  "scare",
  "scarf",
  "scene",
  "scent",
  "scoop",
  "scope",
  "score",
  "scorn",
  "scout",
  "scrap",
  "screw",
  "seize",
  "semen",
  "sense",
  "serum",
  "serve",
  "setup",
  "sewer",
  "shack",
  "shade",
  "shaft",
  "shake",
  "shaky",
  "shame",
  "shark",
  "sharp",
  "shave",
  "shear",
  "sheep",
  "sheer",
  "shelf",
  "shell",
  "shift",
  "shine",
  "shiny",
  "shirt",
  "shock",
  "shone",
  "shoot",
  "shore",
  "short",
  "shout",
  "shown",
  "shrub",
  "shrug",
  "sided",
  "siege",
  "sight",
  "sigma",
  "silky",
  "silly",
  "since",
  "siren",
  "sixth",
  "sixty",
  "skate",
  "skier",
  "skill",
  "skirt",
  "skull",
  "slack",
  "slain",
  "slang",
  "slash",
  "slave",
  "sleek",
  "sleep",
  "sleet",
  "slept",
  "slice",
  "slide",
  "sling",
  "slope",
  "sloth",
  "slump",
  "smack",
  "small",
  "smart",
  "smash",
  "smell",
  "smile",
  "smoke",
  "snack",
  "snail",
  "snake",
  "snare",
  "sneak",
  "sneer",
  "snore",
  "snort",
  "snowy",
  "soapy",
  "sober",
  "soggy",
  "solar",
  "solid",
  "sonar",
  "sooth",
  "sorry",
  "sound",
  "south",
  "space",
  "spade",
  "spare",
  "spark",
  "speak",
  "spear",
  "speed",
  "spell",
  "spend",
  "spent",
  "spice",
  "spicy",
  "spike",
  "spine",
  "spiny",
  "spite",
  "spoil",
  "spoke",
  "spoon",
  "sport",
  "spout",
  "spray",
  "spree",
  "squad",
  "squat",
  "squid",
  "stack",
  "staff",
  "stage",
  "stain",
  "stair",
  "stake",
  "stale",
  "stalk",
  "stall",
  "stamp",
  "stand",
  "stare",
  "start",
  "state",
  "stave",
  "steam",
  "steel",
  "steep",
  "steer",
  "stern",
  "stick",
  "stiff",
  "still",
  "sting",
  "stink",
  "stint",
  "stock",
  "stole",
  "stone",
  "stony",
  "stood",
  "stool",
  "store",
  "storm",
  "story",
  "stout",
  "stove",
  "strap",
  "straw",
  "strip",
  "stuck",
  "study",
  "stuff",
  "stump",
  "stung",
  "stunt",
  "style",
  "sugar",
  "suite",
  "sulky",
  "sunny",
  "super",
  "surge",
  "swamp",
  "swarm",
  "swear",
  "sweat",
  "sweep",
  "sweet",
  "swell",
  "swept",
  "swift",
  "swing",
  "swirl",
  "sword",
  "sworn",
  "synod",
  "syrup",
  "table",
  "tacit",
  "tacky",
  "taint",
  "taken",
  "tally",
  "talon",
  "tango",
  "tardy",
  "taste",
  "tasty",
  "taunt",
  "teach",
  "tease",
  "teddy",
  "teeth",
  "tempo",
  "tenor",
  "tense",
  "tenth",
  "tents",
  "terry",
  "texas",
  "thank",
  "theft",
  "their",
  "theme",
  "there",
  "these",
  "thick",
  "thief",
  "thigh",
  "thing",
  "think",
  "third",
  "thorn",
  "those",
  "three",
  "threw",
  "throb",
  "throw",
  "thump",
  "thumb",
  "tiger",
  "tight",
  "tilde",
  "timer",
  "times",
  "tired",
  "titan",
  "title",
  "toast",
  "today",
  "token",
  "tonic",
  "tooth",
  "topic",
  "torch",
  "torso",
  "total",
  "touch",
  "tough",
  "towel",
  "tower",
  "toxic",
  "trace",
  "track",
  "tract",
  "trade",
  "trail",
  "train",
  "trait",
  "trans",
  "trash",
  "tread",
  "treat",
  "trend",
  "trial",
  "tribe",
  "trick",
  "tried",
  "tries",
  "tripe",
  "trite",
  "troll",
  "troop",
  "trout",
  "truck",
  "truly",
  "trump",
  "trunk",
  "trust",
  "truth",
  "tulip",
  "tummy",
  "tuned",
  "tuner",
  "tunic",
  "turbo",
  "turns",
  "tutor",
  "twang",
  "tweak",
  "tweed",
  "twice",
  "twine",
  "twist",
  "uncle",
  "under",
  "undue",
  "unfit",
  "union",
  "unite",
  "unity",
  "unlit",
  "upper",
  "upset",
  "urban",
  "urged",
  "urine",
  "usage",
  "usual",
  "usher",
  "vague",
  "valet",
  "valid",
  "value",
  "valve",
  "vapid",
  "vault",
  "vegan",
  "venom",
  "venue",
  "verse",
  "vicar",
  "video",
  "vigil",
  "villa",
  "vinyl",
  "viola",
  "viper",
  "viral",
  "virus",
  "visit",
  "vista",
  "vital",
  "vivid",
  "vocal",
  "vodka",
  "vogue",
  "voice",
  "vomit",
  "voter",
  "vouch",
  "vowel",
  "wacky",
  "wafer",
  "wager",
  "wagon",
  "waist",
  "waive",
  "waltz",
  "waste",
  "watch",
  "water",
  "weary",
  "weave",
  "wedge",
  "weeds",
  "weigh",
  "weird",
  "whale",
  "wheat",
  "wheel",
  "where",
  "which",
  "whiff",
  "while",
  "whine",
  "whiny",
  "whirl",
  "white",
  "whole",
  "whoop",
  "whose",
  "widen",
  "wider",
  "widow",
  "width",
  "wield",
  "wight",
  "willy",
  "wince",
  "winch",
  "windy",
  "wiped",
  "wired",
  "wiser",
  "wispy",
  "witch",
  "wives",
  "woman",
  "women",
  "woody",
  "wooly",
  "woozy",
  "wordy",
  "world",
  "worry",
  "worse",
  "worst",
  "worth",
  "would",
  "wound",
  "woven",
  "wrack",
  "wrath",
  "wreak",
  "wreck",
  "wrest",
  "wring",
  "wrist",
  "write",
  "wrong",
  "wrote",
  "xerox",
  "yacht",
  "yearn",
  "yeast",
  "yield",
  "young",
  "youth",
  "yummy",
  "zebra",
  "zesty",
  "zonal",
  "zoned",
  "zones",
  "zowie"
];
function tone(freq, durationMs, type = "sine", gain = 0.05) {
  return;
}
function useSounds() {
  const canVibrate = false;
  const vibrate = (pattern) => {
    try {
      if (canVibrate) ;
    } catch {
    }
  };
  function click() {
    vibrate();
  }
  function backspace() {
    vibrate();
  }
  function error() {
    setTimeout(() => tone(120, 120, "sawtooth", 0.05), 120);
    vibrate();
  }
  function win() {
    const seq = [523.25, 659.25, 783.99, 1046.5];
    seq.forEach((f, i) => setTimeout(() => tone(f, 140, "sine", 0.06), i * 120));
    vibrate();
  }
  function lose() {
    const seq = [440, 349.23, 261.63];
    seq.forEach((f, i) => setTimeout(() => tone(f, 180, "triangle", 0.06), i * 170));
    vibrate();
  }
  function dangerTick() {
    vibrate();
  }
  return { click, backspace, error, win, lose, dangerTick };
}
const ROWS = 5;
const COLS = 5;
function normalizeWord(w) {
  return w.trim().toLowerCase();
}
function createDictionary(initial) {
  const arr = ref([...initial]);
  const set = ref(new Set(initial));
  function addMany(words) {
    let added = 0;
    for (const w of words.map(normalizeWord)) {
      if (w.length !== 5 || /[^a-z]/.test(w)) continue;
      if (!set.value.has(w)) {
        set.value.add(w);
        arr.value.push(w);
        added++;
      }
    }
    return added;
  }
  function has(w) {
    return set.value.has(normalizeWord(w));
  }
  function randomUpper() {
    const idx = Math.floor(Math.random() * arr.value.length);
    return arr.value[idx].toUpperCase();
  }
  return { arr, set, addMany, has, randomUpper };
}
function evaluateGuess(guess, answer) {
  const res = Array(COLS).fill("absent");
  const answerChars = answer.split("");
  const guessChars = guess.split("");
  const remaining = {};
  for (let i = 0; i < COLS; i++) {
    if (guessChars[i] === answerChars[i]) {
      res[i] = "correct";
    } else {
      const ch = answerChars[i];
      remaining[ch] = (remaining[ch] || 0) + 1;
    }
  }
  for (let i = 0; i < COLS; i++) {
    if (res[i] === "correct") continue;
    const ch = guessChars[i];
    if (remaining[ch] > 0) {
      res[i] = "present";
      remaining[ch]--;
    } else {
      res[i] = "absent";
    }
  }
  return res;
}
function upgradeStatus(prev, next) {
  const rank = { absent: 0, present: 1, correct: 2 };
  return rank[next] > rank[prev] ? next : prev;
}
function useWordle() {
  const sounds = useSounds();
  const dict = createDictionary(WORDS);
  const state = reactive({
    board: Array.from({ length: ROWS }, () => ({ letters: Array.from({ length: COLS }, () => ({ letter: "", state: "empty" })) })),
    currentRow: 0,
    currentCol: 0,
    answer: dict.randomUpper(),
    keyboard: {},
    status: "playing",
    message: null
  });
  const lettersOnly = (s) => s.replace(/[^A-Za-z]/g, "");
  function inputLetter(ch) {
    if (state.status !== "playing") return;
    if (state.currentCol >= COLS) return;
    ch = lettersOnly(ch).toUpperCase();
    if (!ch) return;
    const cell = state.board[state.currentRow].letters[state.currentCol];
    cell.letter = ch;
    cell.state = "tbd";
    state.currentCol++;
    sounds.click();
  }
  function backspace() {
    if (state.status !== "playing") return;
    if (state.currentCol === 0) return;
    state.currentCol--;
    const cell = state.board[state.currentRow].letters[state.currentCol];
    cell.letter = "";
    cell.state = "empty";
    sounds.backspace();
  }
  function submit() {
    if (state.status !== "playing") return;
    if (state.currentCol < COLS) {
      sounds.error();
      return toast("Not enough letters");
    }
    const guess = state.board[state.currentRow].letters.map((c) => c.letter).join("");
    if (!dict.has(guess)) {
      sounds.error();
      return toast("Not in word list");
    }
    const evaluation = evaluateGuess(guess, state.answer);
    for (let i = 0; i < COLS; i++) {
      state.board[state.currentRow].letters[i].state = evaluation[i];
      const ch = state.board[state.currentRow].letters[i].letter;
      const next = evaluation[i];
      state.keyboard[ch] = state.keyboard[ch] ? upgradeStatus(state.keyboard[ch], next) : next;
    }
    if (guess === state.answer) {
      state.status = "won";
      sounds.win();
      return toast("Great! You guessed it!");
    }
    if (state.currentRow === ROWS - 1) {
      state.status = "lost";
      sounds.lose();
      return toast(`The word was ${state.answer}`);
    }
    state.currentRow++;
    state.currentCol = 0;
  }
  function toast(msg) {
    state.message = msg;
    setTimeout(() => {
      if (state.message === msg) state.message = null;
    }, 1600);
  }
  function reset(randomize = true) {
    state.board = Array.from({ length: ROWS }, () => ({ letters: Array.from({ length: COLS }, () => ({ letter: "", state: "empty" })) }));
    state.currentRow = 0;
    state.currentCol = 0;
    state.answer = randomize ? dict.randomUpper() : state.answer;
    state.keyboard = {};
    state.status = "playing";
    state.message = null;
  }
  return { state, inputLetter, backspace, submit, reset };
}
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "game",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const mode = route.query.mode === "pro" ? "pro" : "easy";
    const isPro = mode === "pro";
    const { state, inputLetter, backspace, submit, reset } = useWordle();
    const remaining = ref(180);
    let timerId = null;
    const dangerActive = computed(() => isPro && state.status === "playing" && remaining.value <= 10 && remaining.value > 0);
    function formatTime(s) {
      const m = Math.floor(s / 60).toString().padStart(2, "0");
      const sec = Math.floor(s % 60).toString().padStart(2, "0");
      return `${m}:${sec}`;
    }
    function stopTimer() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    }
    function startTimer() {
      if (!isPro) return;
      stopTimer();
      remaining.value = 180;
      timerId = setInterval();
    }
    function onKey(key) {
      if (key === "ENTER") return submit();
      if (key === "⌫") return backspace();
      inputLetter(key);
    }
    watch(() => state.status, (s) => {
      if (s !== "playing") stopTimer();
    });
    function onNew() {
      reset();
      if (isPro) startTimer();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center px-4 pt-6 safe-bottom" }, _attrs))} data-v-24e24bfb><header class="w-full max-w-xl flex items-center justify-between mb-4" data-v-24e24bfb><div class="flex items-center gap-3" data-v-24e24bfb><button class="text-sm bg-absent hover:bg-gray-600 px-2 py-1 rounded" data-v-24e24bfb>Menu</button><h1 class="text-xl sm:text-2xl font-extrabold tracking-wide" data-v-24e24bfb>Wordle</h1>`);
      if (isPro) {
        _push(`<span class="ml-2 text-sm px-2 py-1 rounded bg-absent text-white" data-v-24e24bfb>PRO</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-3" data-v-24e24bfb>`);
      if (isPro) {
        _push(`<div class="${ssrRenderClass([unref(dangerActive) ? "bg-red-600 text-white border-red-500 animate-pulse" : "bg-tile text-gray-100 border-gray-700", "text-lg font-mono tabular-nums px-2 py-1 rounded border"])}" data-v-24e24bfb>${ssrInterpolate(formatTime(unref(remaining)))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="text-sm bg-correct hover:bg-green-600 px-3 py-1.5 rounded" data-v-24e24bfb>New</button></div></header><main class="w-full flex flex-col gap-4 items-center" data-v-24e24bfb>`);
      _push(ssrRenderComponent(WordleBoard, {
        board: unref(state).board,
        "current-row": unref(state).currentRow
      }, null, _parent));
      if (unref(state).message) {
        _push(`<div class="fixed top-4 left-1/2 -translate-x-1/2 bg-tile text-white px-4 py-2 rounded shadow" data-v-24e24bfb>${ssrInterpolate(unref(state).message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(ResultModal, {
        show: unref(state).status !== "playing",
        status: unref(state).status,
        answer: unref(state).answer,
        onAgain: ($event) => onNew(),
        onClose: ($event) => unref(reset)(false)
      }, null, _parent));
      _push(ssrRenderComponent(WordleKeyboard, {
        "key-state": unref(state).keyboard,
        onKey
      }, null, _parent));
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/game.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const game = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-24e24bfb"]]);

export { game as default };
//# sourceMappingURL=game-DWNHvBey.mjs.map
