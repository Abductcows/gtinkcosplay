// automates png generation from https://fontspool.com/font-generator/terraria

const textsToPrint = [
    "Legendary",
    "Unreal",
    "Mythical",
    "Fabled",
    "Legendary",
    "Godly",
    "Masterful",
    "Eager",
    "Loyal",
    "Savage",
    "Deadly",
    "Worthy",
    "Superior",
    "Demonic",
    "Mystic",
    "Staunch",
    "Rapid",
    "Hasty",
    "Scraggling",
    "Deadly",
    "Unpleasant",
    "Intimidating",
    "Murderous",
    "Focused",
    "Celestial",
    "Massive",
    "Sighted",
    "Agile",
    "Sharp",
    "Adept",
    "Ballistic",
    "Forceful",
    "Strong",
    "Dangerous",
    "Large",
    "Hurtful",
    "Pointy",
    "Quick",
    "Zealous",
    "Ill-Tempered",
    "Taboo",
    "Manic",
    "Nasty",
    "Bulky",
    "Ruthless",
    "Keen",
    "Furious",
    "Powerful",
    "Nimble",
    "Patient",
    "Light",
    "Heavy",
    "Rabid",
    "Frenzying",
    "Intense",
    "Lazy",
    "Small",
    "Inept",
    "Slow",
    "Damaged",
    "Dull",
    "Tiny",
    "Deranged",
    "Weak",
    "Sluggish",
    "Shameful",
    "Lethargic",
    "Shoddy",
    "Skittish",
    "Feeble",
    "Unhappy",
    "Awkward",
    "Ignorant",
    "Petty",
    "Awful",
    "Annoying",
    "Terrible",
    "Broken",
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTextField() {
    return document.getElementsByClassName(`w-full pl-11 pr-4 py-3.5 text-lg sm:text-xl rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`)[0];
}

function getColorStartField() {
    return document.getElementsByClassName("gen-hex")[0];
}

function getColorEndField() {
    return document.getElementsByClassName("gen-hex")[1];
}

function getStartDownloadButton() {
    return document.getElementsByClassName("flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0")[0];
}

function getFinalDownloadButton() {
    return document.getElementsByClassName("w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60")[0];
}

function getGoBackFromFinalDownloadButton() {
    return document.getElementsByClassName("text-gray-400 hover:text-gray-700 text-xl leading-none")[0];
}

function getRandomStartColor() {
    let color = "";
    for (let i = 0; i < 6; i++) {
        color = color + Math.floor(Math.random() * 16).toString(16);
    }
    return "#" + color;
}

function getEndColor(startColor) {
    startColor = startColor.substring(1)
    const offsets = [-3, 6, 6, -3, -3, -3];
    let color = "";
    for (let i = 0; i < 6; i++) {
        const prevNumber = Number.parseInt(startColor.charAt(i), 16);
        const modifiedNumber = (prevNumber + 16 + offsets[i]) % 16
        color += modifiedNumber.toString(16)
    }
    return "#" + color;
}

function typeTextIntoInput(inputField, text) {
    inputField.value = text;
    inputField.dispatchEvent(
        new Event("input", { bubbles: true, cancelable: true })
    );
}

async function run() {
    for (let i = 0; i < textsToPrint.length; i++) {
        if (i > 0) {
            await sleep(5000);
        }

        const textField = getTextField();
        typeTextIntoInput(textField, textsToPrint[i]);

        const startColor = getRandomStartColor();
        const colorStartField = getColorStartField();
        typeTextIntoInput(colorStartField, startColor);

        const colorEndField = getColorEndField();
        typeTextIntoInput(colorEndField, getEndColor(startColor));

        const startDownloadButton = getStartDownloadButton();
        startDownloadButton.click();

        await sleep(500);
        const finalDownloadButton = getFinalDownloadButton();
        finalDownloadButton.click();

        const goBackFromFinalDownloadButton = getGoBackFromFinalDownloadButton();
        goBackFromFinalDownloadButton.click();
    }
}

await run();
