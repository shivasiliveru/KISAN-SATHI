const languageSelect = document.getElementById('language-select');
const locationSelect = document.getElementById('location-select');
const cropNameDiv = document.getElementById('crop-name');
const cropStepsDiv = document.getElementById('crop-steps');

const translations = {
  en: {
    locationTitle: "Select Your District",
    cropTitle: "Crop Suggestion",
    cropName: "Suggested Crop:",
    seedsTitle: "Seeds",
    fertilizersTitle: "Fertilizers",
    vehiclesTitle: "Vehicles",
    footerText: "© 2025 Kisan Sathi. All rights reserved.",
    languageSelectLabel: "Select Language:"
  },
  hi: {
    locationTitle: "अपना जिला चुनें",
    cropTitle: "फसल सुझाव",
    cropName: "सुझाई गई फसल:",
    seedsTitle: "बीज",
    fertilizersTitle: "उर्वरक",
    vehiclesTitle: "वाहन",
    footerText: "© 2025 किसान साथी। सर्वाधिकार सुरक्षित।",
    languageSelectLabel: "भाषा चुनें:"
  },
  te: {
    locationTitle: "మీ జిల్లా ఎంచుకోండి",
    cropTitle: "పంట సిఫార్సు",
    cropName: "సూచించిన పంట:",
    seedsTitle: "విత్తనాలు",
    fertilizersTitle: "ఎరువులు",
    vehiclesTitle: "వాహనాలు",
    footerText: "© 2025 కిసాన్ సాథి. అన్ని హక్కులును కలిగి ఉంది.",
    languageSelectLabel: "భాషను ఎంచుకోండి:"
  }
};

const cropData = {
  nalgonda: {
    en: { name: "Cotton", steps: ["Plow field and add organic compost.", "Sow seeds with 75cm spacing.", "Requires 500–700mm water.", "Use 60kg N, 40kg P, 40kg K.", "Apply pesticides against bollworms.", "Harvest after 160-180 days."] },
    hi: { name: "कपास", steps: ["खेत जोतें और जैविक खाद डालें।", "75 सेमी दूरी पर बीज बोएं।", "500–700 मिमी पानी आवश्यक।", "60kg N, 40kg P, 40kg K।", "बोलवर्म के लिए कीटनाशक छिड़कें।", "160-180 दिन बाद कटाई करें।"] },
    te: { name: "పత్తి", steps: ["భూమిని కలపండి మరియు జీవసారాన్ని వేసండి.", "75cm దూరంలో విత్తనాలు నాటండి.", "500–700mm నీరు అవసరం.", "60kg N, 40kg P, 40kg K వాడండి.", "బోల్‌వార్మ్ నివారణకు మందులు వాడండి.", "160-180 రోజులకు కోయండి."] }
  },
  karimnagar: {
    en: { name: "Tomato", steps: ["Use loamy soil with pH 6-7.", "30cm spacing between plants.", "Water every 2-3 days.", "100kg N, 50kg P, 50kg K.", "Control leaf curl virus.", "Harvest in 70–90 days."] },
    hi: { name: "टमाटर", steps: ["6-7 pH की दोमट मिट्टी का उपयोग करें।", "30 सेमी की दूरी पर लगाएं।", "हर 2-3 दिन में पानी दें।", "100kg N, 50kg P, 50kg K।", "लीफ कर्ल वायरस से बचाव करें।", "70–90 दिन में फसल तैयार।"] },
    te: { name: "టమాటా", steps: ["pH 6-7 లోమైన మట్టి వాడండి.", "30cm దూరంగా నాటండి.", "ప్రతి 2-3 రోజులకు నీరు.", "100kg N, 50kg P, 50kg K.", "లీఫ్ కర్ల్ నివారణ చేయండి.", "70–90 రోజుల్లో కోయండి."] }
  },
  sangareddy: {
    en: { name: "corn", steps: ["Plow field and add organic compost.", "Sow seeds with 75cm spacing.", "Requires 500–700mm water.", "Use 60kg N, 40kg P, 40kg K.", "Apply pesticides against bollworms.", "Harvest after 160-180 days."] },
    hi: { name: "भुट्टा", steps: ["खेत जोतें और जैविक खाद डालें।", "75 सेमी दूरी पर बीज बोएं।", "500–700 मिमी पानी आवश्यक।", "60kg N, 40kg P, 40kg K।", "बोलवर्म के लिए कीटनाशक छिड़कें।", "160-180 दिन बाद कटाई करें।"] },
    te: { name: "మొక్కజొన్న", steps: ["భూమిని కలపండి మరియు జీవసారాన్ని వేసండి.", "75cm దూరంలో విత్తనాలు నాటండి.", "500–700mm నీరు అవసరం.", "60kg N, 40kg P, 40kg K వాడండి.", "బోల్‌వార్మ్ నివారణకు మందులు వాడండి.", "160-180 రోజులకు కోయండి."] }
  },
  warangal: {
    en: { name: "beans", steps: ["Use loamy soil with pH 6-7.", "30cm spacing between plants.", "Water every 2-3 days.", "100kg N, 50kg P, 50kg K.", "Control leaf curl virus.", "Harvest in 70–90 days."] },
    hi: { name: "फलियाँ", steps: ["6-7 pH की दोमट मिट्टी का उपयोग करें।", "30 सेमी की दूरी पर लगाएं।", "हर 2-3 दिन में पानी दें।", "100kg N, 50kg P, 50kg K।", "लीफ कर्ल वायरस से बचाव करें।", "70–90 दिन में फसल तैयार।"] },
    te: { name: "బీన్స్", steps: ["pH 6-7 లోమైన మట్టి వాడండి.", "30cm దూరంగా నాటండి.", "ప్రతి 2-3 రోజులకు నీరు.", "100kg N, 50kg P, 50kg K.", "లీఫ్ కర్ల్ నివారణ చేయండి.", "70–90 రోజుల్లో కోయండి."] }
  }
  // Add more districts like warangal, khammam, etc.
};

let currentLang = "en";

function updateTextLanguage() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  updateCropSuggestion();
}

function updateCropSuggestion() {
  const district = locationSelect.value;
  const cropInfo = cropData[district]?.[currentLang];
  if (cropInfo) {
    cropNameDiv.textContent = cropInfo.name;
    cropStepsDiv.innerHTML = '<h4>' + translations[currentLang].cropTitle + ' Steps:</h4><ul>' + cropInfo.steps.map(step => `<li>${step}</li>`).join('') + '</ul>';
  } else {
    cropNameDiv.textContent = '-';
    cropStepsDiv.innerHTML = '';
  }
}

languageSelect.addEventListener('change', () => {
  currentLang = languageSelect.value;
  updateTextLanguage();
});

locationSelect.addEventListener('change', updateCropSuggestion);

updateTextLanguage();
