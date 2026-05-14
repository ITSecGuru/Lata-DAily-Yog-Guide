Below is a **Codex-ready technical build specification** based on the **latest current app state**, updated with build, deployment, accessibility, safety, and runtime behavior clarifications.

You can paste this into ChatGPT, Codex, or another coding agent as the source specification for a clean rebuild.

---

# Codex-Ready Technical Build Specification

**Version:** v4 — updated naming, Devanagari/Roman/English display, and Hindi/English speech model

## Project: Lata Yog Routine Guide

## Objective

Build a React + Vite application named **Lata Yog Routine Guide** that recreates the current yoga guidance app in a cleaner, more maintainable architecture.

The rebuilt version must preserve the current functional behavior while improving structure, modularity, data separation, and future maintainability.

---

## 1. Tech Stack

Use:

* React
* Vite
* Tailwind CSS
* Framer Motion
* lucide-react

Package dependencies must include:

* `react`
* `react-dom`
* `@vitejs/plugin-react`
* `vite`
* `tailwindcss`
* `postcss`
* `autoprefixer`
* `framer-motion`
* `lucide-react`

Use:

* functional React components
* modern hooks
* modular file structure
* no backend
* no database
* no authentication

---

## 2. Output Requirements

Generate a **complete restorable project** with:

* `package.json`
* `vite.config.js`
* `tailwind.config.js`
* `postcss.config.js`
* `index.html`
* `src/main.jsx`
* `src/App.jsx`
* `src/styles.css`
* modular components
* modular data files
* restore instructions in `README.md`

The result must be able to run with:

```bash
npm install
npm run dev
```

---

## 3. Architecture Requirements

Do **not** build this as one giant component.

Use this structure or something very close to it:

```text
package.json
vite.config.js
tailwind.config.js
postcss.config.js
index.html
README.md
src/
  components/
    ui/
      Button.jsx
      Card.jsx
      Badge.jsx
      Progress.jsx
      Select.jsx
    layout/
      RoutineSelector.jsx
      RoutineHeader.jsx
      SafetyPanel.jsx
    practice/
      CurrentStepPanel.jsx
      ControlsPanel.jsx
      IllustrationPanel.jsx
      BreathingPanel.jsx
      SequencePanel.jsx
      RoutineStepList.jsx
  data/
    sequences.js
    routines.js
    routineText.js
    uiText.js
    stepNames.js
    hindiNotes.js
    audioPrompts.js
    illustrations.js
    safety.js
  lib/
    audio.js
    routineEngine.js
    time.js
    breathing.js
  App.jsx
  main.jsx
  styles.css
```

### Separation rules

* routine definitions must live in data files
* interface language text must live in language files
* step names must live in a data-driven name registry or directly in routine step data using the v4 naming model
* note text must live in data files
* audio prompts must live in data files
* illustration mappings must live in data files
* step/sequence progression logic must live in a reusable engine/helper layer

---

## 4. Product Name

Application title:
**Lata Yog Routine Guide**

---

## 5. Functional Overview

The app must:

* let users choose a routine
* show the current activity
* show timing, repetition count, or sequence state
* provide start/pause/reset/complete-next controls
* provide progress tracking
* support English and Hindi interface language
* always display step names using Devanagari original name, Roman transliteration, and optional English equivalent
* support Hindi and English spoken audio mode
* show breathing animation for selected pranayama steps
* show pose illustrations
* show two media placeholders:

  * picture link
  * video link
* support safety notes
* support original Devanagari names, Roman transliteration, and optional English equivalents
* include a clear health disclaimer for medical-risk routines

---

## 6. Menu Items

Use a flat dropdown for now, in this exact order:

1. Patanjali Yogic Jogging Part 1
2. Patanjali Yog Part 2 - Asanas
3. Patanjali Yog Phase 3
4. Diabetes Support
5. Weight Loss Flow
6. Back Pain Relief
7. Knee Pain Support
8. Neck Pain / Spondylosis Support
9. Beginner Flow
10. Intermediate Strength Flow
11. Gentle / Recovery
12. Pranayama & Om

### Default selected routine

Set the default selected routine to:

```text
patanjaliJogging1
```

---

## 7. Language, Naming, and Speech Model

The app must **not** use a separate Sanskrit interface mode.

Use two user-facing language controls only:

### 7.1 Interface language

Options:

* English
* Hindi

Interface language controls:

* app labels
* buttons
* headings
* routine descriptions
* safety notes
* general instructions
* completion messages

### 7.2 Spoken audio language

Options:

* Hindi
* English

Spoken audio language controls the browser text-to-speech prompt.

For spoken Hindi:

* use Hindi/Devanagari speech prompts where available
* prefer Hindi-compatible browser voices, especially voices with language codes beginning with `hi`
* fall back to Roman transliteration if a Hindi-compatible voice is unavailable
* never produce blank speech prompts

For spoken English:

* use English speech prompts
* include Roman original names and English equivalents where useful
* never produce blank speech prompts

### 7.3 Step name display

Step/asana/pranayama/kriya names must **always display all available name forms together**.

Required display order:

1. Original Devanagari name
2. Roman transliteration
3. Optional English equivalent/common name, if available

Example:

```text
मर्कटासन
Markat Asan
Monkey Pose
```

If no commonly used English equivalent exists, show only:

```text
जानु संचालन क्रिया
Janu Sanchalan Kriya
```

Do not provide a separate display-name selector. The display should be inclusive and show the original name, Roman reading support, and the English equivalent where available.

### 7.4 Step data model for names and speech

Each step should support this structure:

```js
{
  id: "markat-asana",
  category: "asana",
  names: {
    devanagari: "मर्कटासन",
    roman: "Markat Asan",
    english: "Monkey Pose"
  },
  speech: {
    hi: "मर्कटासन प्रारंभ करें। धीरे-धीरे और सावधानी से अभ्यास करें।",
    en: "Begin Markat Asan, also known as Monkey Pose. Move slowly and carefully."
  },
  note: {
    hi: "धीरे-धीरे करें और शरीर पर जोर न डालें।",
    en: "Move gently and avoid strain."
  }
}
```

For entries without an English equivalent:

```js
{
  id: "janu-sanchalan-kriya",
  names: {
    devanagari: "जानु संचालन क्रिया",
    roman: "Janu Sanchalan Kriya",
    english: null
  },
  speech: {
    hi: "जानु संचालन क्रिया प्रारंभ करें।",
    en: "Begin Janu Sanchalan Kriya."
  }
}
```

---

## 8. Step System

Implement three step types:

### 8.1 `time`

Fields:

* `id`
* `names.devanagari`
* `names.roman`
* optional `names.english`
* `type: "time"`
* `duration`
* optional `category`
* `note`
* optional `hindiNote`
* `speech.hi`
* `speech.en`
* `illustrationKey`

### 8.2 `reps`

Fields:

* `id`
* `names.devanagari`
* `names.roman`
* optional `names.english`
* `type: "reps"`
* `reps`
* optional `category`
* `note`
* optional `hindiNote`
* `speech.hi`
* `speech.en`
* `illustrationKey`

### 8.3 `sequence`

Fields:

* `id`
* `names.devanagari`
* `names.roman`
* optional `names.english`
* `type: "sequence"`
* `reps`
* `sequence`
* `note`
* optional `hindiNote`
* `speech.hi`
* `speech.en`
* `illustrationKey`

### 8.4 Per-side support

Steps may include:

* `perSide: true`

The engine should expand these into left/right display steps.

### 8.5 Time and reps behavior

For `time` steps:

* show a countdown timer
* when the timer reaches zero while the routine is playing, automatically mark the step complete and advance to the next step
* if the routine is paused, keep the current remaining time unchanged

For `reps` steps:

* show the repetition count clearly
* do not auto-complete the step
* wait for the user to press **Complete & Next**

For `sequence` steps:

* automatically progress through substeps while the routine is playing
* respect pause/reset controls
* complete the sequence only after the last substep of the last round

---

## 9. Sequence Rules

### 9.1 Surya Namaskar

Surya Namaskar is the only grouped sequence required in the rebuilt app.

It must contain these 12 substeps:

1. Prayer Pose — Pranamasana
2. Raised Arms Pose — Hastauttanasana
3. Standing Forward Bend — Hastapadasana
4. Equestrian Pose — Ashwa Sanchalanasana
5. Stick / Plank Pose — Dandasana
6. Salute with Eight Parts — Ashtanga Namaskara
7. Cobra Pose — Bhujangasana
8. Mountain Pose — Parvatasana
9. Equestrian Pose — Ashwa Sanchalanasana
10. Standing Forward Bend — Hastapadasana
11. Raised Arms Pose — Hastauttanasana
12. Standing Pose — Tadasana

### 9.2 Yogic Jogging 12-step rule

Do **not** group the 12 Yogic Jogging items into a sequence.

They must be modeled as **12 independent repetition steps** inside Patanjali Part 1.

This is important:

* only Surya Namaskar should remain a grouped sequence
* Yogic Jogging 12-step items must behave like regular steps

---

## 10. Naming Rules

### 10.1 Savasana naming

Wherever Savasana appears, display:

**Savasana / Yog Nidra**

### 10.2 Prayer naming

Where earlier versions used “Centering Breath”, use:

**Prayer / Prarthana**

Optional:

* retain `"Centering Breath"` as `commonName` if useful internally

### 10.3 Formal/common naming for Phase 3

Certain items must use formal main titles plus optional common-name display.

Required examples:

* `Hasta–Manibandha–Kurpara–Skandha Chakra`

  * common name: `Hand, Wrist, Elbow & Shoulder Rotation`

* `Greeva Sanchalana - 3 Types`

  * common name: `Neck Rotation - 3 Types`

* `Greeva Anti-Pressure`

  * common name: `Neck Anti-Pressure`

* `Netra Chakra`

  * common name: `Eye Rotation`

The UI should show:

* main name
* Roman transliteration
* optional common name as secondary text

---

## 10A. Complete Step Name Registry for v4

Use this registry to populate `src/data/stepNames.js` or to populate the `names` object inside each step definition. The app must display the Devanagari, Roman, and English equivalent columns together where available.

Where an English term is descriptive rather than a strict traditional translation, keep it as the common English equivalent for user clarity. If a better lineage-specific translation is later confirmed, update the registry without changing UI code.

| Key | Devanagari original name | Roman transliteration | English equivalent / common name |
|---|---|---|---|
| `prarthana` | प्रार्थना | Prarthana | Prayer |
| `yogic-jogging-position-1` | योगिक जॉगिंग स्थिति 1 | Yogic Jogging Sthiti 1 | Yogic Jogging Position 1 |
| `yogic-jogging-position-2` | योगिक जॉगिंग स्थिति 2 | Yogic Jogging Sthiti 2 | Yogic Jogging Position 2 |
| `yogic-jogging-position-3` | योगिक जॉगिंग स्थिति 3 | Yogic Jogging Sthiti 3 | Yogic Jogging Position 3 |
| `yogic-jogging-position-4` | योगिक जॉगिंग स्थिति 4 | Yogic Jogging Sthiti 4 | Yogic Jogging Position 4 |
| `yogic-jogging-position-5` | योगिक जॉगिंग स्थिति 5 | Yogic Jogging Sthiti 5 | Yogic Jogging Position 5 |
| `hasta-sanchalan-kriya` | हस्त संचालन क्रिया | Hasta Sanchalan Kriya | Hand Movement Practice |
| `purna-hasta-sanchalan-kriya` | पूर्ण हस्त संचालन क्रिया | Purna Hasta Sanchalan Kriya | Full Arm Movement Practice |
| `janu-sanchalan-kriya` | जानु संचालन क्रिया | Janu Sanchalan Kriya | Knee Movement Practice |
| `janu-vikasak-kriya` | जानु विकासक क्रिया | Janu Vikasak Kriya | Knee Strengthening Practice |
| `uru-vikasak-kriya-1` | ऊरु विकासक क्रिया - 1 | Uru Vikasak Kriya - 1 | Thigh Strengthening Practice 1 |
| `uru-vikasak-kriya-2` | ऊरु विकासक क्रिया - 2 | Uru Vikasak Kriya - 2 | Thigh Strengthening Practice 2 |
| `vaksha-vikasak-kriya` | वक्ष विकासक क्रिया | Vaksha Vikasak Kriya | Chest Expansion Practice |
| `trikonasana-kriya` | त्रिकोणासन क्रिया | Trikonasana Kriya | Triangle Movement Practice |
| `konasana-kriya` | कोणासन क्रिया | Konasana Kriya | Angle Movement Practice |
| `hastottanasana-paadhastasana-kriya` | हस्तोत्तानासन-पादहस्तासन क्रिया | Hastottanasana-Padahastasana Kriya | Raised Arms to Hand-to-Foot Practice |
| `chalit-pad-hastasana-kriya` | चलित पाद हस्तासन क्रिया | Chalit Pad Hastasana Kriya | Dynamic Foot-Hand Pose Practice |
| `yog-nrutyasana-kriya` | योग नृत्यासन क्रिया | Yog Nrutyasana Kriya | Yogic Dance Movement Practice |
| `surya-namaskar` | सूर्य नमस्कार | Surya Namaskar | Sun Salutation |
| `mishra-dand` | मिश्र दंड | Mishra Dand | Mixed Staff / Dynamic Push-up Practice |
| `easy-breathing` | सरल श्वसन | Saral Shwasan | Easy Breathing |
| `makarasana` | मकरासन | Makarasan | Crocodile Pose |
| `ardha-bhujangasana` | अर्ध भुजंगासन | Ardha Bhujangasan | Half Cobra Pose |
| `purna-bhujangasana` | पूर्ण भुजंगासन | Purna Bhujangasan | Full Cobra Pose |
| `tiryak-bhujangasana` | तिर्यक भुजंगासन | Tiryak Bhujangasan | Twisting Cobra Pose |
| `saral-bhujangasana` | सरल भुजंगासन | Saral Bhujangasan | Simple Cobra Pose |
| `shalabhasana` | शलभासन | Shalabhasan | Locust Pose |
| `dhanurasana` | धनुरासन | Dhanurasan | Bow Pose |
| `bal-vishram-asana` | बाल विश्राम आसन | Bal Vishram Asan | Child Rest Pose |
| `markat-asana` | मर्कटासन | Markat Asan | Monkey Pose / Supine Spinal Twist |
| `uttanapadasana` | उत्तानपादासन | Uttanapadasan | Raised Leg Pose |
| `naukasana` | नौकासन | Naukasan | Boat Pose |
| `ekapada-angushtha-nasa-sparshasana` | एकपाद अंगुष्ठ नासिका स्पर्शासन | Ekapada Angushtha Nasa Sparshasan | One-Leg Toe-to-Nose Touch Pose |
| `pawanmuktasana` | पवनमुक्तासन | Pawanmuktasan | Wind-Relieving Pose |
| `ardha-halasana` | अर्ध हलासन | Ardha Halasan | Half Plough Pose |
| `padavrittasana` | पादवृत्तासन | Padavrittasan | Leg Rotation Pose |
| `dwichakrikasana` | द्विचक्रिकासन | Dwichakrikasan | Bicycle Pose |
| `kandharasana` | कंधरासन | Kandharasan | Shoulder Pose / Bridge-like Pose |
| `savasana-yog-nidra` | शवासन / योग निद्रा | Savasan / Yog Nidra | Corpse Pose / Yogic Sleep |
| `hasta-manibandha-kurpara-skandha-chakra` | हस्त-मणिबंध-कूर्पर-स्कंध चक्र | Hasta-Manibandha-Kurpara-Skandha Chakra | Hand, Wrist, Elbow & Shoulder Rotation |
| `greeva-sanchalana-3-types` | ग्रीवा संचालन - 3 प्रकार | Greeva Sanchalan - 3 Types | Neck Rotation - 3 Types |
| `greeva-anti-pressure` | ग्रीवा एंटी-प्रेशर | Greeva Anti-Pressure | Neck Anti-Pressure |
| `netra-chakra` | नेत्र चक्र | Netra Chakra | Eye Rotation |
| `bhastrika-pranayama` | भस्त्रिका प्राणायाम | Bhastrika Pranayam | Bellows Breath |
| `kapal-bhati` | कपालभाति प्राणायाम | Kapal Bhati Pranayam | Skull-Shining Breath |
| `mandukasana` | मंडूकासन | Mandukasan | Frog Pose |
| `shashankasana` | शशांकासन | Shashankasan | Hare Pose / Child-like Forward Bend |
| `gomukhasana` | गोमुखासन | Gomukhasan | Cow Face Pose |
| `vakrasana` | वक्रासन | Vakrasan | Twisted Pose |
| `ardha-chandrasana` | अर्ध चंद्रासन | Ardha Chandrasan | Half Moon Pose |
| `ustrasana` | उष्ट्रासन | Ustrasan | Camel Pose |
| `marjarasana` | मार्जरासन | Marjarasan | Cat Pose |
| `bahya-pranayama` | बाह्य प्राणायाम | Bahya Pranayam | External Breath Retention |
| `agnisar-kriya` | अग्निसार क्रिया | Agnisar Kriya | Abdominal Fire Practice |
| `ujjayi-pranayama` | उज्जायी प्राणायाम | Ujjayi Pranayam | Victorious Breath |
| `foot-exercises` | पाद व्यायाम | Pad Vyayam | Foot Exercises |
| `chakki-chalan` | चक्की चालन | Chakki Chalan | Mill Churning Movement |
| `sthit-konasana` | स्थित कोणासन | Sthit Konasan | Standing Angle Pose |
| `titli-asana` | तितली आसन | Titli Asan | Butterfly Pose |
| `tali-vadan` | ताली वादन | Tali Vadan | Clapping Practice |
| `kidney-acupressure` | वृक्क एक्यूप्रेशर | Vrikk Acupressure | Kidney Acupressure |
| `anulom-vilom` | अनुलोम विलोम | Anulom Vilom | Alternate Nostril Breathing |
| `bhramari` | भ्रामरी प्राणायाम | Bhramari Pranayam | Humming Bee Breath |
| `udgeeth-pranayama` | उद्गीथ प्राणायाम | Udgeeth Pranayam | Om Chanting Breath |
| `pranav-pranayama` | प्रणव प्राणायाम | Pranav Pranayam | Om / Pranav Meditation Breath |
| `om-pranav` | ॐ प्रणव | Om Pranav | Om Chanting |
| `simhasana` | सिंहासन | Simhasan | Lion Pose |
| `hasyasana` | हास्यासन | Hasyasan | Laughter Pose |
| `diaphragmatic-breath` | उदर श्वसन | Udar Shwasan | Diaphragmatic Breath |
| `cat-cow` | मार्जरी-बितिलासन | Marjari-Bitilasan | Cat-Cow |
| `seated-forward-fold` | पश्चिमोत्तानासन | Paschimottanasan | Seated Forward Fold |
| `cobra-pose` | भुजंगासन | Bhujangasan | Cobra Pose |
| `bridge-pose` | सेतु बंधासन | Setu Bandhasan | Bridge Pose |
| `chair-pose-pulses` | उत्कटासन पल्स | Utkatasan Pulses | Chair Pose Pulses |
| `plank-hold` | फलकासन धारण | Phalakasan Hold | Plank Hold |
| `high-lunge` | अश्व संचालनासन | Ashwa Sanchalanasan | High Lunge |
| `pelvic-tilts` | श्रोणि चालन | Shroni Chalan | Pelvic Tilts |
| `childs-pose` | बालासन | Balasan | Child's Pose |
| `sphinx-pose` | सालंब भुजंगासन | Salamba Bhujangasan | Sphinx Pose |
| `knees-to-chest` | अपानासन | Apanasan | Knees to Chest |
| `supine-twist` | सुप्त मत्स्येन्द्रासन | Supta Matsyendrasan | Supine Twist |
| `ankle-rotations` | गुल्फ चक्र | Gulpha Chakra | Ankle Rotations |
| `hamstring-stretch` | पश्चिम जंघा खिंचाव | Paschim Jangha Khinchav | Hamstring Stretch |
| `quad-set` | जंघा संकोच | Jangha Sankoch | Quad Set |
| `supported-chair-pose` | सहायक उत्कटासन | Sahayak Utkatasan | Supported Chair Pose |
| `legs-up-the-wall` | विपरीत करणी | Viparita Karani | Legs Up the Wall |
| `neck-isometrics` | ग्रीवा स्थिरता अभ्यास | Greeva Sthirata Abhyas | Neck Isometrics |
| `shoulder-rolls` | स्कंध चक्र | Skandha Chakra | Shoulder Rolls |
| `thread-the-needle` | सूची सूत्रासन | Suchi Sutrasan | Thread the Needle |
| `supported-fish-pose` | सहायक मत्स्यासन | Sahayak Matsyasan | Supported Fish Pose |
| `neck-rolls` | ग्रीवा चालन | Greeva Chalan | Neck Rolls |
| `downward-dog` | अधोमुख श्वानासन | Adho Mukha Shvanasan | Downward Dog |
| `low-lunge` | अंजनेयासन | Anjaneyasan | Low Lunge |
| `warrior-ii` | वीरभद्रासन 2 | Virabhadrasan II | Warrior II |
| `tree-pose` | वृक्षासन | Vrikshasan | Tree Pose |
| `cobra-to-childs-pose` | भुजंगासन से बालासन | Bhujangasan to Balasan | Cobra to Child's Pose |
| `crescent-lunge` | अंजनेयासन | Anjaneyasan | Crescent Lunge |
| `warrior-iii` | वीरभद्रासन 3 | Virabhadrasan III | Warrior III |
| `happy-baby` | आनंद बालासन | Ananda Balasan | Happy Baby |
| `seated-side-stretch` | बैठकर पार्श्व खिंचाव | Baithkar Parshva Khinchav | Seated Side Stretch |
| `seated-twist` | बैठकर वक्रासन | Baithkar Vakrasan | Seated Twist |
| `figure-four-stretch` | सूचिरंध्रासन | Suchirandhrasan | Figure Four Stretch |
| `surya-pranamasana` | प्रणामासन | Pranamasan | Prayer Pose |
| `surya-hastauttanasana` | हस्तोत्तानासन | Hastauttanasan | Raised Arms Pose |
| `surya-hastapadasana` | हस्तपादासन | Hastapadasan | Standing Forward Bend |
| `surya-ashwa-sanchalanasana` | अश्व संचालनासन | Ashwa Sanchalanasan | Equestrian Pose |
| `surya-dandasana` | दंडासन | Dandasan | Stick / Plank Pose |
| `surya-ashtanga-namaskara` | अष्टांग नमस्कार | Ashtanga Namaskar | Salute with Eight Parts |
| `surya-bhujangasana` | भुजंगासन | Bhujangasan | Cobra Pose |
| `surya-parvatasana` | पर्वतासन | Parvatasan | Mountain Pose |
| `surya-tadasana` | ताड़ासन | Tadasan | Standing Pose |

### 10A.1 Required rendering behaviour

For every current step, render names in this order:

```text
{names.devanagari}
{names.roman}
{names.english if available}
```

Do not replace the Devanagari original with the English equivalent. The English equivalent is an additional helper label only.

### 10A.2 Required speech prompt behaviour

The displayed names are not the speech source. Use `speech.hi` or `speech.en` depending on selected spoken audio language. If `speech.hi` is missing, build a safe Hindi prompt from `names.devanagari`. If `speech.en` is missing, build a safe English prompt from `names.roman` plus `names.english` where available.

---

## 11. Global Safety Rules

Global safety note:

```text
Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.
```

Each routine may also define a routine-specific safety note.

### General health disclaimer

Include this disclaimer somewhere visible, preferably in the safety panel or footer:

```text
This app is for gentle yoga guidance only and is not medical advice. If you have a medical condition, recent surgery, pregnancy, hypertension, severe pain, dizziness, mobility limitations, or any health concern, consult a qualified health professional before practising.
```

### Kapal Bhati safety note

Special note for Kapal Bhati:

```text
Avoid Kapal Bhati for 6–12 months after surgery. People with hypertension should slow down the rhythm and practise gently.
```

---

## 12. Breathing Animation Rules

Implement breathing animation for selected pranayama steps.

Required supported breathing configs:

* Prayer / Prarthana
* Easy Breathing
* Diaphragmatic Breath
* Bhastrika Pranayama
* Kapal Bhati
* Anulom Vilom
* Bhramari
* Om Pranav

### Kapal Bhati rule

Kapal Bhati must be modeled as:

* active exhale
* passive inhale

Do not present inhale as a consciously pulled breath.

The UI should reflect:

* exhale as active
* inhale as passive/natural

Also include:

* active stroke counter during Kapal Bhati

---

## 13. Audio Rules

Use browser speech synthesis.

Implement:

* audio on step change
* spoken audio language selection:

  * Hindi
  * English
* mute toggle
* safe fallback if speech synthesis is unavailable

### Hindi prompt mapping

All routines should support dedicated Hindi/Devanagari prompts for named steps where available. Phase 3 must support dedicated Hindi prompts for specific named steps. English prompts should remain available as fallback.

---

## 14. Illustration Rules

Use a data-driven illustration map.

Allow simple visual cues such as:

* emoji
* icon symbol
* placeholder illustration tokens

Do not hardcode illustrations directly in rendering logic.

---

## 15. Media Placeholder Rules

Beside the illustration panel, include two static placeholder areas:

* Picture Link
* Video Link

Current behavior:

* show label
* show placeholder text
* no actual URLs required yet

Example placeholder text:

* `Placeholder for web image URL`
* `Placeholder for web video URL`

---

## 16. Layout Requirements

### Desktop layout

Use:

* left main content area
* right routine steps panel

### Main content top section

Must contain:

* current activity area
* timer / reps / sequence status
* controls
* illustration panel

The layout should remain compact enough that:

* timer
* controls
* illustration
  can be seen together comfortably

### Mobile behavior

Must remain responsive:

* stack layout vertically
* controls wrap safely
* illustration shrinks appropriately
* routine list moves below main content

### Accessibility and mobile usability

Use:

* readable font sizes
* high-contrast controls
* clear button labels
* large tap targets for mobile users
* keyboard-friendly controls where practical
* responsive spacing so the timer, controls, and illustration remain visible on smaller screens

---

## 17. Controls

Required controls:

* Start
* Pause
* Complete & Next
* Reset

Behavior:

* Start begins timer/sequence progression
* Pause pauses automatic progression
* Complete & Next marks current step complete and moves forward
* Reset returns routine to beginning
* Time-based steps auto-complete and move to the next step when the countdown reaches zero while playing
* Repetition-based steps do not auto-complete; the user must press Complete & Next

---

## 18. Progress System

Display:

* progress bar
* completed count
* total steps
* approximate routine duration

### Approximate duration calculation

Use:

* actual durations for `time` steps
* calculated estimate for `reps` steps
* estimated total for `sequence` steps

For routines where exact duration or repetition timing is not specified, assign sensible beginner-safe defaults:

* breathing/pranayama: 60–180 seconds
* gentle asanas: 45–90 seconds
* repetition practices: 8–16 reps
* Savasana / Yog Nidra: 120–180 seconds

Keep default values conservative and safe.

---

## 19. Sequence Display Rules

### Surya Namaskar display

When the active step is a sequence:

* show sequence substeps
* highlight current substep
* show current round and step index

This only needs to be used for Surya Namaskar in the current rebuild.

---

## 20. Routine List Rules

The right-side routine step list must show:

* all top-level steps of the current routine
* icon
* name
* Devanagari name and Roman transliteration
* optional common name
* note
* duration/reps badge
* active styling
* completed styling

Important:

* Yogic Jogging 12-step items are top-level steps in Part 1
* do not render them as a grouped expandable sequence

---

## 21. Routine Definitions

## 21.1 Patanjali Yogic Jogging Part 1

### Label

`Patanjali Yogic Jogging Part 1`

### Description

`Patanjali Yogic Jogging sequence with Positions 1 to 5, followed by 12 individual Yogic Jogging steps and 5 Surya Namaskar rounds.`

### Safety

`Start gently, keep movement rhythmic and controlled, and reduce speed if breathing becomes strained or balance feels unstable.`

### Steps

1. Yogic Jogging Position 1 — time 60
2. Yogic Jogging Position 2 — time 60
3. Yogic Jogging Position 3 — time 60
4. Yogic Jogging Position 4 — reps 16
5. Yogic Jogging Position 5 — reps 16
6. Hasta Sanchalan Kriya — reps 16
7. Purna Hasta Sanchalan Kriya — reps 16
8. Janu Sanchalan Kriya — reps 16
9. Janu Vikasak Kriya — reps 16
10. Uru Vikasak Kriya - 1 — reps 16
11. Uru Vikasak Kriya - 2 — reps 16
12. Vaksha Vikasak Kriya — reps 16
13. Trikonasana Kriya — reps 16
14. Konasana Kriya — reps 16
15. Hastottanasana - Paadhastasana Kriya — reps 16
16. Chalit Pad Hastasana Kriya — reps 16
17. Yog Nrutyasana Kriya — reps 16
18. Sun Salutation — sequence, 5 rounds
19. Mishra Dand — reps 3
20. Easy Breathing — time 45

---

## 21.2 Patanjali Yog Part 2 - Asanas

### Label

`Patanjali Yog Part 2 - Asanas`

### Description

`Second class asana sequence from the uploaded Patanjali file with the listed repetitions and relaxation timings.`

### Safety

`Move with control, avoid jerks, and rest whenever strain, dizziness, pain, or discomfort appears.`

### Steps

1. Makarasana — 16
2. Ardha Bhujangasana — 8
3. Purna Bhujangasana — 8
4. Tiryak Bhujangasana — 8
5. Saral Bhujangasana — 8
6. Shalabhasana — 8
7. Dhanurasana — 8
8. Bal Vishram Asana — 120 sec
9. Markat Asana — 8
10. Uttanapadasana — 16
11. Naukasana — 8
12. Ekapada Angushtha Nasa Sparshasana — 2
13. Pawanmuktasana — 2
14. Ardha Halasana — 16
15. Padavrittasana — 2
16. Dwichakrikasana — 10
17. Kandharasana — 16
18. Savasana / Yog Nidra — 180 sec

---

## 21.3 Patanjali Yog Phase 3

### Label

`Patanjali Yog Phase 3`

### Description

`Based on the uploaded Patanjali Session 3 content with pranayama, asana, kriya, foot work, acupressure, and closing relaxation practices.`

### Safety

`Sit in a comfortable posture with the spine, waist, and neck upright. No strain, no force, and no competition. Do all practices only according to your capacity.`

### Steps

1. Prayer / Prarthana — time 60
2. Hasta–Manibandha–Kurpara–Skandha Chakra — reps 8
3. Greeva Sanchalana - 3 Types — reps 4
4. Greeva Anti-Pressure — reps 4
5. Netra Chakra — reps 8
6. Bhastrika Pranayama — time 120
7. Kapal Bhati — time 600
8. Mandukasana — reps 8
9. Shashankasana — reps 8
10. Gomukhasana — reps 4
11. Vakrasana — reps 4
12. Ardha Chandrasana — reps 8
13. Ustrasana — reps 8
14. Marjarasana — reps 8
15. Bahya Pranayama — reps 3
16. Agnisar Kriya — reps 3
17. Ujjayi Pranayama — reps 3
18. Foot Exercises — reps 8
19. Chakki Chalan — reps 8
20. Sthit Konasana — reps 20
21. Titli Asana — time 300
22. Tali Vadan — reps 21
23. Kidney Acupressure — reps 5
24. Anulom Vilom — time 600
25. Bhramari — reps 5
26. Udgeeth Pranayama — reps 5
27. Pranav Pranayama — time 180
28. Simhasana — reps 3
29. Hasyasana — reps 3
30. Savasana / Yog Nidra — time 120

---

## 21.4 Diabetes Support

Must include:

* Diaphragmatic Breath
* Sun Salutation
* Cat-Cow
* Seated Forward Fold
* Cobra Pose
* Wind-Relieving Pose
* Mandukasana — 3 poses, 3 times each
* Bridge Pose
* Anulom Vilom
* Savasana / Yog Nidra

---

## 21.5 Weight Loss Flow

Must include:

* Bhastrika Pranayama
* Sun Salutation
* Chair Pose Pulses
* Plank Hold
* High Lunge
* Boat Pose
* Bridge Pose
* Kapal Bhati
* Savasana / Yog Nidra

---

## 21.6 Back Pain Relief

Must include:

* Easy Breathing
* Pelvic Tilts
* Cat-Cow
* Child’s Pose
* Sphinx Pose
* Knees to Chest
* Supine Twist
* Bridge Pose
* Savasana / Yog Nidra

---

## 21.7 Knee Pain Support

Must include:

* Diaphragmatic Breath
* Ankle Rotations
* Hamstring Stretch
* Quad Set
* Bridge Pose
* Supported Chair Pose
* Legs Up the Wall
* Anulom Vilom

---

## 21.8 Neck Pain / Spondylosis Support

Must include:

* Easy Breathing
* Neck Isometrics
* Shoulder Rolls
* Thread the Needle
* Cat-Cow
* Supported Fish Pose
* Bhramari
* Savasana / Yog Nidra

---

## 21.9 Beginner Flow

Must include:

* Prayer / Prarthana
* Neck Rolls
* Shoulder Rolls
* Cat-Cow
* Downward Dog
* Low Lunge
* Warrior II
* Tree Pose
* Seated Forward Fold
* Supine Twist
* Savasana / Yog Nidra

---

## 21.10 Intermediate Strength Flow

Must include:

* Bhastrika Pranayama
* Sun Salutation
* Chair Pose Pulses
* Plank Hold
* Cobra to Child’s Pose
* Crescent Lunge
* Warrior III
* Boat Pose
* Bridge Pose
* Happy Baby
* Savasana / Yog Nidra

---

## 21.11 Gentle / Recovery

Must include:

* Easy Breathing
* Seated Side Stretch
* Seated Twist
* Cat-Cow
* Thread the Needle
* Child’s Pose
* Figure Four Stretch
* Legs Up the Wall
* Savasana / Yog Nidra

---

## 21.12 Pranayama & Om

Must include:

* Bhastrika Pranayama
* Kapal Bhati
* Anulom Vilom
* Bhramari
* Om Pranav
* Savasana / Yog Nidra

---

## 22. UI Component Requirements

Recommended component breakdown:

### `RoutineSelector`

* dropdown selector
* routine change handler

### `RoutineHeader`

* app title
* tagline
* routine description
* total step count
* approximate duration
* routine safety note
* global safety note

### `CurrentStepPanel`

* current activity title
* Devanagari title and Roman transliteration
* English equivalent/common name if present
* note text

### `ControlsPanel`

* timer/reps/sequence info
* Start
* Pause
* Complete & Next
* Reset

### `IllustrationPanel`

* pose icon/illustration
* Devanagari original name
* Roman transliteration
* optional English equivalent/common name
* illustration note
* Picture Link placeholder
* Video Link placeholder

### `BreathingPanel`

* animated breath guide
* breathing label
* practice instructions
* rhythm display
* Kapal Bhati counter
* Kapal Bhati safety note

### `SequencePanel`

* used for Surya Namaskar
* show substeps
* highlight current substep
* show sequence note

### `RoutineStepList`

* full visible routine steps
* active and completed states
* badges for time/reps/sequence

---

## 23. Engine Behavior

Create a reusable routine engine/helper to manage:

* current step
* time remaining
* start/pause state
* progress
* step completion
* reset logic
* sequence substep progression
* left/right expansion for per-side steps

### Sequence timing

For sequence steps:

* automatically advance substeps on a fixed interval
* track current round
* complete sequence when last round and last substep finish

---

## 24. Audio Helper Behavior

Create a reusable audio helper module that:

* builds prompt text
* chooses voice based on selected spoken audio language
* handles missing voices gracefully
* cancels previous utterance before new prompt
* no-ops safely if speech synthesis is unavailable

---


## 25. Build, Preview, and Deployment Compatibility

The application must run locally with:

```bash
npm install
npm run dev
```

It must also build successfully with:

```bash
npm run build
npm run preview
```

The app should be deployable to:

* GitHub Pages
* Netlify
* Vercel

Deployment rules:

* avoid absolute asset paths that break under a GitHub Pages subpath
* configure Vite so the app can work under static hosting
* for GitHub Pages compatibility, prefer `base: "./"` in `vite.config.js` unless a repository-specific base path is intentionally configured
* no backend, database, server-only API, or authentication dependency

### Canvas compatibility note

For ChatGPT Canvas preview compatibility, avoid importing lucide icons from CDN-generated individual icon paths. In the Vite project, normal imports from `lucide-react` are acceptable. If Canvas preview fails because of lucide CDN loading, use simple inline SVG, text, or emoji fallbacks for preview-only testing.

---

## 26. Alias Support

Use `@` alias mapped to `src`.

---

## 27. Code Quality Rules

* avoid duplicated text where possible
* keep routines data-driven
* avoid storing business content in UI components
* avoid one-file architecture
* keep naming explicit
* write maintainable code suitable for future routine additions

---

## 28. README Requirements

README must include:

* install instructions
* run instructions
* build instructions
* preview instructions
* deployment notes for GitHub Pages, Netlify, and Vercel
* short architecture overview
* note that the project is self-contained and restorable

---

## 29. Final Delivery Requirement

Codex should output:

* all files
* full code
* no unresolved placeholders except explicitly allowed media link placeholders
* no missing imports
* no missing Tailwind/Vite configuration files
* no dependency on canvas-only infrastructure

---


---

## Additional Runtime Clarifications

### package.json scripts

`package.json` scripts must include:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Approximate duration calculation defaults

For approximate duration calculation:

* estimate each repetition as 3 seconds unless a step-specific estimate is defined
* estimate Surya Namaskar sequence timing as 5 seconds per substep unless otherwise specified
* use actual `duration` values for time-based steps
* keep duration estimates conservative and beginner-safe

### Surya Namaskar sequence timing

For Surya Namaskar sequence timing:

* use 5 seconds per substep by default
* show the current round number
* show the current substep index
* complete the sequence only after the final substep of the final round

### Full routine completion behavior

When the final routine step is completed:

* stop playback
* show 100% progress
* keep the final step visible unless the user resets or changes routine
* display a gentle completion message such as:

```text
Routine complete. Well done.
```

### Reset behavior

Reset should:

* stop playback
* return to the first step
* reset timer state
* reset sequence substep state
* reset sequence round state
* clear completed progress
* clear any routine completion message

### Language fallback behavior

If Hindi text, Hindi speech, or English speech is missing for any step:

* fall back to the safest available text or prompt; for Hindi speech, prefer Devanagari name first, then Roman name
* avoid blank labels, blank notes, or empty speech prompts

### Speech synthesis browser behavior

Speech synthesis should only start after the user has interacted with the app, such as pressing **Start**, to avoid browser autoplay restrictions.

The audio helper should:

* safely no-op if browser speech synthesis is unavailable
* avoid throwing runtime errors when voices are missing
* cancel the previous utterance before speaking the next prompt

## 30. Codex Prompt to Use

Paste this to Codex:

```text
Build a complete React + Vite application called “Lata Yog Routine Guide”.

Follow these exact requirements:

1. Use React, Vite, Tailwind, Framer Motion, and lucide-react.
2. Build a maintainable modular architecture. Do not use one giant component.
3. Separate:
   - routine data
   - UI text
   - Hindi notes
   - audio prompt data
   - illustration mappings
   - routine engine logic
   - UI components
4. Support:
   - English and Hindi interface language
   - Hindi and English spoken audio language
   - always display step names as Devanagari + Roman transliteration + optional English equivalent
5. Implement step types:
   - time
   - reps
   - sequence
6. Only Surya Namaskar should be a grouped sequence.
7. The 12 Yogic Jogging items must be 12 independent steps, not a grouped sequence.
8. Default routine must be Patanjali Yogic Jogging Part 1.
9. Show:
   - current activity
   - timer/reps/sequence state
   - start/pause/complete-next/reset
   - progress bar
   - pose illustration
   - breathing animation
   - routine step list
10. Beside the illustration, include two placeholder panels:
   - Picture Link
   - Video Link
11. Wherever Savasana appears, display “Savasana / Yog Nidra”.
12. Prayer step must display “Prayer / Prarthana”.
13. Preserve formal/common naming in Phase 3 using the v4 naming model: Devanagari + Roman transliteration + optional English equivalent.
14. Implement the routines exactly as specified.
15. Deliver a fully restorable project with README.
16. Also generate tailwind.config.js, postcss.config.js, src/styles.css, and a complete package.json with all required dependencies.
17. The app must run with npm install, npm run dev, npm run build, and npm run preview without missing imports or backend dependencies.
18. For routines where exact duration/reps are not specified, assign sensible beginner-safe defaults.
19. Time-based steps should auto-complete when the timer reaches zero while playing. Reps-based steps should wait for Complete & Next.
20. Include accessibility/mobile usability improvements and a general health disclaimer.
21. Make the app deployable to GitHub Pages, Netlify, or Vercel. Prefer Vite base: "./" for simple static hosting compatibility.
22. Avoid lucide CDN-generated individual icon imports; import normally from lucide-react in the Vite project, or provide simple fallbacks for Canvas preview compatibility.
23. package.json scripts must include dev, build, and preview commands for Vite.
24. Estimate repetitions as 3 seconds each for approximate duration unless a step-specific estimate exists.
25. Use 5 seconds per Surya Namaskar substep unless otherwise specified.
26. When the final step is completed, stop playback, show 100% progress, and display “Routine complete. Well done.”
27. Reset must stop playback, return to the first step, reset timer/sequence/round state, clear completed progress, and clear completion messages.
28. If Hindi or English speech text is missing, fall back safely using Devanagari name, Roman name, or English equivalent where available.
29. Speech synthesis should begin only after user interaction, such as pressing Start.
30. Populate the complete step name registry using Devanagari original name, Roman transliteration, and English equivalent/common name for every listed step, as specified in v4.

Generate all files in full.
```

---

This specification is ready to use as a developer handoff markdown file and can be stored alongside the backup zip.
