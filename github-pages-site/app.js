const TRIGRAMS_BY_CODE = {
  7: { name: "乾", symbol: "☰", nature: "天", meaning: "刚健、开创" },
  3: { name: "兑", symbol: "☱", nature: "泽", meaning: "喜悦、沟通" },
  5: { name: "离", symbol: "☲", nature: "火", meaning: "光明、附丽" },
  1: { name: "震", symbol: "☳", nature: "雷", meaning: "行动、奋发" },
  6: { name: "巽", symbol: "☴", nature: "风", meaning: "渗透、柔入" },
  2: { name: "坎", symbol: "☵", nature: "水", meaning: "险阻、智慧" },
  4: { name: "艮", symbol: "☶", nature: "山", meaning: "止定、界限" },
  0: { name: "坤", symbol: "☷", nature: "地", meaning: "顺承、包容" },
};

const HEXAGRAM_BASE = [
  { id: 1, name: "乾", upper: "乾", lower: "乾", theme: "自强不息，主动承担并持续精进。" },
  { id: 2, name: "坤", upper: "坤", lower: "坤", theme: "厚德载物，以柔顺承载万事万物。" },
  { id: 3, name: "屯", upper: "坎", lower: "震", theme: "万事初创多艰，宜立志并稳步推进。" },
  { id: 4, name: "蒙", upper: "艮", lower: "坎", theme: "启蒙重在求教与自省，避免轻率。" },
  { id: 5, name: "需", upper: "坎", lower: "乾", theme: "在等待中积蓄力量，时机成熟再进。" },
  { id: 6, name: "讼", upper: "乾", lower: "坎", theme: "冲突之中求公正，宜止争而求和。" },
  { id: 7, name: "师", upper: "坤", lower: "坎", theme: "组织行动贵在纪律与共同目标。" },
  { id: 8, name: "比", upper: "坎", lower: "坤", theme: "亲比合作，以诚信建立稳定关系。" },
  { id: 9, name: "小畜", upper: "巽", lower: "乾", theme: "小有蓄积，先整合资源再图大事。" },
  { id: 10, name: "履", upper: "乾", lower: "兑", theme: "行事守礼有序，谨慎前行可亨。" },
  { id: 11, name: "泰", upper: "坤", lower: "乾", theme: "上下通达，宜把握和顺发展的窗口。" },
  { id: 12, name: "否", upper: "乾", lower: "坤", theme: "闭塞不通时，守正待时比硬冲更好。" },
  { id: 13, name: "同人", upper: "乾", lower: "离", theme: "以共同价值凝聚同道，协作成事。" },
  { id: 14, name: "大有", upper: "离", lower: "乾", theme: "资源丰足时更要谦抑与节制。" },
  { id: 15, name: "谦", upper: "坤", lower: "艮", theme: "谦逊可久，低位处事反得众助。" },
  { id: 16, name: "豫", upper: "震", lower: "坤", theme: "预备与鼓舞并行，乐观但不失分寸。" },
  { id: 17, name: "随", upper: "兑", lower: "震", theme: "顺势而为，同时保持内在原则。" },
  { id: 18, name: "蛊", upper: "艮", lower: "巽", theme: "积弊须治，整顿从根源与结构入手。" },
  { id: 19, name: "临", upper: "坤", lower: "兑", theme: "临事亲民，越接近目标越需谨慎。" },
  { id: 20, name: "观", upper: "巽", lower: "坤", theme: "观察反思，先看清全局再作判断。" },
  { id: 21, name: "噬嗑", upper: "离", lower: "震", theme: "以法度决断阻碍，刚柔并用去梗。" },
  { id: 22, name: "贲", upper: "艮", lower: "离", theme: "文饰应服务本质，形式不可压过内容。" },
  { id: 23, name: "剥", upper: "艮", lower: "坤", theme: "衰退期重在保全根本，减少折损。" },
  { id: 24, name: "复", upper: "坤", lower: "震", theme: "回归正道，小步重启可渐入佳境。" },
  { id: 25, name: "无妄", upper: "乾", lower: "震", theme: "守真不妄，按规律行事更稳妥。" },
  { id: 26, name: "大畜", upper: "艮", lower: "乾", theme: "厚积薄发，先修德蓄能后行大事。" },
  { id: 27, name: "颐", upper: "艮", lower: "震", theme: "养正为先，言行与饮食皆需节制。" },
  { id: 28, name: "大过", upper: "兑", lower: "巽", theme: "压力过重时，要果断调整支撑结构。" },
  { id: 29, name: "坎", upper: "坎", lower: "坎", theme: "险中求通，以诚信与智谋渡难关。" },
  { id: 30, name: "离", upper: "离", lower: "离", theme: "以明辨附丽正道，借光明而成事。" },
  { id: 31, name: "咸", upper: "兑", lower: "艮", theme: "感应相通，关系建立重在真诚。" },
  { id: 32, name: "恒", upper: "震", lower: "巽", theme: "持久之道在于守常并持续改进。" },
  { id: 33, name: "遁", upper: "乾", lower: "艮", theme: "当退则退，保存实力以待来机。" },
  { id: 34, name: "大壮", upper: "震", lower: "乾", theme: "势强时更需守礼，防止刚过易折。" },
  { id: 35, name: "晋", upper: "离", lower: "坤", theme: "顺势上进，依靠明德与信用前行。" },
  { id: 36, name: "明夷", upper: "坤", lower: "离", theme: "光明受伤之时，内明外晦以自保。" },
  { id: 37, name: "家人", upper: "巽", lower: "离", theme: "家道有序，分工明确则内外皆治。" },
  { id: 38, name: "睽", upper: "离", lower: "兑", theme: "同中有异，求同存异方可合作。" },
  { id: 39, name: "蹇", upper: "坎", lower: "艮", theme: "遇阻先止，借助伙伴与方法绕行。" },
  { id: 40, name: "解", upper: "震", lower: "坎", theme: "困局可解，宜果断松绑并重建秩序。" },
  { id: 41, name: "损", upper: "艮", lower: "兑", theme: "适度减损以成全大局，贵在有度。" },
  { id: 42, name: "益", upper: "巽", lower: "震", theme: "增益他人即增益自己，利于长远。" },
  { id: 43, name: "夬", upper: "兑", lower: "乾", theme: "关键节点需决断，但方式应光明正大。" },
  { id: 44, name: "姤", upper: "乾", lower: "巽", theme: "突遇机缘要辨其轻重，勿被牵引。" },
  { id: 45, name: "萃", upper: "兑", lower: "坤", theme: "聚众成势，先立核心规则与愿景。" },
  { id: 46, name: "升", upper: "坤", lower: "巽", theme: "稳步上升，以谦逊和踏实累积高度。" },
  { id: 47, name: "困", upper: "兑", lower: "坎", theme: "受困之际重在守志，内在不屈则有出路。" },
  { id: 48, name: "井", upper: "坎", lower: "巽", theme: "制度如井，重在长期供养与维护。" },
  { id: 49, name: "革", upper: "兑", lower: "离", theme: "变革需合时合众，先立共识再推进。" },
  { id: 50, name: "鼎", upper: "离", lower: "巽", theme: "鼎新与承载并重，重塑价值体系。" },
  { id: 51, name: "震", upper: "震", lower: "震", theme: "震动来时，先定心再行动。" },
  { id: 52, name: "艮", upper: "艮", lower: "艮", theme: "止于其所，懂得停下是另一种智慧。" },
  { id: 53, name: "渐", upper: "巽", lower: "艮", theme: "循序渐进，慢就是快的长期路径。" },
  { id: 54, name: "归妹", upper: "震", lower: "兑", theme: "关系结合要合礼合位，不可急进。" },
  { id: 55, name: "丰", upper: "震", lower: "离", theme: "盛大之时更应防盛极转衰。" },
  { id: 56, name: "旅", upper: "离", lower: "艮", theme: "在外之道是审慎、自持与守礼。" },
  { id: 57, name: "巽", upper: "巽", lower: "巽", theme: "柔入而行，持续渗透终能达成目标。" },
  { id: 58, name: "兑", upper: "兑", lower: "兑", theme: "以悦服人，沟通与信任并重。" },
  { id: 59, name: "涣", upper: "巽", lower: "坎", theme: "涣散可解，先聚焦共同核心。" },
  { id: 60, name: "节", upper: "坎", lower: "兑", theme: "制度化节制，边界清晰方可长久。" },
  { id: 61, name: "中孚", upper: "巽", lower: "兑", theme: "内心诚信，方能感通他人与环境。" },
  { id: 62, name: "小过", upper: "震", lower: "艮", theme: "小事可过，大事宜谨，重在分寸。" },
  { id: 63, name: "既济", upper: "坎", lower: "离", theme: "功成之后最要警惕松懈与反复。" },
  { id: 64, name: "未济", upper: "离", lower: "坎", theme: "未成之局，保持秩序与耐心可终成。" },
];

const LINE_POSITION_LABELS = ["初", "二", "三", "四", "五", "上"];
const MID_LINE_CN = { 1: "二", 2: "三", 3: "四", 4: "五" };

const TRIGRAM_CODE_BY_NAME = Object.entries(TRIGRAMS_BY_CODE).reduce((acc, [code, trigram]) => {
  acc[trigram.name] = Number(code);
  return acc;
}, {});

const HEXAGRAM_BASE_BY_ID = Object.fromEntries(HEXAGRAM_BASE.map((item) => [item.id, item]));
const HEXAGRAM_KEY_TO_ID = Object.fromEntries(HEXAGRAM_BASE.map((item) => [`${item.upper}|${item.lower}`, item.id]));

const HEXAGRAM_DATA = HEXAGRAM_BASE.map((item) => {
  const original = HEXAGRAM_ORIGINALS?.[item.id] || {};
  return {
    ...item,
    judgmentTextOriginal: original.judgmentTextOriginal || "",
    tuanOriginal: original.tuanOriginal || "",
    xiangOriginal: original.xiangOriginal || "",
    lineTextsOriginal: Array.isArray(original.lineTextsOriginal) ? original.lineTextsOriginal : [],
  };
}).reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

const state = {
  lines: [1, 1, 1, 1, 1, 1],
  selectedChangingLine: null,
  currentHexagram: null,
  changedHexagram: null,
};

const lineListEl = document.getElementById("line-list");
const upperTrigramNameEl = document.getElementById("upper-trigram-name");
const upperTrigramSymbolEl = document.getElementById("upper-trigram-symbol");
const lowerTrigramNameEl = document.getElementById("lower-trigram-name");
const lowerTrigramSymbolEl = document.getElementById("lower-trigram-symbol");
const titleEl = document.getElementById("hexagram-title");
const metaEl = document.getElementById("hexagram-meta");
const currentPanelEl = document.getElementById("current-hexagram-panel");
const changedPanelEl = document.getElementById("changed-hexagram-panel");
const changeLineButtonsEl = document.getElementById("change-line-buttons");
const hexagramNavEl = document.getElementById("hexagram-nav");

function buildHexagramSign(id) {
  return id >= 1 && id <= 64 ? String.fromCodePoint(0x4dc0 + id - 1) : "未知";
}

function codeToThreeLines(code) {
  return [code & 1, (code >> 1) & 1, (code >> 2) & 1];
}

function getLinesFromHexagram(item) {
  const lower = codeToThreeLines(TRIGRAM_CODE_BY_NAME[item.lower]);
  const upper = codeToThreeLines(TRIGRAM_CODE_BY_NAME[item.upper]);
  return [...lower, ...upper];
}

function buildLineTitle(index, isYang) {
  if (index === 0) return isYang ? "初九" : "初六";
  if (index === 5) return isYang ? "上九" : "上六";
  return isYang ? `九${MID_LINE_CN[index]}` : `六${MID_LINE_CN[index]}`;
}

function computeTrigrams(lines) {
  const lowerCode = lines[0] + lines[1] * 2 + lines[2] * 4;
  const upperCode = lines[3] + lines[4] * 2 + lines[5] * 4;
  return {
    lowerTrigram: TRIGRAMS_BY_CODE[lowerCode],
    upperTrigram: TRIGRAMS_BY_CODE[upperCode],
  };
}

function computeHexagram(lines) {
  const { lowerTrigram, upperTrigram } = computeTrigrams(lines);
  const key = `${upperTrigram.name}|${lowerTrigram.name}`;
  const id = HEXAGRAM_KEY_TO_ID[key];
  const meta = HEXAGRAM_DATA[id];
  return { id, meta, lowerTrigram, upperTrigram };
}

function computeChangedHexagram(lines, changingLineIndex) {
  if (changingLineIndex === null) return null;
  const next = [...lines];
  next[changingLineIndex] = next[changingLineIndex] ? 0 : 1;
  return computeHexagram(next);
}

function renderLineList() {
  const current = state.currentHexagram;
  const lineTexts = current?.meta?.lineTextsOriginal || [];
  const upperName = current?.upperTrigram?.name || "";
  const lowerName = current?.lowerTrigram?.name || "";

  lineListEl.innerHTML = "";
  for (let displayIndex = 5; displayIndex >= 0; displayIndex -= 1) {
    const isYang = state.lines[displayIndex] === 1;
    const row = document.createElement("div");
    row.className = "line-item";

    const trigramSide = document.createElement("span");
    trigramSide.className = "trigram-side";
    if (displayIndex === 4) {
      trigramSide.textContent = upperName;
      trigramSide.classList.add("upper");
    } else if (displayIndex === 1) {
      trigramSide.textContent = lowerName;
      trigramSide.classList.add("lower");
    } else {
      trigramSide.textContent = "";
      trigramSide.classList.add("blank");
    }

    const lineButton = document.createElement("button");
    lineButton.type = "button";
    lineButton.className = `line-btn ${isYang ? "yang" : "yin"}`;
    lineButton.setAttribute("aria-pressed", isYang ? "true" : "false");
    lineButton.setAttribute("aria-label", `${LINE_POSITION_LABELS[displayIndex]}爻，点击切换阴阳`);
    lineButton.addEventListener("click", () => {
      state.lines[displayIndex] = state.lines[displayIndex] ? 0 : 1;
      recomputeAndRender();
    });

    if (isYang) {
      const segment = document.createElement("div");
      segment.className = "line-segment";
      lineButton.appendChild(segment);
    } else {
      for (let i = 0; i < 2; i += 1) {
        const segment = document.createElement("div");
        segment.className = "line-segment";
        lineButton.appendChild(segment);
      }
    }

    const detail = document.createElement("p");
    detail.className = "line-detail";
    detail.innerHTML = `<span class="line-detail-title">${buildLineTitle(displayIndex, isYang)}：</span>${lineTexts[displayIndex] || "（该爻原文暂缺）"}`;

    row.appendChild(trigramSide);
    row.appendChild(lineButton);
    row.appendChild(detail);
    lineListEl.appendChild(row);
  }
}

function renderChangeLineButtons() {
  const options = [
    { label: "无", value: null },
    { label: "初", value: 0 },
    { label: "二", value: 1 },
    { label: "三", value: 2 },
    { label: "四", value: 3 },
    { label: "五", value: 4 },
    { label: "上", value: 5 },
  ];
  changeLineButtonsEl.innerHTML = "";
  for (const item of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip-btn";
    if (item.value === state.selectedChangingLine) button.classList.add("active");
    button.textContent = item.label;
    button.addEventListener("click", () => {
      state.selectedChangingLine = item.value;
      recomputeAndRender();
    });
    changeLineButtonsEl.appendChild(button);
  }
}

function renderHexagramPanel(hexagramData, container, title) {
  if (!hexagramData || !hexagramData.meta) {
    container.innerHTML = `<p>暂无卦象数据。</p>`;
    return;
  }
  const { id, meta, lowerTrigram, upperTrigram } = hexagramData;
  container.innerHTML = `
    <div class="hexagram-head">
      <h2>${title}：${id}. ${meta.name}</h2>
      <span class="hexagram-sign">${buildHexagramSign(id)}</span>
    </div>
    <p><span class="label">上下卦：</span>${upperTrigram.name}${upperTrigram.symbol}（${upperTrigram.nature}）上 / ${lowerTrigram.name}${lowerTrigram.symbol}（${lowerTrigram.nature}）下</p>
    <p><span class="label">卦辞原文：</span>${meta.judgmentTextOriginal || "（暂缺）"}</p>
    <p><span class="label">现代解读：</span>${meta.theme}</p>
    <p><span class="label">彖曰原文：</span>${meta.tuanOriginal || "（暂缺）"}</p>
    <p><span class="label">象曰原文：</span>${meta.xiangOriginal || "（暂缺）"}</p>
  `;
}

function renderHexagramNav() {
  hexagramNavEl.innerHTML = "";
  HEXAGRAM_BASE.forEach((item) => {
    const lines = getLinesFromHexagram(item);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nav-item";
    btn.dataset.hexagramId = String(item.id);
    btn.setAttribute("aria-label", `切换到第${item.id}卦 ${item.name}`);

    const tiny = document.createElement("div");
    tiny.className = "mini-hexagram";
    for (let i = 5; i >= 0; i -= 1) {
      const miniLine = document.createElement("div");
      miniLine.className = `mini-line ${lines[i] === 1 ? "yang" : "yin"}`;
      tiny.appendChild(miniLine);
    }

    const label = document.createElement("span");
    label.className = "nav-label";
    label.textContent = `${item.id}. ${item.name}`;

    btn.appendChild(tiny);
    btn.appendChild(label);
    btn.addEventListener("click", () => {
      state.lines = [...lines];
      state.selectedChangingLine = null;
      recomputeAndRender();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    hexagramNavEl.appendChild(btn);
  });
}

function highlightActiveNav() {
  const currentId = String(state.currentHexagram?.id || "");
  hexagramNavEl.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.hexagramId === currentId);
  });
}

function recomputeAndRender() {
  state.currentHexagram = computeHexagram(state.lines);
  state.changedHexagram = computeChangedHexagram(state.lines, state.selectedChangingLine);

  renderLineList();
  renderChangeLineButtons();
  highlightActiveNav();

  const current = state.currentHexagram;
  titleEl.textContent = `本卦：${current?.meta?.name || "未知"}`;
  metaEl.textContent = `编号 ${current?.id || "-"} · 点击任一爻切换阴阳`;

  upperTrigramNameEl.textContent = `${current.upperTrigram.name}（${current.upperTrigram.meaning}）`;
  upperTrigramSymbolEl.textContent = current.upperTrigram.symbol;
  lowerTrigramNameEl.textContent = `${current.lowerTrigram.name}（${current.lowerTrigram.meaning}）`;
  lowerTrigramSymbolEl.textContent = current.lowerTrigram.symbol;

  renderHexagramPanel(current, currentPanelEl, "本卦");
  if (state.changedHexagram) {
    const label = `${LINE_POSITION_LABELS[state.selectedChangingLine]}爻变`;
    renderHexagramPanel(state.changedHexagram, changedPanelEl, `之卦（${label}）`);
    changedPanelEl.classList.remove("hidden");
  } else {
    changedPanelEl.classList.add("hidden");
    changedPanelEl.innerHTML = "";
  }
}

document.getElementById("reset-btn").addEventListener("click", () => {
  state.lines = getLinesFromHexagram(HEXAGRAM_BASE_BY_ID[1]);
  state.selectedChangingLine = null;
  recomputeAndRender();
});

document.getElementById("random-btn").addEventListener("click", () => {
  state.lines = Array.from({ length: 6 }, () => Math.round(Math.random()));
  state.selectedChangingLine = null;
  recomputeAndRender();
});

renderHexagramNav();
state.lines = getLinesFromHexagram(HEXAGRAM_BASE_BY_ID[1]);
recomputeAndRender();
