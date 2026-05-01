import fs from 'fs';

const filePath = './src/utils/translations.js';
let content = fs.readFileSync(filePath, 'utf8');

const englishTimeline = `
    tlAnnouncement: "Election Announcement",
    tlRegistration: "Voter Registration Deadline",
    tlCampaign: "Campaign Period",
    tlVoting: "Voting Day",
    tlResult: "Result Declaration",
    tlDay1: "Day 1",
    tlDay7: "Day 7",
    tlDay8to26: "Day 8–26",
    tlDay27: "Day 27",
    tlDay30: "Day 30",
    tlActionAnnouncement: "Check your name on electoral roll at voters.eci.gov.in",
    tlActionRegistration: "Submit Form 6 online if not registered",
    tlActionCampaign: "Research candidates, attend public meetings",
    tlActionVoting: "Carry valid ID, visit booth 7am–6pm",
    tlActionResult: "Check results at eci.gov.in",
    tlDeadlineAnnouncement: "Immediately after announcement",
    tlDeadlineRegistration: "7 days after announcement",
    tlDeadlineCampaign: "Ends 48 hours before voting",
    tlDeadlineVoting: "Single day",
    tlDeadlineResult: "3 days after voting",
    
    promptChanges: "What changed since last election?",
    promptSeniorPriority: "Do I get priority at the booth?",
    promptSeniorHomeVoting: "Can I vote from home?",
    promptSeniorHelp: "What help is available?",
    promptAccessibleBooth: "Is my booth wheelchair accessible?",
    promptAccessibleCompanion: "Can someone help me vote?",
    promptAccessibleBrailleEvm: "What is Braille EVM?",
`;

const hindiTimeline = `
    tlAnnouncement: "चुनाव की घोषणा",
    tlRegistration: "मतदाता पंजीकरण की अंतिम तिथि",
    tlCampaign: "प्रचार अवधि",
    tlVoting: "मतदान का दिन",
    tlResult: "परिणाम की घोषणा",
    tlDay1: "दिन 1",
    tlDay7: "दिन 7",
    tlDay8to26: "दिन 8-26",
    tlDay27: "दिन 27",
    tlDay30: "दिन 30",
    tlActionAnnouncement: "voters.eci.gov.in पर मतदाता सूची में अपना नाम जांचें",
    tlActionRegistration: "पंजीकृत नहीं हैं तो ऑनलाइन फॉर्म 6 जमा करें",
    tlActionCampaign: "उम्मीदवारों पर शोध करें, जनसभाओं में भाग लें",
    tlActionVoting: "वैध ID ले जाएं, सुबह 7 बजे-शाम 6 बजे बूथ पर जाएं",
    tlActionResult: "eci.gov.in पर परिणाम जांचें",
    tlDeadlineAnnouncement: "घोषणा के तुरंत बाद",
    tlDeadlineRegistration: "घोषणा के 7 दिन बाद",
    tlDeadlineCampaign: "मतदान से 48 घंटे पहले समाप्त",
    tlDeadlineVoting: "एक दिन",
    tlDeadlineResult: "मतदान के 3 दिन बाद",

    promptChanges: "पिछले चुनाव के बाद क्या बदला है?",
    promptSeniorPriority: "क्या मुझे बूथ पर प्राथमिकता मिलती है?",
    promptSeniorHomeVoting: "क्या मैं घर से वोट दे सकता हूँ?",
    promptSeniorHelp: "क्या मदद उपलब्ध है?",
    promptAccessibleBooth: "क्या मेरा बूथ व्हीलचेयर सुलभ है?",
    promptAccessibleCompanion: "क्या कोई मेरी वोट डालने में मदद कर सकता है?",
    promptAccessibleBrailleEvm: "ब्रेल EVM क्या है?",
`;

const teluguTimeline = `
    tlAnnouncement: "ఎన్నికల ప్రకటన",
    tlRegistration: "ఓటరు నమోదు చివరి తేదీ",
    tlCampaign: "ప్రచార కాలం",
    tlVoting: "ఓటింగ్ రోజు",
    tlResult: "ఫలితాల ప్రకటన",
    tlDay1: "రోజు 1",
    tlDay7: "రోజు 7",
    tlDay8to26: "రోజు 8-26",
    tlDay27: "రోజు 27",
    tlDay30: "రోజు 30",
    tlActionAnnouncement: "voters.eci.gov.in లో ఓటరు జాబితాలో మీ పేరు చూసుకోండి",
    tlActionRegistration: "నమోదు కాకపోతే ఆన్‌లైన్‌లో ఫారం 6 సమర్పించండి",
    tlActionCampaign: "అభ్యర్థులపై పరిశోధన చేయండి, సభలకు హాజరుకండి",
    tlActionVoting: "చెల్లుబాటు అయ్యే ID తీసుకెళ్లండి, ఉదయం 7-సాయంత్రం 6 గంటలకు బూత్‌ను సందర్శించండి",
    tlActionResult: "eci.gov.in లో ఫలితాలు చూడండి",
    tlDeadlineAnnouncement: "ప్రకటన తర్వాత వెంటనే",
    tlDeadlineRegistration: "ప్రకటన తర్వాత 7 రోజులకు",
    tlDeadlineCampaign: "ఓటింగ్‌కు 48 గంటల ముందు ముగుస్తుంది",
    tlDeadlineVoting: "ఒకే రోజు",
    tlDeadlineResult: "ఓటింగ్ తర్వాత 3 రోజులకు",

    promptChanges: "గత ఎన్నికల తర్వాత ఏమి మారింది?",
    promptSeniorPriority: "నాకు బూత్‌లో ప్రాధాన్యత లభిస్తుందా?",
    promptSeniorHomeVoting: "నేను ఇంటి నుండి ఓటు వేయవచ్చా?",
    promptSeniorHelp: "ఏమి సహాయం అందుబాటులో ఉంది?",
    promptAccessibleBooth: "నా బూత్‌లో వీల్‌చైర్ సదుపాయం ఉందా?",
    promptAccessibleCompanion: "ఓటు వేయడానికి నాకు ఎవరైనా సహాయం చేయగలరా?",
    promptAccessibleBrailleEvm: "బ్రెయిలీ EVM అంటే ఏమిటి?",
`;

content = content.replace("replyDefault: 'I am a Voter Education Assistant. You can ask me about ID requirements, polling booth steps, EVMs, or how to check your name on the voter list.',", "replyDefault: 'I am a Voter Education Assistant. You can ask me about ID requirements, polling booth steps, EVMs, or how to check your name on the voter list.'," + englishTimeline);
content = content.replace("replyDefault: 'मैं मतदाता शिक्षा सहायक हूं। आप पहचान पत्र, मतदान बूथ प्रक्रिया, EVM या मतदाता सूची में नाम जांचने के बारे में पूछ सकते हैं।',", "replyDefault: 'मैं मतदाता शिक्षा सहायक हूं। आप पहचान पत्र, मतदान बूथ प्रक्रिया, EVM या मतदाता सूची में नाम जांचने के बारे में पूछ सकते हैं।'," + hindiTimeline);
content = content.replace("replyDefault: 'నేను ఓటరు విద్య సహాయకుడిని. ID అవసరాలు, పోలింగ్ బూత్ దశలు, EVMలు లేదా ఓటరు జాబితాలో పేరు ఎలా చూసుకోవాలో అడగవచ్చు.',", "replyDefault: 'నేను ఓటరు విద్య సహాయకుడిని. ID అవసరాలు, పోలింగ్ బూత్ దశలు, EVMలు లేదా ఓటరు జాబితాలో పేరు ఎలా చూసుకోవాలో అడగవచ్చు.'," + teluguTimeline);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Translations updated.');
