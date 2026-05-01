import fs from 'fs';

const filePath = './src/utils/translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// We need to add promptBring to all languages
const promptBring_en = `promptBring: "What do I bring to vote?",`;
const promptBring_hi = `promptBring: "मतदान के लिए मैं क्या ले जाऊं?",`;
const promptBring_te = `promptBring: "నేను ఓటు వేయడానికి ఏమి తీసుకురావాలి?",`;
const promptBring_ta = `promptBring: "நான் வாக்களிக்க என்ன கொண்டு வர வேண்டும்?",`;
const promptBring_bn = `promptBring: "আমি ভোট দিতে কী আনব?",`;
const promptBring_kn = `promptBring: "ನಾನು ಮತ ಚಲಾಯಿಸಲು ಏನು ತರಬೇಕು?",`;

// Replace promptId with promptId + promptBring
content = content.replace("promptId: 'What ID do I need to vote?',", "promptId: 'What ID do I need to vote?',\n    " + promptBring_en);
content = content.replace("promptId: 'मतदान के लिए कौन सा पहचान पत्र चाहिए?',", "promptId: 'मतदान के लिए कौन सा पहचान पत्र चाहिए?',\n    " + promptBring_hi);
content = content.replace("promptId: 'ఓటు వేయడానికి ఏ ID అవసరం?',", "promptId: 'ఓటు వేయడానికి ఏ ID అవసరం?',\n    " + promptBring_te);
content = content.replace("promptId: 'வாக்களிக்க எந்த ID தேவை?',", "promptId: 'வாக்களிக்க எந்த ID தேவை?',\n  " + promptBring_ta);
content = content.replace("promptId: 'ভোট দিতে কোন ID দরকার?',", "promptId: 'ভোট দিতে কোন ID দরকার?',\n  " + promptBring_bn);
content = content.replace("promptId: 'ಮತ ಹಾಕಲು ಯಾವ ID ಬೇಕು?',", "promptId: 'ಮತ ಹಾಕಲು ಯಾವ ID ಬೇಕು?',\n  " + promptBring_kn);

// Timeline and Quick Prompts for Tamil
const tamilAdditions = `
  tlAnnouncement: "தேர்தல் அறிவிப்பு",
  tlRegistration: "வாக்காளர் பதிவு கடைசி தேதி",
  tlCampaign: "பிரச்சார காலம்",
  tlVoting: "வாக்குப்பதிவு நாள்",
  tlResult: "முடிவு அறிவிப்பு",
  tlDay1: "நாள் 1",
  tlDay7: "நாள் 7",
  tlDay8to26: "நாள் 8-26",
  tlDay27: "நாள் 27",
  tlDay30: "நாள் 30",
  tlActionAnnouncement: "voters.eci.gov.in இல் உங்கள் பெயரை சரிபார்க்கவும்",
  tlActionRegistration: "பதிவு செய்யவில்லை என்றால் Form 6 ஐ சமர்ப்பிக்கவும்",
  tlActionCampaign: "வேட்பாளர்களைப் பற்றி அறியவும், கூட்டங்களில் பங்கேற்கவும்",
  tlActionVoting: "சரியான ID உடன் காலை 7-மாலை 6 மணிக்குள் செல்லவும்",
  tlActionResult: "முடிவுகளை eci.gov.in இல் சரிபார்க்கவும்",
  tlDeadlineAnnouncement: "அறிவித்தவுடன்",
  tlDeadlineRegistration: "அறிவித்த 7 நாட்களுக்குப் பிறகு",
  tlDeadlineCampaign: "வாக்குப்பதிவுக்கு 48 மணிநேரம் முன் முடிகிறது",
  tlDeadlineVoting: "ஒரே நாள்",
  tlDeadlineResult: "வாக்குப்பதிவுக்கு 3 நாட்களுக்குப் பிறகு",
  promptChanges: "கடந்த தேர்தலுக்குப் பிறகு என்ன மாறியுள்ளது?",
  promptSeniorPriority: "எனக்கு முன்னுரிமை கிடைக்குமா?",
  promptSeniorHomeVoting: "நான் வீட்டிலிருந்து வாக்களிக்கலாமா?",
  promptSeniorHelp: "என்ன உதவி கிடைக்கும்?",
  promptAccessibleBooth: "என் சாவடி சக்கர நாற்காலி அணுகக்கூடியதா?",
  promptAccessibleCompanion: "யாராவது எனக்கு வாக்களிக்க உதவ முடியுமா?",
  promptAccessibleBrailleEvm: "பிரெய்லி EVM என்றால் என்ன?",
`;

// Timeline and Quick Prompts for Bengali
const bengaliAdditions = `
  tlAnnouncement: "নির্বাচন ঘোষণা",
  tlRegistration: "ভোটার নিবন্ধনের শেষ তারিখ",
  tlCampaign: "প্রচারকাল",
  tlVoting: "ভোটের দিন",
  tlResult: "ফলাফল ঘোষণা",
  tlDay1: "দিন 1",
  tlDay7: "দিন 7",
  tlDay8to26: "দিন 8-26",
  tlDay27: "দিন 27",
  tlDay30: "দিন 30",
  tlActionAnnouncement: "voters.eci.gov.in এ আপনার নাম পরীক্ষা করুন",
  tlActionRegistration: "নিবন্ধিত না হলে অনলাইনে ফর্ম 6 জমা দিন",
  tlActionCampaign: "প্রার্থীদের সম্পর্কে জানুন, জনসভায় যান",
  tlActionVoting: "বৈধ ID নিন, সকাল 7টা-সন্ধ্যা 6টার মধ্যে যান",
  tlActionResult: "eci.gov.in এ ফলাফল দেখুন",
  tlDeadlineAnnouncement: "ঘোষণার সাথে সাথেই",
  tlDeadlineRegistration: "ঘোষণার 7 দিন পর",
  tlDeadlineCampaign: "ভোটের 48 ঘণ্টা আগে শেষ হয়",
  tlDeadlineVoting: "একদিন",
  tlDeadlineResult: "ভোটের 3 দিন পর",
  promptChanges: "গত নির্বাচনের পর কী পরিবর্তন হয়েছে?",
  promptSeniorPriority: "আমি কি বুথে অগ্রাধিকার পাব?",
  promptSeniorHomeVoting: "আমি কি বাড়ি থেকে ভোট দিতে পারব?",
  promptSeniorHelp: "কী ধরনের সাহায্য পাওয়া যায়?",
  promptAccessibleBooth: "আমার বুথে কি হুইলচেয়ার সুবিধা আছে?",
  promptAccessibleCompanion: "কেউ কি আমাকে ভোট দিতে সাহায্য করতে পারে?",
  promptAccessibleBrailleEvm: "ব্রেইল EVM কী?",
`;

// Timeline and Quick Prompts for Kannada
const kannadaAdditions = `
  tlAnnouncement: "ಚುನಾವಣಾ ಘೋಷಣೆ",
  tlRegistration: "ಮತದಾರರ ನೋಂದಣಿ ಅಂತಿಮ ದಿನಾಂಕ",
  tlCampaign: "ಪ್ರಚಾರದ ಅವಧಿ",
  tlVoting: "ಮತದಾನದ ದಿನ",
  tlResult: "ಫಲಿತಾಂಶ ಘೋಷಣೆ",
  tlDay1: "ದಿನ 1",
  tlDay7: "ದಿನ 7",
  tlDay8to26: "ದಿನ 8-26",
  tlDay27: "ದಿನ 27",
  tlDay30: "ದಿನ 30",
  tlActionAnnouncement: "voters.eci.gov.in ನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಪರಿಶೀಲಿಸಿ",
  tlActionRegistration: "ನೋಂದಣಿಯಾಗಿಲ್ಲದಿದ್ದರೆ ಫಾರ್ಮ್ 6 ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸಲ್ಲಿಸಿ",
  tlActionCampaign: "ಅಭ್ಯರ್ಥಿಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ, ಸಭೆಗಳಿಗೆ ಹಾಜರಾಗಿ",
  tlActionVoting: "ಮಾನ್ಯ ID ತನ್ನಿ, ಬೆಳಿಗ್ಗೆ 7-ಸಂಜೆ 6 ಕ್ಕೆ ಭೇಟಿ ನೀಡಿ",
  tlActionResult: "eci.gov.in ನಲ್ಲಿ ಫಲಿತಾಂಶ ಪರಿಶೀಲಿಸಿ",
  tlDeadlineAnnouncement: "ಘೋಷಣೆಯ ತಕ್ಷಣ",
  tlDeadlineRegistration: "ಘೋಷಣೆಯ 7 ದಿನಗಳ ನಂತರ",
  tlDeadlineCampaign: "ಮತದಾನಕ್ಕೆ 48 ಗಂಟೆಗಳ ಮೊದಲು ಮುಗಿಯುತ್ತದೆ",
  tlDeadlineVoting: "ಒಂದು ದಿನ",
  tlDeadlineResult: "ಮತದಾನದ 3 ದಿನಗಳ ನಂತರ",
  promptChanges: "ಕಳೆದ ಚುನಾವಣೆಯ ನಂತರ ಏನು ಬದಲಾಗಿದೆ?",
  promptSeniorPriority: "ನನಗೆ ಬೂತ್‌ನಲ್ಲಿ ಆದ್ಯತೆ ಸಿಗುತ್ತದೆಯೇ?",
  promptSeniorHomeVoting: "ನಾನು ಮನೆಯಿಂದಲೇ ಮತ ಹಾಕಬಹುದೇ?",
  promptSeniorHelp: "ಯಾವ ಸಹಾಯ ಲಭ್ಯವಿದೆ?",
  promptAccessibleBooth: "ನನ್ನ ಬೂತ್‌ಗೆ ಗಾಲಿಕುರ್ಚಿ ಪ್ರವೇಶವಿದೆಯೇ?",
  promptAccessibleCompanion: "ಮತ ಹಾಕಲು ನನಗೆ ಯಾರಾದರೂ ಸಹಾಯ ಮಾಡಬಹುದೇ?",
  promptAccessibleBrailleEvm: "ಬ್ರೈಲ್ EVM ಎಂದರೆ ಏನು?",
`;

content = content.replace("replyDefault: 'நான் வாக்காளர் கல்வி உதவியாளர். ID தேவைகள், வாக்குச்சாவடி படிகள், EVMகள் அல்லது வாக்காளர் பட்டியலில் பெயரைச் சரிபார்ப்பது பற்றி கேட்கலாம்.',", "replyDefault: 'நான் வாக்காளர் கல்வி உதவியாளர். ID தேவைகள், வாக்குச்சாவடி படிகள், EVMகள் அல்லது வாக்காளர் பட்டியலில் பெயரைச் சரிபார்ப்பது பற்றி கேட்கலாம்.',\n" + tamilAdditions);
content = content.replace("replyDefault: 'আমি ভোটার শিক্ষা সহায়ক। আপনি ID প্রয়োজনীয়তা, ভোটকেন্দ্রের ধাপ, EVM বা ভোটার তালিকায় নাম দেখার বিষয়ে প্রশ্ন করতে পারেন।',", "replyDefault: 'আমি ভোটার শিক্ষা সহায়ক। আপনি ID প্রয়োজনীয়তা, ভোটকেন্দ্রের ধাপ, EVM বা ভোটার তালিকায় নাম দেখার বিষয়ে প্রশ্ন করতে পারেন।',\n" + bengaliAdditions);
content = content.replace("replyDefault: 'ನಾನು ಮತದಾರ ಶಿಕ್ಷಣ ಸಹಾಯಕ. ID ಅಗತ್ಯಗಳು, ಮತಗಟ್ಟೆ ಹಂತಗಳು, EVMಗಳು ಅಥವಾ ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಪರಿಶೀಲಿಸುವ ಬಗ್ಗೆ ಕೇಳಬಹುದು.',", "replyDefault: 'ನಾನು ಮತದಾರ ಶಿಕ್ಷಣ ಸಹಾಯಕ. ID ಅಗತ್ಯಗಳು, ಮತಗಟ್ಟೆ ಹಂತಗಳು, EVMಗಳು ಅಥವಾ ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಪರಿಶೀಲಿಸುವ ಬಗ್ಗೆ ಕೇಳಬಹುದು.',\n" + kannadaAdditions);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Translations updated.');
