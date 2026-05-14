import { suryaNamaskarSubsteps } from "./sequences";

const defaultNote = {
  en: "Move within your comfort range. Stop if there is pain, dizziness, or discomfort.",
  hi: "अपनी क्षमता के अनुसार करें। दर्द, चक्कर या असुविधा होने पर रुक जाएं।"
};

const note = (en, hi) => ({ en, hi: hi || en });
const step = (nameKey, type, value, options = {}) => ({
  id: options.id || nameKey,
  nameKey,
  type,
  ...(type === "time" ? { duration: value } : {}),
  ...(type === "reps" ? { reps: value } : {}),
  category: options.category || "asana",
  note: options.note || defaultNote,
  illustrationKey: options.illustrationKey || options.category || "default",
  perSide: options.perSide || false,
  speech: options.speech
});
const timeStep = (key, seconds, options) => step(key, "time", seconds, options);
const repsStep = (key, reps, options) => step(key, "reps", reps, options);
const suryaStep = (rounds = 1) => ({
  id: `surya-namaskar-${rounds}`,
  nameKey: "surya-namaskar",
  type: "sequence",
  reps: rounds,
  sequence: suryaNamaskarSubsteps,
  category: "sequence",
  note: note("Move smoothly from one posture to the next. Keep the breath steady.", "एक आसन से दूसरे आसन में सहजता से जाएं। श्वास स्थिर रखें।"),
  illustrationKey: "sun"
});

export const routineOrder = [
  "patanjaliJogging1",
  "patanjaliAsanas2",
  "patanjaliPhase3",
  "diabetesSupport",
  "weightLossFlow",
  "backPainRelief",
  "kneePainSupport",
  "neckPainSupport",
  "beginnerFlow",
  "intermediateStrengthFlow",
  "gentleRecovery",
  "pranayamaOm"
];

export const routines = {
  patanjaliJogging1: {
    id: "patanjaliJogging1",
    label: { en: "Patanjali Yogic Jogging Part 1", hi: "पतंजलि योगिक जॉगिंग भाग 1" },
    description: { en: "Patanjali Yogic Jogging sequence with Positions 1 to 5, followed by 12 individual Yogic Jogging steps and 5 Surya Namaskar rounds.", hi: "योगिक जॉगिंग स्थिति 1 से 5, फिर 12 स्वतंत्र योगिक जॉगिंग अभ्यास और सूर्य नमस्कार के 5 चक्र।" },
    safety: { en: "Start gently, keep movement rhythmic and controlled, and reduce speed if breathing becomes strained or balance feels unstable.", hi: "धीरे शुरू करें, गति नियंत्रित रखें, श्वास या संतुलन में कठिनाई हो तो गति कम करें।" },
    steps: [
      timeStep("yogic-jogging-position-1", 60, { category: "warmup", illustrationKey: "warmup" }),
      timeStep("yogic-jogging-position-2", 60, { category: "warmup", illustrationKey: "warmup" }),
      timeStep("yogic-jogging-position-3", 60, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("yogic-jogging-position-4", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("yogic-jogging-position-5", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("hasta-sanchalan-kriya", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("purna-hasta-sanchalan-kriya", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("janu-sanchalan-kriya", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("janu-vikasak-kriya", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("uru-vikasak-kriya-1", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("uru-vikasak-kriya-2", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("vaksha-vikasak-kriya", 16, { category: "warmup", illustrationKey: "warmup" }),
      repsStep("trikonasana-kriya", 16, { category: "standing", illustrationKey: "standing" }),
      repsStep("konasana-kriya", 16, { category: "standing", illustrationKey: "standing" }),
      repsStep("hastottanasana-paadhastasana-kriya", 16, { category: "standing", illustrationKey: "standing" }),
      repsStep("chalit-pad-hastasana-kriya", 16, { category: "standing", illustrationKey: "standing" }),
      repsStep("yog-nrutyasana-kriya", 16, { category: "warmup", illustrationKey: "warmup" }),
      suryaStep(5),
      repsStep("mishra-dand", 3, { category: "strength", illustrationKey: "strength" }),
      timeStep("easy-breathing", 45, { category: "pranayama", illustrationKey: "pranayama" })
    ]
  },
  patanjaliAsanas2: {
    id: "patanjaliAsanas2",
    label: { en: "Patanjali Yog Part 2 - Asanas", hi: "पतंजलि योग भाग 2 - आसन" },
    description: { en: "Second class asana sequence with listed repetitions and relaxation timings.", hi: "दूसरे सत्र का आसन क्रम, दोहराव और विश्राम समय के साथ।" },
    safety: { en: "Move with control, avoid jerks, and rest whenever strain, dizziness, pain, or discomfort appears.", hi: "नियंत्रण से करें, झटकों से बचें, और दर्द, चक्कर या असुविधा पर विश्राम करें।" },
    steps: [
      repsStep("makarasana", 16, { illustrationKey: "prone" }), repsStep("ardha-bhujangasana", 8, { illustrationKey: "prone" }), repsStep("purna-bhujangasana", 8, { illustrationKey: "prone" }), repsStep("tiryak-bhujangasana", 8, { illustrationKey: "prone" }), repsStep("saral-bhujangasana", 8, { illustrationKey: "prone" }), repsStep("shalabhasana", 8, { illustrationKey: "prone" }), repsStep("dhanurasana", 8, { illustrationKey: "prone" }), timeStep("bal-vishram-asana", 120, { illustrationKey: "relaxation" }), repsStep("markat-asana", 8, { illustrationKey: "supine" }), repsStep("uttanapadasana", 16, { illustrationKey: "supine" }), repsStep("naukasana", 8, { illustrationKey: "strength" }), repsStep("ekapada-angushtha-nasa-sparshasana", 2, { illustrationKey: "supine" }), repsStep("pawanmuktasana", 2, { illustrationKey: "supine" }), repsStep("ardha-halasana", 16, { illustrationKey: "supine" }), repsStep("padavrittasana", 2, { illustrationKey: "supine" }), repsStep("dwichakrikasana", 10, { illustrationKey: "supine" }), repsStep("kandharasana", 16, { illustrationKey: "supine" }), timeStep("savasana-yog-nidra", 180, { illustrationKey: "relaxation" })
    ]
  },
  patanjaliPhase3: {
    id: "patanjaliPhase3",
    label: { en: "Patanjali Yog Phase 3", hi: "पतंजलि योग चरण 3" },
    description: { en: "Pranayama, asana, kriya, foot work, acupressure, and closing relaxation practices.", hi: "प्राणायाम, आसन, क्रिया, पाद अभ्यास, एक्यूप्रेशर और अंतिम विश्राम।" },
    safety: { en: "Sit in a comfortable posture with the spine, waist, and neck upright. No strain, no force, and no competition. Do all practices only according to your capacity.", hi: "रीढ़, कमर और गर्दन सीधी रखकर आरामदायक स्थिति में बैठें। ज़ोर, तनाव या प्रतिस्पर्धा न करें।" },
    steps: [
      timeStep("prarthana", 60, { illustrationKey: "pranayama" }), repsStep("hasta-manibandha-kurpara-skandha-chakra", 8, { illustrationKey: "warmup" }), repsStep("greeva-sanchalana-3-types", 4, { illustrationKey: "neck" }), repsStep("greeva-anti-pressure", 4, { illustrationKey: "neck" }), repsStep("netra-chakra", 8, { illustrationKey: "eyes" }), timeStep("bhastrika-pranayama", 120, { category: "pranayama", illustrationKey: "pranayama" }), timeStep("kapal-bhati", 600, { category: "pranayama", illustrationKey: "pranayama" }), repsStep("mandukasana", 8, { illustrationKey: "seated" }), repsStep("shashankasana", 8, { illustrationKey: "seated" }), repsStep("gomukhasana", 4, { illustrationKey: "seated" }), repsStep("vakrasana", 4, { illustrationKey: "seated" }), repsStep("ardha-chandrasana", 8, { illustrationKey: "standing" }), repsStep("ustrasana", 8, { illustrationKey: "standing" }), repsStep("marjarasana", 8, { illustrationKey: "warmup" }), repsStep("bahya-pranayama", 3, { category: "pranayama", illustrationKey: "pranayama" }), repsStep("agnisar-kriya", 3, { illustrationKey: "strength" }), repsStep("ujjayi-pranayama", 3, { category: "pranayama", illustrationKey: "pranayama" }), repsStep("foot-exercises", 8, { illustrationKey: "warmup" }), repsStep("chakki-chalan", 8, { illustrationKey: "seated" }), repsStep("sthit-konasana", 20, { illustrationKey: "standing" }), timeStep("titli-asana", 300, { illustrationKey: "seated" }), repsStep("tali-vadan", 21, { illustrationKey: "warmup" }), repsStep("kidney-acupressure", 5, { illustrationKey: "acupressure" }), timeStep("anulom-vilom", 600, { category: "pranayama", illustrationKey: "pranayama" }), repsStep("bhramari", 5, { category: "pranayama", illustrationKey: "pranayama" }), repsStep("udgeeth-pranayama", 5, { category: "pranayama", illustrationKey: "pranayama" }), timeStep("pranav-pranayama", 180, { category: "pranayama", illustrationKey: "pranayama" }), repsStep("simhasana", 3, { illustrationKey: "seated" }), repsStep("hasyasana", 3, { illustrationKey: "seated" }), timeStep("savasana-yog-nidra", 120, { illustrationKey: "relaxation" })
    ]
  },
  diabetesSupport: {
    id: "diabetesSupport", label: { en: "Diabetes Support", hi: "डायबिटीज़ सपोर्ट" }, description: { en: "Gentle breathing, mobility, and relaxation support routine.", hi: "श्वसन, गतिशीलता और विश्राम के लिए सरल सहायक रूटीन।" }, safety: { en: "Practise gently and monitor energy, dizziness, and comfort.", hi: "धीरे अभ्यास करें और ऊर्जा, चक्कर तथा सुविधा पर ध्यान दें।" },
    steps: [timeStep("diaphragmatic-breath",120,{illustrationKey:"pranayama"}), suryaStep(2), timeStep("cat-cow",60,{illustrationKey:"warmup"}), timeStep("seated-forward-fold",60,{illustrationKey:"seated"}), timeStep("cobra-pose",60,{illustrationKey:"prone"}), timeStep("pawanmuktasana",60,{illustrationKey:"supine"}), repsStep("mandukasana",9,{illustrationKey:"seated", note: note("Mandukasana: 3 poses, 3 times each.", "मंडूकासन: 3 प्रकार, प्रत्येक 3 बार।")}), timeStep("bridge-pose",60,{illustrationKey:"supine"}), timeStep("anulom-vilom",180,{illustrationKey:"pranayama"}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})]
  },
  weightLossFlow: { id: "weightLossFlow", label: { en: "Weight Loss Flow", hi: "वेट लॉस फ्लो" }, description: { en: "A more active flow with breath, strength, and rest.", hi: "श्वसन, शक्ति और विश्राम के साथ सक्रिय फ्लो।" }, safety: { en: "Keep intensity moderate. Pause if breathing becomes strained.", hi: "गति मध्यम रखें। श्वास में तनाव हो तो विराम लें।" }, steps: [timeStep("bhastrika-pranayama",120,{illustrationKey:"pranayama"}), suryaStep(3), repsStep("chair-pose-pulses",16,{illustrationKey:"strength"}), timeStep("plank-hold",45,{illustrationKey:"strength"}), timeStep("high-lunge",60,{illustrationKey:"standing",perSide:true}), repsStep("naukasana",8,{illustrationKey:"strength"}), timeStep("bridge-pose",60,{illustrationKey:"supine"}), timeStep("kapal-bhati",180,{illustrationKey:"pranayama"}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})] },
  backPainRelief: { id: "backPainRelief", label: { en: "Back Pain Relief", hi: "पीठ दर्द राहत" }, description: { en: "Gentle back-friendly mobility and relaxation.", hi: "पीठ के लिए सरल गतिशीलता और विश्राम।" }, safety: { en: "Do not force range. Avoid if pain increases.", hi: "ज़ोर न लगाएं। दर्द बढ़े तो अभ्यास रोकें।" }, steps: [timeStep("easy-breathing",90,{illustrationKey:"pranayama"}), repsStep("pelvic-tilts",12,{illustrationKey:"supine"}), timeStep("cat-cow",60,{illustrationKey:"warmup"}), timeStep("childs-pose",60,{illustrationKey:"relaxation"}), timeStep("sphinx-pose",45,{illustrationKey:"prone"}), timeStep("knees-to-chest",60,{illustrationKey:"supine"}), timeStep("supine-twist",60,{illustrationKey:"supine",perSide:true}), timeStep("bridge-pose",60,{illustrationKey:"supine"}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})] },
  kneePainSupport: { id: "kneePainSupport", label: { en: "Knee Pain Support", hi: "घुटने दर्द सपोर्ट" }, description: { en: "Low-impact knee support routine.", hi: "घुटनों के लिए कम-प्रभाव वाला सपोर्ट रूटीन।" }, safety: { en: "Avoid deep knee bends and stop if pain increases.", hi: "गहरे घुटने मोड़ने से बचें और दर्द बढ़े तो रुकें।" }, steps: [timeStep("diaphragmatic-breath",90,{illustrationKey:"pranayama"}), repsStep("ankle-rotations",12,{illustrationKey:"warmup"}), timeStep("hamstring-stretch",60,{illustrationKey:"supine",perSide:true}), repsStep("quad-set",12,{illustrationKey:"strength"}), timeStep("bridge-pose",60,{illustrationKey:"supine"}), repsStep("supported-chair-pose",8,{illustrationKey:"strength"}), timeStep("legs-up-the-wall",120,{illustrationKey:"relaxation"}), timeStep("anulom-vilom",180,{illustrationKey:"pranayama"})] },
  neckPainSupport: { id: "neckPainSupport", label: { en: "Neck Pain / Spondylosis Support", hi: "गर्दन दर्द / स्पॉन्डिलोसिस सपोर्ट" }, description: { en: "Gentle neck and shoulder relief routine.", hi: "गर्दन और कंधों के लिए सरल राहत रूटीन।" }, safety: { en: "Keep all neck movements slow and small. Stop with tingling, dizziness, or pain.", hi: "गर्दन की सभी गतिविधियां धीमी और छोटी रखें। झनझनाहट, चक्कर या दर्द पर रुकें।" }, steps: [timeStep("easy-breathing",90,{illustrationKey:"pranayama"}), repsStep("neck-isometrics",6,{illustrationKey:"neck"}), repsStep("shoulder-rolls",12,{illustrationKey:"warmup"}), timeStep("thread-the-needle",60,{illustrationKey:"warmup",perSide:true}), timeStep("cat-cow",60,{illustrationKey:"warmup"}), timeStep("supported-fish-pose",60,{illustrationKey:"relaxation"}), repsStep("bhramari",5,{illustrationKey:"pranayama"}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})] },
  beginnerFlow: { id: "beginnerFlow", label: { en: "Beginner Flow", hi: "शुरुआती फ्लो" }, description: { en: "Balanced beginner-friendly yoga flow.", hi: "शुरुआती लोगों के लिए संतुलित योग फ्लो।" }, safety: { en: "Use support where needed and avoid strain.", hi: "ज़रूरत हो तो सहारा लें और ज़ोर न लगाएं।" }, steps: [timeStep("prarthana",60,{illustrationKey:"pranayama"}), repsStep("neck-rolls",6,{illustrationKey:"neck"}), repsStep("shoulder-rolls",12,{illustrationKey:"warmup"}), timeStep("cat-cow",60,{illustrationKey:"warmup"}), timeStep("downward-dog",45,{illustrationKey:"standing"}), timeStep("low-lunge",60,{illustrationKey:"standing",perSide:true}), timeStep("warrior-ii",45,{illustrationKey:"standing",perSide:true}), timeStep("tree-pose",45,{illustrationKey:"balance",perSide:true}), timeStep("seated-forward-fold",60,{illustrationKey:"seated"}), timeStep("supine-twist",60,{illustrationKey:"supine",perSide:true}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})] },
  intermediateStrengthFlow: { id: "intermediateStrengthFlow", label: { en: "Intermediate Strength Flow", hi: "मध्यम शक्ति फ्लो" }, description: { en: "Strength-focused flow for users with some experience.", hi: "अनुभवी उपयोगकर्ताओं के लिए शक्ति-केन्द्रित फ्लो।" }, safety: { en: "Skip any posture that feels unsafe or too intense.", hi: "जो आसन असुरक्षित या अधिक कठिन लगे उसे छोड़ दें।" }, steps: [timeStep("bhastrika-pranayama",120,{illustrationKey:"pranayama"}), suryaStep(3), repsStep("chair-pose-pulses",16,{illustrationKey:"strength"}), timeStep("plank-hold",60,{illustrationKey:"strength"}), timeStep("cobra-to-childs-pose",60,{illustrationKey:"prone"}), timeStep("crescent-lunge",60,{illustrationKey:"standing",perSide:true}), timeStep("warrior-iii",45,{illustrationKey:"balance",perSide:true}), repsStep("naukasana",8,{illustrationKey:"strength"}), timeStep("bridge-pose",60,{illustrationKey:"supine"}), timeStep("happy-baby",60,{illustrationKey:"supine"}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})] },
  gentleRecovery: { id: "gentleRecovery", label: { en: "Gentle / Recovery", hi: "सौम्य / रिकवरी" }, description: { en: "Soft recovery routine for rest days.", hi: "आराम वाले दिनों के लिए सौम्य रिकवरी रूटीन।" }, safety: { en: "Stay gentle and restorative throughout.", hi: "पूरे अभ्यास में सौम्य और विश्रामपूर्ण रहें।" }, steps: [timeStep("easy-breathing",90,{illustrationKey:"pranayama"}), timeStep("seated-side-stretch",60,{illustrationKey:"seated",perSide:true}), timeStep("seated-twist",60,{illustrationKey:"seated",perSide:true}), timeStep("cat-cow",60,{illustrationKey:"warmup"}), timeStep("thread-the-needle",60,{illustrationKey:"warmup",perSide:true}), timeStep("childs-pose",90,{illustrationKey:"relaxation"}), timeStep("figure-four-stretch",60,{illustrationKey:"supine",perSide:true}), timeStep("legs-up-the-wall",180,{illustrationKey:"relaxation"}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})] },
  pranayamaOm: { id: "pranayamaOm", label: { en: "Pranayama & Om", hi: "प्राणायाम और ॐ" }, description: { en: "Focused breathing and Om practice.", hi: "श्वसन और ॐ अभ्यास पर केंद्रित रूटीन।" }, safety: { en: "No forceful breathing. Keep breath smooth and comfortable.", hi: "ज़ोर से श्वास न लें। श्वास सहज और आरामदायक रखें।" }, steps: [timeStep("bhastrika-pranayama",120,{illustrationKey:"pranayama"}), timeStep("kapal-bhati",180,{illustrationKey:"pranayama"}), timeStep("anulom-vilom",300,{illustrationKey:"pranayama"}), repsStep("bhramari",5,{illustrationKey:"pranayama"}), timeStep("om-pranav",180,{illustrationKey:"pranayama"}), timeStep("savasana-yog-nidra",180,{illustrationKey:"relaxation"})] }
};
