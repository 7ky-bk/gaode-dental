// 高德口腔门诊详情页 — 交互脚本
document.addEventListener('DOMContentLoaded', function() {

  'use strict';

  // ===== Navbar Scroll Effect =====
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');

  function updateNavbar() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ===== Scroll Reveal =====
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el) { revealObserver.observe(el); });
  }

  // ===== Counter Animation =====
  var counters = document.querySelectorAll('.data-num');
  var counterObserver = new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'));
        var duration = 1500;
        var startTime = null;

        function animate(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * target);
          el.textContent = current.toLocaleString();
          if (el.dataset.suffix) {
            el.textContent = current.toLocaleString();
          }
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target.toLocaleString();
          }
        }
        requestAnimationFrame(animate);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) { counterObserver.observe(el); });

  // ===== Tab Switching =====
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tabId = this.getAttribute('data-tab');
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      var panels = document.querySelectorAll('.tab-panel');
      panels.forEach(function(p) { p.classList.remove('active'); });
      var targetPanel = document.getElementById(tabId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // ===== Lightbox =====
  window.openLightbox = function(el) {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('show');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var lightbox = document.getElementById('lightbox');
      if (lightbox && lightbox.classList.contains('show')) {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
      }
      var modal = document.getElementById('modal');
      if (modal && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    }
  });

  
// ===== Info Modal (通用弹窗) =====
var infoData = [
  {
    "type": "cert",
    "cards": [
      {
        "name": "医疗机构执业许可",
        "subtitle": "MEDICAL LICENSE",
        "desc": "高德口腔门诊部经赣州市相关部门批准设立的正规口腔诊疗机构。诊疗科目覆盖口腔科全品类基础与进阶诊疗服务，所有诊疗业务均在执业许可范围内合规开展。每年定期接受卫生部门年度校验，确保诊疗范围与执业许可一致。"
      },
      {
        "name": "统一社会信用代码",
        "subtitle": "CREDIT CODE",
        "desc": "注册编号：91360703MA399JF903。机构经赣州经济技术开发区市场监督管理局正规工商注册，具备独立法人资格，所有经营行为合法合规，信息可公开查询。"
      },
      {
        "name": "市监局检查合格",
        "subtitle": "QUALIFIED INSPECTION",
        "desc": "2025年第三期赣州市市场监督管理局医疗器械使用质量专项检查中，高德口腔门诊部检查结果为\"未发现问题\"。器械采购、使用、消毒全流程符合国家医疗质量安全标准，监管记录可查。"
      },
      {
        "name": "医师持证上岗",
        "subtitle": "CERTIFIED DOCTORS",
        "desc": "所有上岗医师均持有国家卫生健康委员会颁发的执业医师资格证书，执业信息可通过国家卫健委官方渠道核验。医师团队定期参加口腔医学技术培训与学术交流，持续更新专业知识和诊疗理念。"
      },
      {
        "name": "\"一人一用一消毒\"",
        "subtitle": "STERILIZATION STANDARD",
        "desc": "严格执行\"一人一用一消毒/灭菌\"标准。器械从回收、分类清洗、封装、高温灭菌到无菌存储全流程规范化管理，每批次消毒均留存完整记录，可随时溯源核验，确保诊疗安全。"
      },
      {
        "name": "医疗器械合规",
        "subtitle": "EQUIPMENT COMPLIANCE",
        "desc": "所有诊疗耗材、设备均从正规生产厂商采购，保留完整采购凭证与资质文件。定期接受医疗器械使用质量检查，确保设备性能达标、安全可靠，杜绝不合格器械进入诊疗环节。"
      }
    ]
  },
  {
    "type": "service",
    "cards": [
      {
        "name": "首诊负责制",
        "subtitle": "PRIMARY RESPONSIBILITY",
        "desc": "首诊医师对患者全程负责。从初诊检查、方案制定到治疗实施、术后随访均由同一医师团队跟进，确保诊疗方案的连续性和一致性。患者无需重复沟通病情，诊疗过程无缝衔接，建立长期稳定的医患信任关系。"
      },
      {
        "name": "电子健康档案",
        "subtitle": "HEALTH RECORDS",
        "desc": "每位到诊患者均建立专属电子口腔健康档案，完整记录口腔检查结果、诊疗方案、治疗过程与随访情况。档案长期留存，复诊时医生可随时调取历史记录，为精准诊疗和长期口腔健康管理提供数据支撑。"
      },
      {
        "name": "知情同意原则",
        "subtitle": "INFORMED CONSENT",
        "desc": "方案制定前充分与患者沟通需求和期望，详细告知治疗步骤、预期效果、费用明细与潜在风险。待患者充分理解并签署知情同意书后方开展治疗，确保患者的知情权与选择权。"
      },
      {
        "name": "明码标价",
        "subtitle": "TRANSPARENT PRICING",
        "desc": "所有诊疗项目实行明码标价，诊疗前出具完整费用清单，逐项列明收费项目和金额。无强制消费、无隐形消费、无临时加价，让患者明明白白就诊，放心接受治疗。"
      },
      {
        "name": "预约诊疗",
        "subtitle": "APPOINTMENT",
        "desc": "支持电话、线上多渠道预约，患者可按约定时间到诊，避免长时间排队等候。针对经开区上班族与学生群体，提供灵活的预约时段选择，适配不同人群的就诊节奏。"
      },
      {
        "name": "延时服务",
        "subtitle": "EXTENDED HOURS",
        "desc": "工作日开设延时诊疗时段，满足上班族下班后的就诊需求。延时服务需提前电话预约，门诊根据预约情况安排对应科室的医师值守，确保延时时段的诊疗质量与常规时段一致。"
      }
    ]
  },
  {
    "type": "community",
    "cards": [
      {
        "name": "\"小小牙医\"职业体验",
        "subtitle": "KIDS DENTAL EXPERIENCE",
        "desc": "2026年以来，高德口腔联合本地品牌开展\"小小牙医\"职业体验主题活动3场，覆盖周边家庭超100组。通过沉浸式互动体验，向儿童与家长科普正确刷牙方式、龋病预防等口腔健康知识。孩子们穿上白大褂，在医师指导下为\"患者\"检查牙齿，在游戏中轻松学习爱牙护牙知识。"
      },
      {
        "name": "社区免费口腔筛查",
        "subtitle": "FREE SCREENING",
        "desc": "定期走进周边社区开展免费口腔筛查义诊，已累计服务2场，为200余名中老年居民提供免费口腔检查与健康建议。针对行动不便的老年居民提供预约上门咨询服务，将专业口腔健康服务送到居民家门口，践行\"扎根社区、服务邻里\"的承诺。"
      },
      {
        "name": "壹基金公益商家认证",
        "subtitle": "YI FOUNDATION",
        "desc": "2026年1月，高德口腔经深圳壹基金公益基金会认证，获评\"美团乡村儿童操场公益商家\"，已连续三年获此荣誉。门店每产生一笔有效订单，都会同步为乡村儿童操场公益计划贡献一份力量，用日常经营的微小能量助力偏远地区儿童运动环境改善。"
      }
    ]
  },
  {
    "type": "guarantee",
    "cards": [
      {
        "name": "正品保障",
        "subtitle": "GENUINE PRODUCTS",
        "desc": "种植体、正畸牙套等主要耗材均为正规品牌产品，所有材料来源可追溯，支持患者扫码验真查询。机构与国内外知名品牌厂商建立长期稳定合作，从源头把控材料品质，杜绝假冒伪劣。"
      },
      {
        "name": "质保服务",
        "subtitle": "WARRANTY SERVICE",
        "desc": "根据具体诊疗项目提供对应时长的质保服务。种植体、正畸牙套等主材在质保期内均提供免费复诊与调整服务。修复类项目根据品类提供不同年限质保，让患者安心诊疗，无后顾之忧。"
      },
      {
        "name": "售后无忧",
        "subtitle": "AFTER-SALES",
        "desc": "修复类项目在质保期内如出现非人为损坏，可享受免费维修或更换服务。门诊建立完善的售后随访机制，定期回访了解使用情况，及时响应和处理患者需求，做到诊疗有保障、售后有温度。"
      }
    ]
  },
  {
    "type": "equip",
    "cards": [
      {
        "name": "数字化口腔CBCT机",
        "subtitle": "DIGITAL CBCT",
        "desc": "高德口腔配备的数字化口腔CBCT（锥形束CT）机，可提供高分辨率三维影像，精准呈现患者牙槽骨形态、颌骨结构、神经管走向等关键解剖信息。广泛应用于种植术前规划、阻生牙拔除风险评估、颞下颌关节检查等领域。与传统二维影像相比，辐射剂量更低，成像更清晰，为精准诊疗提供可靠的影像学依据。"
      },
      {
        "name": "牙科综合治疗台 ×4",
        "subtitle": "DENTAL CHAIRS",
        "desc": "门诊共设4台标准化牙科综合治疗台，配套3间独立诊疗诊室与1间儿童专属诊疗区。治疗台采用人体工学设计，患者可根据诊疗需要调整至舒适体位。设备配备高速手机、低速手机、三用喷枪、洁牙机接口等全功能配置，满足不同诊疗项目的操作需求。每台设备均严格执行一人一用一消毒。"
      },
      {
        "name": "根管显微镜",
        "subtitle": "MICROSCOPE",
        "desc": "根管显微镜为根管治疗提供高倍放大的清晰视野，使医生能够精确定位根管口、清理根管系统内的感染物质。特别适用于钙化根管、根管再治疗、根尖手术等复杂病例。显微镜辅助下的根管治疗成功率和远期效果显著优于传统裸眼操作。"
      },
      {
        "name": "超声洁牙机",
        "subtitle": "ULTRASONIC SCALER",
        "desc": "超声洁牙机利用高频超声波振动，高效去除牙结石、牙菌斑和色素沉着，同时通过水雾冲洗清洁牙周袋。相较于传统手工刮治，超声洁牙效率更高、舒适度更好，对牙釉质的损伤更小。配合专业操作手法，可实现舒适化洁牙体验。"
      },
      {
        "name": "高温高压蒸汽灭菌器",
        "subtitle": "STERILIZER",
        "desc": "门诊配备医用级高温高压蒸汽灭菌器，执行严格的灭菌标准。器械经清洗、封装后，在134℃、0.22MPa条件下进行高温高压蒸汽灭菌，确保杀灭所有微生物（包括细菌芽孢）。每批次灭菌均留存化学指示卡和灭菌记录，全程可追溯核验，从源头保障诊疗器械的安全无菌。"
      }
    ]
  }
];
var infoGradients = [
  "linear-gradient(135deg, #0F2B4A, #1A568E)",
  "linear-gradient(135deg, #1A3A5C, #2E7DB8)",
  "linear-gradient(135deg, #1A568E, #3A8DB8)",
  "linear-gradient(135deg, #153E6A, #2E9B9B)",
  "linear-gradient(135deg, #1A3A5C, #4A9FBF)",
  "linear-gradient(135deg, #0F2B4A, #1A568E)"
];

window.openInfoModal = function(el, type) {
  var h4 = el.querySelector('h4');
  if (!h4) return;
  var name = h4.textContent.trim();
  var section = infoData.find(function(s) { return s.type === type; });
  if (!section) return;
  var cardData = section.cards.find(function(c) { return c.name === name; });
  if (!cardData) return;
  
  var idx = section.cards.indexOf(cardData);
  var colorIdx = idx % infoGradients.length;
  
  var imgEl = document.getElementById('deptModalImg');
  var infoEl = document.getElementById('deptModalInfo');
  
  // For non-department modals, hide image and use full width
  if (type !== 'dept') {
    imgEl.style.display = 'none';
    infoEl.className = 'dept-modal-info dept-modal-info-full';
    infoEl.innerHTML = '<h3>' + cardData.name + '</h3>' +
      '<p class="dept-subtitle">' + cardData.subtitle + '</p>' +
      '<p class="dept-desc">' + cardData.desc + '</p>';
  } else {
    imgEl.style.display = '';
    infoEl.className = 'dept-modal-info';
    // existing department code continues...
  }
  
  document.getElementById('deptModalOverlay').classList.add('show');
  document.getElementById('deptModal').classList.add('show');
  document.body.style.overflow = 'hidden';
};

// ===== Department Modal =====
var deptData = [
  {
    "id": "种植",
    "name": "牙齿种植中心",
    "subtitle": "IMPLANT CENTER",
    "desc": "高德口腔牙齿种植中心配备数字化CBCT影像系统，可精准评估患者牙槽骨条件，制定个性化种植方案。开展常规种植、即刻种植等多种术式，种植体均为正规品牌产品，来源可溯，支持验真。术前充分沟通方案与费用，术后提供完善的质保随访服务。",
    "features": [
      "精准术前评估",
      "微创种植技术",
      "正规品牌种植体",
      "终身维护服务"
    ],
    "gradient": "linear-gradient(135deg, #0F2B4A, #1A568E)"
  },
  {
    "id": "正畸",
    "name": "牙齿正畸中心",
    "subtitle": "ORTHODONTICS CENTER",
    "desc": "高德口腔牙齿正畸中心拥有丰富的青少年及成人正畸经验，累计完成12-18岁青少年金属托槽正畸案例近200例，平均疗程18-24个月，矫治达标率90%以上。开展隐形矫治与金属托槽矫治等多种方案，根据患者牙齿状况与需求定制个性化矫治计划，定期复诊跟踪。",
    "features": [
      "隐形矫治技术",
      "金属托槽矫治",
      "个性化方案设计",
      "定期复诊跟踪"
    ],
    "gradient": "linear-gradient(135deg, #1A3A5C, #2E7DB8)"
  },
  {
    "id": "修复",
    "name": "牙齿修复中心",
    "subtitle": "PROSTHODONTICS CENTER",
    "desc": "高德口腔牙齿修复中心专注于各类牙体缺损与牙列缺损的修复治疗，已为数百名中老年患者完成活动义齿、固定烤瓷桥修复，术后使用满意度达95%。针对缺牙时间长、牙槽骨条件一般的患者制定适配性方案，兼顾功能恢复与美学效果，修复类项目提供对应时长质保。",
    "features": [
      "活动义齿修复",
      "固定烤瓷桥",
      "美学修复设计",
      "质保期内免费调整"
    ],
    "gradient": "linear-gradient(135deg, #1A568E, #3A8DB8)"
  },
  {
    "id": "牙周",
    "name": "牙周治疗中心",
    "subtitle": "PERIODONTICS CENTER",
    "desc": "高德口腔牙周治疗中心开展系统化牙周基础治疗与牙周维护，帮助患者有效控制牙周炎症、延缓牙周组织退化，维护口腔长期健康。配备超声洁牙机等专业设备，诊疗过程舒适规范，治疗后提供详细的口腔卫生指导与定期复查评估。",
    "features": [
      "牙周基础治疗",
      "牙周维护计划",
      "口腔卫生指导",
      "定期复查评估"
    ],
    "gradient": "linear-gradient(135deg, #153E6A, #2E9B9B)"
  },
  {
    "id": "儿童",
    "name": "儿童口腔中心",
    "subtitle": "PEDIATRIC DENTISTRY",
    "desc": "高德口腔儿童口腔中心配备独立的儿童专属诊疗区，环境温馨友好，有效消除儿童就诊恐惧心理。长期服务周边3所幼儿园，累计为超500名儿童提供口腔检查、涂氟、窝沟封闭服务，儿童龋病预防有效率达85%。以耐心细致的沟通方式，让儿童在轻松氛围中完成诊疗。",
    "features": [
      "儿童专属诊疗区",
      "涂氟防龋",
      "窝沟封闭",
      "乳牙拔除与治疗"
    ],
    "gradient": "linear-gradient(135deg, #1A568E, #4A9FBF)"
  },
  {
    "id": "综合",
    "name": "综合齿科中心",
    "subtitle": "GENERAL DENTISTRY",
    "desc": "高德口腔综合齿科中心覆盖口腔常见疾病全品类诊疗，开展根管治疗、树脂补牙、超声洁牙、微创拔牙等综合服务。所有诊疗器械执行严格消毒标准，\"一人一用一消毒/灭菌\"全流程留痕可溯源，确保每一位患者的诊疗安全。",
    "features": [
      "根管治疗",
      "树脂补牙",
      "超声洁牙",
      "微创拔牙"
    ],
    "gradient": "linear-gradient(135deg, #0F2B4A, #2E7DB8)"
  }
];
var deptSvgs = [
  "<svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1\"><path d=\"M19 14c1.5-2.5 2-5 2-5M5 14c-1.5-2.5-2-5-2-5\"/><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M12 13v8M9 17h6\"/><line x1=\"18\" y1=\"4\" x2=\"20\" y2=\"6\"/><line x1=\"20\" y1=\"4\" x2=\"18\" y2=\"6\"/></svg>",
  "<svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1\"><path d=\"M4 7V4h16v3\"/><path d=\"M9 20h6\"/><path d=\"M12 4v8\"/><path d=\"M4 11v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2\"/><line x1=\"8\" y1=\"10\" x2=\"16\" y2=\"10\"/><line x1=\"10\" y1=\"13\" x2=\"14\" y2=\"13\"/></svg>",
  "<svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1\"><path d=\"M12 2L2 7l10 5 10-5-10-5z\"/><path d=\"M2 17l10 5 10-5\"/><path d=\"M2 12l10 5 10-5\"/><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"rgba(255,255,255,0.2)\"/></svg>",
  "<svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M4 4l3 3M20 4l-3 3M4 20l3-3M20 20l-3-3\"/></svg>",
  "<svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"/><circle cx=\"9\" cy=\"9\" r=\"1.5\" fill=\"rgba(255,255,255,0.3)\"/><circle cx=\"15\" cy=\"9\" r=\"1.5\" fill=\"rgba(255,255,255,0.3)\"/><path d=\"M9 6h6\"/></svg>",
  "<svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1\"><path d=\"M22 12h-4l-3 9L9 3l-3 9H2\"/><circle cx=\"16\" cy=\"12\" r=\"2\"/></svg>"
];

window.openDeptModal = function(el) {
  var h4 = el.querySelector('h4');
  if (!h4) return;
  var name = h4.textContent.trim();
  var data = deptData.find(function(d) { return d.name === name; });
  if (!data) return;
  
  var idx = deptData.indexOf(data);
  
  var imgEl = document.getElementById('deptModalImg');
  var infoEl = document.getElementById('deptModalInfo');
  
  imgEl.style.display = '';
  infoEl.className = 'dept-modal-info';
  
  imgEl.style.background = data.gradient;
  imgEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.5;">' + (deptSvgs[idx] || '') + '</div>';
  
  var features = data.features.map(function(f) { return '<span class="dept-feature">' + f + '</span>'; }).join('');
  
  infoEl.innerHTML = '<h3>' + data.name + '</h3>' +
    '<p class="dept-subtitle">' + data.subtitle + '</p>' +
    '<p class="dept-desc">' + data.desc + '</p>' +
    '<div class="dept-features">' + features + '</div>';
  
  document.getElementById('deptModalOverlay').classList.add('show');
  document.getElementById('deptModal').classList.add('show');
  document.body.style.overflow = 'hidden';
};

window.closeDeptModal = function() {
  document.getElementById('deptModalOverlay').classList.remove('show');
  document.getElementById('deptModal').classList.remove('show');
  document.body.style.overflow = '';
};

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var modal = document.getElementById('deptModal');
    if (modal && modal.classList.contains('show')) {
      closeDeptModal();
    }
  }
});

// ===== Appointment Modal =====
  window.openAppointment = function() {
    var modal = document.getElementById('modal');
    if (modal) modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  window.closeAppointment = function(e) {
    if (e && e.target !== e.currentTarget) return;
    var modal = document.getElementById('modal');
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Performance: passive listeners =====
  // All scroll/wheel/touch listeners are already passive where possible

});
