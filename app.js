const shell = document.querySelector(".page-shell");
const aiLayer = document.querySelector("#aiLayer");

const stages = {
  entry: renderEntry,
  lock: renderLock,
  analysis: renderAnalysis,
  recognition: renderRecognition,
  choice: renderChoice,
  loading: renderLoading,
  result: renderResult,
};

const choices = {
  rules: {
    label: "按规矩递刀",
    cards: [
      ["即时剧情", "沈照压下疑心，将刀匣按规矩递到顾寒舟手中。交接完成，雪夜恢复沉默，半月铜钉的旧痕被重新盖住。"],
      ["角色改变", "他仍是那个“不问因果”的递刀人，只是这一次，他比任何时候都更清楚沉默也会留下重量。"],
      ["关系影响", "顾寒舟没有察觉沈照的迟疑，两人的关系暂时停留在雇主与递刀人之间，信任也因此显得干净而脆弱。"],
      ["后续伏笔", "旧山门案继续埋在雪下。沈照会在更晚的时候发现，自己守住的规矩，也可能曾替真相关上门。"],
    ],
    emotion: "他保住了递刀人的行规，却把一个迟到的疑问留给了更深的夜。"
  },
  hold: {
    label: "扣匣不交",
    cards: [
      ["即时剧情", "沈照按住刀匣，没有完成交接。顾寒舟停在雪阶下，第一次把目光从刀匣移到他的手上。"],
      ["角色改变", "他不再只是执行规矩的人。扣住匣子的那一刻，他也扣住了自己多年赖以活下去的生计。"],
      ["关系影响", "顾寒舟开始怀疑沈照另有隐情，试探代替了命令。两人之间短暂出现一种危险的平等。"],
      ["后续伏笔", "递刀人的名声将在江湖里裂开一道口子。沈照必须弄清半月铜钉背后究竟牵着谁的旧命。"],
    ],
    emotion: "他没有交出匣子，也没有立刻得到答案，只是把自己推到了风雪最亮处。"
  },
  slot: {
    label: "启开暗槽",
    cards: [
      ["即时剧情", "沈照顶开半月铜钉，在匣底摸到一封被雪水浸湿的旧信。交接被迫停下，顾寒舟第一次失去耐心。"],
      ["角色改变", "他不再只是“不问因果”的递刀人。十年前那次沉默，开始变成今夜必须承担的债。"],
      ["关系影响", "顾寒舟意识到沈照已经看见线索，信任在一瞬间转为试探。两人之间不再只是雇主与递刀人。"],
      ["后续伏笔", "旧山门案的名字重新浮出雪面。沈照将发现，自己送出的每一把刀，都可能曾经替别人掩埋真相。"],
    ],
    emotion: "观影体验的边界再远，也终究要回到人。<br>你看的不是故事，而是他从此要承担的一生。"
  },
};

let selectedChoice = "slot";

function setStage(stage) {
  shell.dataset.stage = stage;
  aiLayer.innerHTML = "";
  stages[stage]();
}

function button(text, className, onClick) {
  const el = document.createElement("button");
  el.className = className;
  el.textContent = text;
  el.addEventListener("click", onClick);
  return el;
}

function renderEntry() {
  const card = document.createElement("section");
  card.className = "entry-card glass";
  card.innerHTML = `
    <h2>AI 叙事伴生</h2>
    <p>AI 已识别到关键物件与命运节点，是否进入沈照的处境？</p>
  `;
  card.append(button("进入沈照的处境", "primary-button", () => setStage("lock")));
  aiLayer.append(card);
}

function renderLock() {
  const card = document.createElement("section");
  card.className = "lock-card glass";
  card.innerHTML = `
    <h2>✦ 关键片段已锁定</h2>
    <p>旧山门雪夜，递刀人沈照抵达山门。<br>
    他手中的刀匣本该送达即两清。<br>
    可雪水浸入匣底，一枚旧铜痕让他的手停住了。</p>
    <span class="mode-note">AI 叙事伴生模式已开启</span>
  `;
  card.append(button("继续解析沈照处境", "primary-button", () => setStage("analysis")));
  aiLayer.append(card);
}

function renderAnalysis() {
  aiLayer.innerHTML = `
    <section class="analysis-panel glass">
      <h2>✦ AI 已解析沈照处境</h2>
      <div class="analysis-list">
        <div class="analysis-row"><i>人</i><strong>角色身份</strong><span>沈照，江湖递刀人，靠“不问因果”维持生计。</span></div>
        <div class="analysis-row"><i>令</i><strong>当前任务</strong><span>将刀匣送至顾寒舟手中，完成交接。</span></div>
        <div class="analysis-row"><i>险</i><strong>潜在风险</strong><span>刀匣可能牵涉十年前旧山门案的真相。</span></div>
        <div class="analysis-row"><i>衡</i><strong>道德困境</strong><span>守规矩可以保全自己，却可能亲手让旧案继续沉入雪里。</span></div>
      </div>
      <button class="primary-button" id="recognizeButton">识别关键物件</button>
    </section>
  `;
  document.querySelector("#recognizeButton").addEventListener("click", () => setStage("recognition"));
}

function renderRecognition() {
  const zoom = document.createElement("section");
  zoom.className = "recognition-zoom glass";
  zoom.innerHTML = `
    <div class="object-box"></div>
    <div class="object-label"><span>关键物件</span><strong>半月铜钉</strong></div>
  `;

  const card = document.createElement("section");
  card.className = "recognition-card glass";
  card.innerHTML = `
    <h2>AI 识别到关键物件：<span>半月铜钉</span></h2>
    <p>它不是刀匣的锁，也不是装饰。</p>
    <p>它嵌在刀匣侧沿，和十年前旧山门案中的物件痕迹一致。</p>
    <p>沈照曾经摸到过同样的铜钉。那一次，他按规矩送出了匣子。</p>
    <p>今夜，他终于意识到：自己从来不是局外人。</p>
  `;
  card.append(button("进入命运选择", "primary-button", () => setStage("choice")));

  aiLayer.append(zoom, card);
}

function renderChoice() {
  aiLayer.innerHTML = `
    <section class="choice-mode">
      <h2>你要替沈照做出选择</h2>
      <p>这不是改写剧情，而是看见一条生命线如何偏移。</p>
      <div class="choice-grid">
        ${choiceCard("rules", "选择一", "按规矩递刀", "完成交接，保住递刀人的行规与生计。", "你可能亲手把真相推向更深的雪里。")}
        ${choiceCard("hold", "选择二", "扣匣不交", "暂时阻止交接，护住旧恩与眼前人。", "你背叛了递刀人的规矩，从此没有雇主敢信你。")}
        ${choiceCard("slot", "选择三", "启开暗槽", "顶开半月铜钉，查看匣底隐藏的旧信。", "你不再只是送刀的人，而会成为旧案的一部分。", true)}
      </div>
    </section>
  `;

  document.querySelectorAll(".choice-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedChoice = card.dataset.choice;
      setStage("loading");
      window.setTimeout(() => setStage("result"), 1000);
    });
  });
}

function choiceCard(key, order, title, body, cost, highlighted = false) {
  return `
    <button class="choice-card ${highlighted ? "highlight" : ""}" data-choice="${key}">
      <small>${order}</small>
      <h3>${title}</h3>
      <p>${body}</p>
      <strong>代价：</strong>
      <p>${cost}</p>
    </button>
  `;
}

function renderLoading() {
  aiLayer.innerHTML = `
    <section class="loading-panel glass" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <strong>AI 正在生成命运回声</strong>
      <span>正在推演“${choices[selectedChoice].label}”后的生命线偏移</span>
    </section>
  `;
}

function renderResult() {
  const data = choices[selectedChoice];
  const resultRows = data.cards.map(([title, text], index) => `
    <article class="result-card">
      <i>${["时", "人", "系", "伏"][index]}</i>
      <div>
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    </article>
  `).join("");

  aiLayer.innerHTML = `
    <section class="result-panel glass">
      <h2>命运回声</h2>
      <p>AI 生成的不是另一个结局，而是一条生命线的偏移。</p>
      <div class="result-list">${resultRows}</div>
      <div class="result-emotion">${data.emotion}</div>
      <div class="result-actions">
        <button class="quiet-button" id="backToOriginal">返回原剧集</button>
        <button class="gold-button" id="tryAnother">查看另一种回声</button>
      </div>
    </section>
  `;

  document.querySelector("#backToOriginal").addEventListener("click", () => setStage("entry"));
  document.querySelector("#tryAnother").addEventListener("click", () => setStage("choice"));
}

setStage("entry");
