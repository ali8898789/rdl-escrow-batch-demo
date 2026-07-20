const initialState = {
  monthDisbursed: 7.2,
  monthRepaid: 5.8,
  rdlToEscrow: 7.2,
  escrowToRdl: 5.8,
  lenderRdl: 18.4,
  destination: 13.0,
  escrowBalance: 0,
  interval: 10,
  bufferWindow: 10,
  fastLane: true,
  eodClear: true,
  planMode: "controlled",
  planChannel: "all",
  fundingBatch: null,
  repaymentBatch: null,
  alert: {
    type: "ok",
    title: "合规状态正常",
    body: "Escrow 无未解释余额。"
  },
  loans: [
    { id: "LN-82031", borrower: "BR-1048", amount: 0.62, sla: 3, status: "ready", lane: "fast" },
    { id: "LN-82032", borrower: "BR-1052", amount: 0.48, sla: 8, status: "ready", lane: "standard" },
    { id: "LN-82033", borrower: "BR-1056", amount: 0.91, sla: 12, status: "ready", lane: "standard" },
    { id: "LN-82034", borrower: "BR-1060", amount: 0.36, sla: 22, status: "pending", lane: "standard" },
    { id: "LN-82035", borrower: "BR-1068", amount: 0.72, sla: 5, status: "ready", lane: "fast" },
    { id: "LN-82036", borrower: "BR-1071", amount: 0.44, sla: 15, status: "ready", lane: "standard" }
  ],
  repayments: [
    { id: "RP-61011", lender: "RDL-2215", amount: 0.53, age: 4, status: "ready" },
    { id: "RP-61012", lender: "RDL-2244", amount: 0.31, age: 8, status: "ready" },
    { id: "RP-61013", lender: "RDL-2290", amount: 0.74, age: 11, status: "ready" },
    { id: "RP-61014", lender: "RDL-2308", amount: 0.27, age: 18, status: "ready" },
    { id: "RP-61015", lender: "RDL-2319", amount: 0.16, age: 25, status: "pending" }
  ],
  ledger: [
    {
      title: "日内批次初始化",
      body: "RDL/Escrow 月度额度已按实际业务额校准",
      amount: "Rp 0",
      kind: "ok"
    }
  ]
};

let state = structuredClone(initialState);

const planStartDate = "2026/7/1";
const planEndDate = "2026/7/15";
const topupAverageDays = 3;
const accessPasswordHash = "d3ad9315b7be5dd53b31a273b3b3aba5defe700808305aa16a3062b76658a791";
const channelActuals = {
  bca: {
    label: "BCA",
    rows: [
      { date: "2026/6/16", disbursementCount: 756, disbursement: 1263014500, repaymentCount: 1133, repayment: 1041048762 },
      { date: "2026/6/17", disbursementCount: 540, disbursement: 937220500, repaymentCount: 1299, repayment: 1145922870 },
      { date: "2026/6/18", disbursementCount: 788, disbursement: 1259567000, repaymentCount: 1186, repayment: 1101148400 },
      { date: "2026/6/19", disbursementCount: 931, disbursement: 1470844500, repaymentCount: 1183, repayment: 1098372993 },
      { date: "2026/6/20", disbursementCount: 690, disbursement: 1059146500, repaymentCount: 890, repayment: 757274575 },
      { date: "2026/6/21", disbursementCount: 840, disbursement: 1298508000, repaymentCount: 1060, repayment: 984358058 },
      { date: "2026/6/22", disbursementCount: 833, disbursement: 1311544500, repaymentCount: 1140, repayment: 1070934916 },
      { date: "2026/6/23", disbursementCount: 794, disbursement: 1317831000, repaymentCount: 1115, repayment: 1086595958 },
      { date: "2026/6/24", disbursementCount: 851, disbursement: 1503221500, repaymentCount: 1363, repayment: 1323292800 },
      { date: "2026/6/25", disbursementCount: 837, disbursement: 1454049000, repaymentCount: 1405, repayment: 1272316354 },
      { date: "2026/6/26", disbursementCount: 805, disbursement: 1426808000, repaymentCount: 1339, repayment: 1267078825 },
      { date: "2026/6/27", disbursementCount: 685, disbursement: 1184816000, repaymentCount: 1035, repayment: 878065848 },
      { date: "2026/6/28", disbursementCount: 678, disbursement: 1154292000, repaymentCount: 1190, repayment: 1160831470 },
      { date: "2026/6/29", disbursementCount: 822, disbursement: 1527736000, repaymentCount: 1604, repayment: 1437001850 },
      { date: "2026/6/30", disbursementCount: 727, disbursement: 1369572000, repaymentCount: 1822, repayment: 1611988168 },
      { date: "2026/7/1", disbursementCount: 689, disbursement: 1198477000, repaymentCount: 1644, repayment: 1483818170 },
      { date: "2026/7/2", disbursementCount: 845, disbursement: 1470248500, repaymentCount: 1455, repayment: 1304009370 },
      { date: "2026/7/3", disbursementCount: 822, disbursement: 1396764500, repaymentCount: 1364, repayment: 1202077924 },
      { date: "2026/7/4", disbursementCount: 762, disbursement: 1350886500, repaymentCount: 1080, repayment: 1005344655 },
      { date: "2026/7/5", disbursementCount: 564, disbursement: 921951500, repaymentCount: 1286, repayment: 1211874038 },
      { date: "2026/7/6", disbursementCount: 372, disbursement: 615222500, repaymentCount: 1460, repayment: 1348373525 },
      { date: "2026/7/7", disbursementCount: 0, disbursement: 0, repaymentCount: 1335, repayment: 1278669801 },
      { date: "2026/7/8", disbursementCount: 208, disbursement: 365693500, repaymentCount: 1295, repayment: 1260834079 },
      { date: "2026/7/9", disbursementCount: 221, disbursement: 333866000, repaymentCount: 1329, repayment: 1304273679 },
      { date: "2026/7/10", disbursementCount: 521, disbursement: 910730000, repaymentCount: 1342, repayment: 1280965599 },
      { date: "2026/7/11", disbursementCount: 323, disbursement: 529506500, repaymentCount: 972, repayment: 900326800 },
      { date: "2026/7/12", disbursementCount: 0, disbursement: 0, repaymentCount: 1240, repayment: 1232688561 },
      { date: "2026/7/13", disbursementCount: 0, disbursement: 0, repaymentCount: 1399, repayment: 1477917129 },
      { date: "2026/7/14", disbursementCount: 753, disbursement: 1324407000, repaymentCount: 1407, repayment: 1475376778 },
      { date: "2026/7/15", disbursementCount: 801, disbursement: 1362584000, repaymentCount: 1369, repayment: 1445743834 }
    ]
  },
  instamoney: {
    label: "instamoney",
    rows: [
      { date: "2026/6/16", disbursementCount: 1175, disbursement: 1697745800, repaymentCount: 1878, repayment: 1477140355 },
      { date: "2026/6/17", disbursementCount: 1528, disbursement: 2277043500, repaymentCount: 2014, repayment: 1590214854 },
      { date: "2026/6/18", disbursementCount: 1343, disbursement: 1955359500, repaymentCount: 1846, repayment: 1513622400 },
      { date: "2026/6/19", disbursementCount: 1270, disbursement: 1748097500, repaymentCount: 1824, repayment: 1492501400 },
      { date: "2026/6/20", disbursementCount: 1128, disbursement: 1503597500, repaymentCount: 1434, repayment: 1131374800 },
      { date: "2026/6/21", disbursementCount: 1218, disbursement: 1664529500, repaymentCount: 1593, repayment: 1288867270 },
      { date: "2026/6/22", disbursementCount: 1317, disbursement: 1871712000, repaymentCount: 1904, repayment: 1685386300 },
      { date: "2026/6/23", disbursementCount: 1223, disbursement: 1702082000, repaymentCount: 1748, repayment: 1470454000 },
      { date: "2026/6/24", disbursementCount: 1310, disbursement: 1933847500, repaymentCount: 1971, repayment: 1717689200 },
      { date: "2026/6/25", disbursementCount: 1327, disbursement: 1860472500, repaymentCount: 2181, repayment: 1817552700 },
      { date: "2026/6/26", disbursementCount: 1250, disbursement: 1714191000, repaymentCount: 1918, repayment: 1612286497 },
      { date: "2026/6/27", disbursementCount: 1142, disbursement: 1580813500, repaymentCount: 1528, repayment: 1204905100 },
      { date: "2026/6/28", disbursementCount: 1287, disbursement: 1966183500, repaymentCount: 1830, repayment: 1570915369 },
      { date: "2026/6/29", disbursementCount: 1279, disbursement: 1869673600, repaymentCount: 2117, repayment: 1826071465 },
      { date: "2026/6/30", disbursementCount: 1578, disbursement: 2494895000, repaymentCount: 2502, repayment: 2139577200 },
      { date: "2026/7/1", disbursementCount: 1504, disbursement: 2228493000, repaymentCount: 2363, repayment: 1914910053 },
      { date: "2026/7/2", disbursementCount: 1275, disbursement: 1958994500, repaymentCount: 2118, repayment: 1748632700 },
      { date: "2026/7/3", disbursementCount: 1234, disbursement: 1804936500, repaymentCount: 1926, repayment: 1623943100 },
      { date: "2026/7/4", disbursementCount: 1151, disbursement: 1652159500, repaymentCount: 1679, repayment: 1333929300 },
      { date: "2026/7/5", disbursementCount: 1356, disbursement: 1918879292, repaymentCount: 1852, repayment: 1539488114 },
      { date: "2026/7/6", disbursementCount: 1702, disbursement: 2705032604, repaymentCount: 2045, repayment: 1802310700 },
      { date: "2026/7/7", disbursementCount: 2185, disbursement: 3656474216, repaymentCount: 2056, repayment: 1774260200 },
      { date: "2026/7/8", disbursementCount: 1768, disbursement: 2815312500, repaymentCount: 1950, repayment: 1752174200 },
      { date: "2026/7/9", disbursementCount: 1842, disbursement: 2983700500, repaymentCount: 2068, repayment: 1845077200 },
      { date: "2026/7/10", disbursementCount: 1267, disbursement: 1887661500, repaymentCount: 2129, repayment: 1925727157 },
      { date: "2026/7/11", disbursementCount: 1386, disbursement: 2144088500, repaymentCount: 1518, repayment: 1290983200 },
      { date: "2026/7/12", disbursementCount: 1941, disbursement: 2899233000, repaymentCount: 1783, repayment: 1629742400 },
      { date: "2026/7/13", disbursementCount: 1953, disbursement: 3022698000, repaymentCount: 1897, repayment: 1813998711 },
      { date: "2026/7/14", disbursementCount: 1242, disbursement: 1766717500, repaymentCount: 1932, repayment: 1807860798 },
      { date: "2026/7/15", disbursementCount: 1138, disbursement: 1617546600, repaymentCount: 2037, repayment: 1888378050 }
    ]
  }
};

const el = (id) => document.getElementById(id);
const sum = (rows) => rows.reduce((total, row) => total + row.amount, 0);

function formatB(value) {
  if (Math.abs(value) < 0.005) return "Rp 0";
  if (Math.abs(value) < 1) return `Rp ${Math.round(value * 1000)}M`;
  return `Rp ${value.toFixed(2)}B`;
}

function roundB(value) {
  return Math.round(value * 100) / 100;
}

function amountToB(amount) {
  return amount / 1_000_000_000;
}

function dateValue(dateText) {
  const [year, month, day] = dateText.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function getChannelRows(channelKey = state.planChannel) {
  if (channelKey !== "all") {
    return channelActuals[channelKey].rows;
  }

  const byDate = new Map();
  Object.values(channelActuals).forEach((channel) => {
    channel.rows.forEach((row) => {
      const existing =
        byDate.get(row.date) ||
        {
          date: row.date,
          disbursementCount: 0,
          disbursement: 0,
          repaymentCount: 0,
          repayment: 0
        };
      existing.disbursementCount += row.disbursementCount;
      existing.disbursement += row.disbursement;
      existing.repaymentCount += row.repaymentCount;
      existing.repayment += row.repayment;
      byDate.set(row.date, existing);
    });
  });

  return [...byDate.values()].sort((a, b) => dateValue(a.date) - dateValue(b.date));
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function unlockApp() {
  document.body.classList.remove("auth-locked");
  const input = el("accessPassword");
  if (input) input.value = "";
}

function bindAuth() {
  if (sessionStorage.getItem("rdlEscrowAuth") === "ok") {
    unlockApp();
    return;
  }

  const form = el("authForm");
  const error = el("authError");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = el("accessPassword").value;
    const hash = await sha256Hex(password);
    if (hash === accessPasswordHash) {
      sessionStorage.setItem("rdlEscrowAuth", "ok");
      unlockApp();
      return;
    }
    if (error) error.textContent = "密码不正确";
  });
}

function selectedChannelLabel() {
  if (state.planChannel === "all") return "合计";
  return channelActuals[state.planChannel].label;
}

function summarizePlan(plan) {
  return plan.reduce(
    (acc, row) => {
      acc.topup += row.topup;
      acc.baseTopup += row.baseTopup;
      acc.supplementalTopup += row.supplementalTopup;
      acc.disbursement += row.disbursement;
      acc.withdraw += row.withdraw;
      acc.repayment += row.repayment;
      acc.maxExposure = Math.max(acc.maxExposure, row.exposure);
      if (row.date.getTime() === dateValue(planStartDate).getTime()) acc.openingEscrow = row.openingEscrow;
      acc.closingEscrow = row.closingEscrow;
      if (row.status !== "ok" || (state.planMode === "controlled" && row.supplementalTopup > 0)) acc.flaggedDays += 1;
      return acc;
    },
    {
      topup: 0,
      baseTopup: 0,
      supplementalTopup: 0,
      disbursement: 0,
      withdraw: 0,
      repayment: 0,
      maxExposure: 0,
      openingEscrow: 0,
      closingEscrow: 0,
      flaggedDays: 0
    }
  );
}

function timeText(minutes) {
  return `${minutes}m`;
}

function addLedger(title, body, amount, kind = "ok") {
  state.ledger.unshift({
    title,
    body,
    amount: typeof amount === "number" ? formatB(amount) : amount,
    kind
  });
  state.ledger = state.ledger.slice(0, 9);
}

function setAlert(type, title, body) {
  state.alert = { type, title, body };
}

function setMoving() {
  const map = el("flowMap");
  map.classList.remove("moving");
  window.requestAnimationFrame(() => {
    map.classList.add("moving");
    window.setTimeout(() => map.classList.remove("moving"), 980);
  });
}

function fundingReadyRows() {
  return state.loans.filter((loan) => loan.status === "ready");
}

function repaymentReadyRows() {
  return state.repayments.filter((repayment) => repayment.status === "ready");
}

function renderLoans() {
  el("loansTable").innerHTML = state.loans
    .map((loan) => {
      const tag =
        loan.status === "settled"
          ? `<span class="tag settled">已放款</span>`
          : loan.status === "batched"
            ? `<span class="tag fast">批次锁定</span>`
            : loan.status === "pending"
              ? `<span class="tag pending">待签约</span>`
              : `<span class="tag ready">可放款</span>`;
      const lane = loan.lane === "fast" ? "机构通道" : "普通通道";
      return `
        <tr>
          <td>${loan.id}<small>${loan.borrower}</small></td>
          <td>${formatB(loan.amount)}<small>${lane}</small></td>
          <td>${timeText(loan.sla)}<small>${state.interval}m 微批</small></td>
          <td>${tag}</td>
        </tr>
      `;
    })
    .join("");
}

function renderRepayments() {
  el("repaymentsTable").innerHTML = state.repayments
    .map((repayment) => {
      const tag =
        repayment.status === "settled"
          ? `<span class="tag settled">已入 RDL</span>`
          : repayment.status === "batched"
            ? `<span class="tag fast">批次锁定</span>`
            : repayment.status === "pending"
              ? `<span class="tag pending">待入账</span>`
              : `<span class="tag ready">可分账</span>`;
      return `
        <tr>
          <td>${repayment.id}<small>${repayment.lender}</small></td>
          <td>${formatB(repayment.amount)}<small>lender 分账</small></td>
          <td>${timeText(repayment.age)}<small>Escrow age</small></td>
          <td>${tag}</td>
        </tr>
      `;
    })
    .join("");
}

function renderMetrics() {
  const planTotals = summarizePlan(buildJulyPlan(state.planMode));
  const fundingAmount = state.fundingBatch ? state.fundingBatch.amount : 0;
  const repaymentAmount = state.repaymentBatch ? state.repaymentBatch.amount : 0;
  el("metricDisbursed").textContent = formatB(planTotals.disbursement);
  el("metricRepaid").textContent = formatB(planTotals.repayment);
  el("metricFundingBatch").textContent = formatB(fundingAmount);
  el("metricRepaymentBatch").textContent = formatB(repaymentAmount);
  el("fundingBatchCount").textContent = `${state.fundingBatch ? state.fundingBatch.ids.length : 0} 笔待执行`;
  el("repaymentBatchCount").textContent = `${state.repaymentBatch ? state.repaymentBatch.ids.length : 0} 笔待执行`;
}

function renderBatchCards() {
  if (state.fundingBatch) {
    el("fundingBatchAmount").textContent = formatB(state.fundingBatch.amount);
    el("fundingBatchMeta").textContent = `${state.fundingBatch.ids.length} 笔订单，${state.interval} 分钟清算窗口`;
  } else {
    el("fundingBatchAmount").textContent = "Rp 0";
    el("fundingBatchMeta").textContent = "等待生成批次";
  }

  if (state.repaymentBatch) {
    el("repaymentBatchAmount").textContent = formatB(state.repaymentBatch.amount);
    el("repaymentBatchMeta").textContent = `${state.repaymentBatch.ids.length} 笔还款，按 lender 聚合`;
  } else {
    el("repaymentBatchAmount").textContent = "Rp 0";
    el("repaymentBatchMeta").textContent = "等待生成批次";
  }
}

function renderCompliance() {
  const readyFunding = state.fundingBatch ? state.fundingBatch.amount : 0;
  const fundingLimit = state.monthDisbursed + readyFunding;
  const repaymentLimit = state.monthRepaid;
  const fundingRatio = fundingLimit > 0 ? Math.min((state.rdlToEscrow / fundingLimit) * 100, 140) : 0;
  const repaymentRatio = repaymentLimit > 0 ? Math.min((state.escrowToRdl / repaymentLimit) * 100, 140) : 0;

  el("fundingRatioBar").style.width = `${Math.min(fundingRatio, 100)}%`;
  el("repaymentRatioBar").style.width = `${Math.min(repaymentRatio, 100)}%`;
  el("fundingRatioText").textContent = `${Math.round(fundingRatio)}%`;
  el("repaymentRatioText").textContent = `${Math.round(repaymentRatio)}%`;
  el("fundingLimitText").textContent = `已用 ${formatB(state.rdlToEscrow)} / 动态上限 ${formatB(fundingLimit)}`;
  el("repaymentLimitText").textContent = `已用 ${formatB(state.escrowToRdl)} / 上限 ${formatB(repaymentLimit)}`;

  const fresh = state.escrowBalance;
  const warm = state.eodClear ? 0 : Math.max(0, state.escrowBalance - 0.2);
  const late = state.eodClear ? 0 : Math.max(0, warm - 0.3);
  el("agingFresh").textContent = formatB(fresh);
  el("agingWarm").textContent = formatB(warm);
  el("agingLate").textContent = formatB(late);

  const alertBox = el("alertBox");
  alertBox.className = `alert-box ${state.alert.type === "ok" ? "" : state.alert.type}`;
  alertBox.innerHTML = `<strong>${state.alert.title}</strong><span>${state.alert.body}</span>`;
}

function renderFlow() {
  el("nodeRdl").textContent = formatB(state.lenderRdl);
  el("nodeEscrow").textContent = formatB(state.escrowBalance);
  el("nodeDestination").textContent = formatB(state.destination);
}

function renderLedger() {
  el("ledgerList").innerHTML = state.ledger
    .map(
      (entry) => `
      <div class="ledger-item ${entry.kind === "blocked" ? "blocked" : ""}">
        <strong>${entry.title}</strong>
        <span class="amount">${entry.amount}</span>
        <span>${entry.body}</span>
      </div>
    `
    )
    .join("");
}

function buildJulyPlan(mode) {
  const rows = getChannelRows();
  const start = dateValue(planStartDate);
  const end = dateValue(planEndDate);
  const history = rows
    .filter((row) => dateValue(row.date) < start)
    .slice(-topupAverageDays)
    .map((row) => amountToB(row.disbursement));
  let fundingBuffer = 0;
  let previousRepayment = amountToB(rows.find((row) => row.date === "2026/6/30")?.repayment || 0);

  return rows
    .filter((row) => {
      const date = dateValue(row.date);
      return date >= start && date <= end;
    })
    .map((day) => {
    const disbursement = amountToB(day.disbursement);
    const repayment = amountToB(day.repayment);
    const rawTopup = roundB(history.slice(-topupAverageDays).reduce((total, value) => total + value, 0) / topupAverageDays);
    const baseTopup = mode === "controlled" ? Math.min(rawTopup, disbursement) : rawTopup;
    const supplementalTopup = mode === "controlled" ? Math.max(0, disbursement - baseTopup) : 0;
    const topup = baseTopup + supplementalTopup;
    const withdraw = previousRepayment;
    const openingEscrow = fundingBuffer + previousRepayment;
    const availableFunding = fundingBuffer + topup;
    const fundingGap = Math.max(0, disbursement - availableFunding);
    fundingBuffer = Math.max(0, availableFunding - disbursement);
    const repaymentPending = repayment;
    const exposure = fundingBuffer + repaymentPending;
    const date = dateValue(day.date);
    const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
    const hasIdleFunding = fundingBuffer > 0.25;
    const status = fundingGap > 0.001 ? "gap" : hasIdleFunding ? "idle" : "ok";

    history.push(disbursement);
    previousRepayment = repayment;

    return {
      date,
      weekday,
      disbursementCount: day.disbursementCount,
      repaymentCount: day.repaymentCount,
      rawTopup,
      baseTopup,
      supplementalTopup,
      topup,
      withdraw,
      openingEscrow,
      disbursement,
      repayment,
      fundingGap,
      fundingBuffer,
      exposure,
      closingEscrow: exposure,
      status
    };
  });
}

function renderDailyPlan() {
  const plan = buildJulyPlan(state.planMode);
  const totals = summarizePlan(plan);
  const channelLabel = selectedChannelLabel();

  el("planTopupTotal").textContent = formatB(totals.topup);
  el("planBaseTopupTotal").textContent = formatB(totals.baseTopup);
  el("planSupplementalTopupTotal").textContent = formatB(totals.supplementalTopup);
  el("planDisbursementTotal").textContent = formatB(totals.disbursement);
  el("planWithdrawTotal").textContent = formatB(totals.withdraw);
  el("planRepaymentTotal").textContent = formatB(totals.repayment);
  el("planMaxExposure").textContent = formatB(totals.maxExposure);
  el("planOpeningEscrow").textContent = formatB(totals.openingEscrow);
  el("planClosingEscrow").textContent = formatB(totals.closingEscrow);
  el("planFlaggedDays").textContent = `${totals.flaggedDays} 天`;

  const assessment = el("planAssessment");
  const repaymentDelta = totals.withdraw - totals.repayment;
  if (state.planMode === "raw") {
    assessment.className = "plan-assessment";
    assessment.innerHTML = `
      <strong>评估结论</strong>
      <span>${channelLabel} 渠道原方案按过去 ${topupAverageDays} 天放款均值充值。该口径可做日批基准，但会在低放款日形成预充值闲置，或在高放款日出现资金缺口；提现按昨日还款执行，7/1-7/15 跨期差额为 ${formatB(Math.abs(repaymentDelta))}。</span>
    `;
  } else {
    assessment.className = "plan-assessment good";
    assessment.innerHTML = `
      <strong>评估结论</strong>
      <span>${channelLabel} 渠道风控版把过去 ${topupAverageDays} 天均值作为充值基准，不足部分进入分钟级补充微批并计入充值。提现按昨日还款执行，因此本表包含 6/30 还款并排除 7/15 还款的次日提现。</span>
    `;
  }

  el("dailyPlanTable").innerHTML = plan
    .map((row) => {
      const dateText = `7/${String(row.date.getDate()).padStart(2, "0")}`;
      const needsSupplement = state.planMode === "controlled" && row.supplementalTopup > 0;
      const statusClass = needsSupplement ? "watch" : row.status === "ok" ? "ok" : row.status === "idle" ? "watch" : "bad";
      const statusText =
        needsSupplement
          ? `补微批 ${formatB(row.supplementalTopup)}`
          : row.status === "ok"
            ? "正常"
            : row.status === "idle"
              ? `闲置 ${formatB(row.fundingBuffer)}`
              : `缺口 ${formatB(row.fundingGap)}`;
      const topupSubtext =
        state.planMode === "controlled"
          ? `<small>含补微批 ${formatB(row.supplementalTopup)}</small>`
          : `<small>${topupAverageDays}日均值</small>`;
      const baseSubtext = state.planMode === "controlled" ? `${topupAverageDays}日均值截断` : `${topupAverageDays}日均值`;
      const supplementalSubtext = row.supplementalTopup > 0 ? "计入充值" : "无补充";
      const withdrawSubtext = row.date.getDate() === 1 ? "<small>6/30 还款</small>" : "<small>昨日还款</small>";

      return `
        <tr>
          <td>${dateText}<small>${row.weekday}</small></td>
          <td>${formatB(row.topup)}${topupSubtext}</td>
          <td>${formatB(row.baseTopup)}<small>${baseSubtext}</small></td>
          <td>${formatB(row.supplementalTopup)}<small>${supplementalSubtext}</small></td>
          <td>${formatB(row.withdraw)}${withdrawSubtext}</td>
          <td>${formatB(row.disbursement)}<small>${row.disbursementCount.toLocaleString()} 笔实际放款</small></td>
          <td>${formatB(row.repayment)}<small>${row.repaymentCount.toLocaleString()} 笔，次日提现</small></td>
          <td>${formatB(row.openingEscrow)}<small>当日开始</small></td>
          <td>${formatB(row.closingEscrow)}<small>当日结束</small></td>
          <td><span class="status-cell ${statusClass}">${statusText}</span></td>
        </tr>
      `;
    })
    .join("");
}

function renderControls() {
  el("batchInterval").value = state.interval;
  el("batchIntervalValue").textContent = `${state.interval} 分钟`;
  el("bufferWindow").value = state.bufferWindow;
  el("bufferWindowValue").textContent = `${state.bufferWindow} 分钟`;
  el("fastLaneToggle").checked = state.fastLane;
  el("eodClearToggle").checked = state.eodClear;
  el("systemStatus").innerHTML = `<span class="status-dot"></span>${state.interval} 分钟微批运行中`;
  document.querySelectorAll(".plan-mode button").forEach((button) => {
    button.classList.toggle("active", button.dataset.planMode === state.planMode);
  });
  document.querySelectorAll(".channel-mode button").forEach((button) => {
    button.classList.toggle("active", button.dataset.planChannel === state.planChannel);
  });
}

function render() {
  renderControls();
  renderMetrics();
  renderBatchCards();
  renderLoans();
  renderRepayments();
  renderCompliance();
  renderFlow();
  renderLedger();
  renderDailyPlan();
}

function buildFundingBatch() {
  if (state.fundingBatch) {
    setAlert("warning", "放款批次已锁定", "先执行当前批次，再生成下一批。");
    render();
    return;
  }

  const ready = fundingReadyRows().filter((loan) => state.fastLane || loan.lane !== "fast");
  if (!ready.length) {
    setAlert("warning", "无可用放款订单", "待签约或已清算订单不能进入本批次。");
    render();
    return;
  }

  state.fundingBatch = {
    ids: ready.map((loan) => loan.id),
    amount: sum(ready),
    createdAt: Date.now()
  };
  state.loans = state.loans.map((loan) =>
    state.fundingBatch.ids.includes(loan.id) ? { ...loan, status: "batched" } : loan
  );
  addLedger("放款微批锁定", `${ready.length} 笔订单进入 Ready_Disbursement_Batch`, state.fundingBatch.amount);
  setAlert("ok", "动态额度已更新", "RDL -> Escrow 上限已加入已锁定放款批次。");
  render();
}

function executeFundingBatch() {
  if (!state.fundingBatch) {
    setAlert("warning", "无放款批次", "当前没有 Ready_Disbursement_Batch。");
    render();
    return;
  }

  const amount = state.fundingBatch.amount;
  const allowedLimit = state.monthDisbursed + amount;
  if (state.rdlToEscrow + amount > allowedLimit + 0.001) {
    setAlert("danger", "额度拦截", "本批 RDL -> Escrow 超过动态放款上限。");
    addLedger("放款批次被拦截", "RDL -> Escrow 超过动态放款上限", amount, "blocked");
    render();
    return;
  }

  state.lenderRdl -= amount;
  state.escrowBalance += amount;
  state.rdlToEscrow += amount;
  setMoving();

  window.setTimeout(() => {
    state.escrowBalance -= amount;
    state.destination += amount;
    state.monthDisbursed += amount;
    state.loans = state.loans.map((loan) =>
      state.fundingBatch.ids.includes(loan.id) ? { ...loan, status: "settled" } : loan
    );
    addLedger("放款批次执行", "RDL -> Escrow -> Borrower 同窗口完成", amount);
    state.fundingBatch = null;
    setAlert("ok", "放款批次完成", "本批资金未在 Escrow 形成日终余额。");
    render();
  }, 700);

  render();
}

function buildRepaymentBatch() {
  if (state.repaymentBatch) {
    setAlert("warning", "还款批次已锁定", "先执行当前批次，再生成下一批。");
    render();
    return;
  }

  const ready = repaymentReadyRows();
  if (!ready.length) {
    setAlert("warning", "无可分账还款", "待入账或已清算还款不能进入本批次。");
    render();
    return;
  }

  state.repaymentBatch = {
    ids: ready.map((repayment) => repayment.id),
    amount: sum(ready),
    createdAt: Date.now()
  };
  state.repayments = state.repayments.map((repayment) =>
    state.repaymentBatch.ids.includes(repayment.id) ? { ...repayment, status: "batched" } : repayment
  );
  addLedger("还款微批锁定", `${ready.length} 笔还款按 lender 聚合`, state.repaymentBatch.amount);
  setAlert("ok", "还款批次已锁定", "Escrow -> RDL 将按实际入账还款执行。");
  render();
}

function executeRepaymentBatch() {
  if (!state.repaymentBatch) {
    setAlert("warning", "无还款批次", "当前没有可执行的还款分账批次。");
    render();
    return;
  }

  const amount = state.repaymentBatch.amount;
  const allowedLimit = state.monthRepaid + amount;
  if (state.escrowToRdl + amount > allowedLimit + 0.001) {
    setAlert("danger", "额度拦截", "本批 Escrow -> RDL 超过实际还款上限。");
    addLedger("还款批次被拦截", "Escrow -> RDL 超过实际还款上限", amount, "blocked");
    render();
    return;
  }

  state.escrowBalance += amount;
  state.monthRepaid += amount;
  setMoving();

  window.setTimeout(() => {
    state.escrowBalance -= amount;
    state.lenderRdl += amount;
    state.escrowToRdl += amount;
    state.repayments = state.repayments.map((repayment) =>
      state.repaymentBatch.ids.includes(repayment.id) ? { ...repayment, status: "settled" } : repayment
    );
    addLedger("还款批次执行", "Borrower repayment -> Escrow -> Lender RDL", amount);
    state.repaymentBatch = null;
    setAlert("ok", "还款批次完成", "Escrow -> RDL 与实际还款同步增长。");
    render();
  }, 700);

  render();
}

function simulateExcess() {
  const amount = 1.2;
  const locked = state.fundingBatch ? state.fundingBatch.amount : 0;
  const allowedLimit = state.monthDisbursed + locked;

  if (state.rdlToEscrow + amount > allowedLimit + 0.001) {
    setAlert("danger", "无订单预充值被拦截", "该资金没有 Ready_Disbursement_Batch，不能进入 Escrow。");
    addLedger("异常预充值拦截", "无 loan_id / batch_id 的 RDL -> Escrow", amount, "blocked");
    render();
    return;
  }

  state.rdlToEscrow += amount;
  state.lenderRdl -= amount;
  state.escrowBalance += amount;
  addLedger("异常预充值放行", "当前参数允许该资金进入 Escrow", amount);
  setAlert("warning", "Escrow 出现未解释余额", "需要在日终前放款或退回 RDL。");
  render();
}

function closeDay() {
  if (!state.eodClear) {
    setAlert("warning", "日终清零未启用", "Escrow aging 将保留到下一窗口。");
    render();
    return;
  }

  if (state.escrowBalance > 0.001) {
    const amount = state.escrowBalance;
    state.lenderRdl += amount;
    state.escrowBalance = 0;
    addLedger("日终退回 RDL", "未清算 Escrow 余额已退回", amount);
    setAlert("ok", "日终清零完成", "Escrow 未保留未解释余额。");
  } else {
    addLedger("日终检查完成", "Escrow 无未解释余额", "Rp 0");
    setAlert("ok", "日终清零完成", "Escrow 无未解释余额。");
  }
  render();
}

function resetDemo() {
  state = structuredClone(initialState);
  render();
}

function bindEvents() {
  document.querySelectorAll(".queue-panel .segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".queue-panel .segmented button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const tab = button.dataset.tab;
      el("loansTableWrap").classList.toggle("active", tab === "loans");
      el("repaymentsTableWrap").classList.toggle("active", tab === "repayments");
    });
  });

  document.querySelectorAll(".plan-mode button").forEach((button) => {
    button.addEventListener("click", () => {
      state.planMode = button.dataset.planMode;
      setAlert(
        "ok",
        state.planMode === "raw" ? "已切换原方案计划" : "已切换风控版计划",
        state.planMode === "raw" ? `充值金额按过去 ${topupAverageDays} 天放款均值执行。` : `充值金额按过去 ${topupAverageDays} 天均值基准加补充微批执行。`
      );
      render();
    });
  });

  document.querySelectorAll(".channel-mode button").forEach((button) => {
    button.addEventListener("click", () => {
      state.planChannel = button.dataset.planChannel;
      setAlert("ok", `已切换 ${selectedChannelLabel()} 渠道`, "按该渠道实际放款和还款数据重新计算日批计划。");
      render();
    });
  });

  el("batchInterval").addEventListener("input", (event) => {
    state.interval = Number(event.target.value);
    render();
  });

  el("bufferWindow").addEventListener("input", (event) => {
    state.bufferWindow = Number(event.target.value);
    render();
  });

  el("fastLaneToggle").addEventListener("change", (event) => {
    state.fastLane = event.target.checked;
    setAlert(
      "ok",
      state.fastLane ? "极速通道已启用" : "极速通道已关闭",
      state.fastLane ? "极速订单可进入机构 lender 微批。" : "极速订单暂不进入 retail 微批。"
    );
    render();
  });

  el("eodClearToggle").addEventListener("change", (event) => {
    state.eodClear = event.target.checked;
    render();
  });

  el("buildFundingBatch").addEventListener("click", buildFundingBatch);
  el("executeFundingBatch").addEventListener("click", executeFundingBatch);
  el("buildRepaymentBatch").addEventListener("click", buildRepaymentBatch);
  el("executeRepaymentBatch").addEventListener("click", executeRepaymentBatch);
  el("simulateExcess").addEventListener("click", simulateExcess);
  el("closeDay").addEventListener("click", closeDay);
  el("resetDemo").addEventListener("click", resetDemo);
}

bindAuth();
bindEvents();
render();
